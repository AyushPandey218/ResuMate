import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useResume } from '../../contexts/ResumeContext';
import { useATSScore } from '../../hooks/useATSScore';
import { exportToJSON, importFromJSON } from '../../utils/resumeHelpers';
import ATSScore from './ATSScore';

function Header({ resumeRef, onMenuClick }) {
  const { resume, dispatch, undo, redo, canUndo, canRedo } = useResume();
  const { score } = useATSScore(resume);
  const fileInputRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: resume.title.replace(/\s+/g, '-').toLowerCase(),
    onBeforeGetContent: async () => {
      // Add print-mode class for print-specific styling
      document.body.classList.add('print-mode');
      
      // Wait for fonts to load
      await document.fonts.ready;
      await new Promise(resolve => setTimeout(resolve, 100));
    },
    onAfterPrint: () => {
      // Remove print-mode class after printing
      document.body.classList.remove('print-mode');
    },
  });

  const handleExportPDF = () => {
    console.log('Export PDF button clicked');
    console.log('Resume ref:', resumeRef);
    console.log('Resume ref current:', resumeRef?.current);
    
    if (resumeRef?.current) {
      console.log('Triggering print...');
      handlePrint();
    } else {
      console.error('Resume ref not ready');
      alert('Resume preview not ready. Please wait a moment and try again.');
    }
  };

  const handleExportJSON = () => {
    exportToJSON(resume);
  };

  const handleImportJSON = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      importFromJSON(file, (importedResume, error) => {
        if (error) {
          alert(error);
        } else {
          dispatch({ type: 'LOAD_RESUME', payload: importedResume });
        }
      });
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all resume details? This action cannot be undone.')) {
      const emptyResume = {
        ...resume,
        content: {
          personalInfo: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            city: '',
            state: '',
            country: '',
            website: '',
            linkedin: '',
            github: '',
            photo: '',
          },
          summary: '',
          workExperience: [],
          education: [],
          projects: [],
          certifications: [],
          skills: [],
          achievements: [],
        },
        lastEdited: new Date().toISOString(),
      };
      dispatch({ type: 'LOAD_RESUME', payload: emptyResume });
    }
  };

  return (
    <header className="flex items-center justify-between border-b border-[#dbe0e6] bg-white dark:bg-background-dark dark:border-white/10 px-3 sm:px-6 h-14 sm:h-16 shrink-0">
      <div className="flex items-center gap-2 sm:gap-6">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-[#617589] dark:text-[#94a3b8] hover:text-[#111418] dark:hover:text-white"
          title="Menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              onClick={undo}
              disabled={!canUndo}
              className={`p-1 sm:p-1.5 rounded-lg transition-colors ${
                canUndo
                  ? 'hover:bg-[#f0f2f4] dark:hover:bg-white/10 text-[#617589] hover:text-[#111418] dark:hover:text-white'
                  : 'text-[#dbe0e6] dark:text-white/20 cursor-not-allowed'
              }`}
              title="Undo"
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">undo</span>
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className={`p-1 sm:p-1.5 rounded-lg transition-colors ${
                canRedo
                  ? 'hover:bg-[#f0f2f4] dark:hover:bg-white/10 text-[#617589] hover:text-[#111418] dark:hover:text-white'
                  : 'text-[#dbe0e6] dark:text-white/20 cursor-not-allowed'
              }`}
              title="Redo"
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">redo</span>
            </button>
          </div>
        </div>
        <div className="hidden sm:block h-8 w-px bg-[#dbe0e6] dark:bg-white/10"></div>
        <div className="hidden md:block">
          <ATSScore score={score} />
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {/* Clear All - Hidden on mobile */}
        <button
          onClick={handleClearAll}
          className="hidden sm:flex items-center justify-center rounded-xl h-8 sm:h-10 px-2 sm:px-4 bg-red-500 text-white text-xs font-bold transition-all hover:bg-red-600 shadow-md shadow-red-500/20"
          title="Clear all resume details"
        >
          <span className="material-symbols-outlined text-sm mr-0 sm:mr-1.5">delete_sweep</span>
          <span className="hidden sm:inline">Clear All</span>
        </button>

        {/* Import/Export JSON - Compact on mobile */}
        <div className="flex items-center bg-[#f0f2f4] dark:bg-white/5 rounded-xl p-0.5 sm:p-1">
          <button
            onClick={handleImportJSON}
            className="flex items-center justify-center rounded-lg h-8 px-2 sm:px-3 text-[#111418] dark:text-white text-xs font-bold transition-all hover:bg-white dark:hover:bg-white/10 hover:shadow-sm"
            title="Import JSON"
          >
            <span className="material-symbols-outlined text-sm">file_upload</span>
            <span className="hidden sm:inline ml-1.5">Import</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="flex items-center justify-center rounded-lg h-8 px-2 sm:px-3 text-[#111418] dark:text-white text-xs font-bold transition-all hover:bg-white dark:hover:bg-white/10 hover:shadow-sm"
            title="Export JSON"
          >
            <span className="material-symbols-outlined text-sm">file_download</span>
            <span className="hidden sm:inline ml-1.5">Export</span>
          </button>
        </div>

        {/* Export PDF */}
        <button
          onClick={handleExportPDF}
          className="flex items-center justify-center rounded-xl h-8 sm:h-10 px-3 sm:px-5 bg-primary text-white text-xs font-bold transition-all hover:bg-primary/90 shadow-md shadow-primary/20"
          title="Export PDF"
        >
          <span className="material-symbols-outlined text-sm mr-1 sm:mr-2">picture_as_pdf</span>
          <span className="hidden sm:inline">Export PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </header>
  );
}

export default Header;
