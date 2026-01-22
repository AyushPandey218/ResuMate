import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useResume } from '../contexts/ResumeContext';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import EditorPanel from './Editor/EditorPanel';
import PreviewPanel from './Preview/PreviewPanel';
import CustomizationPanel from './Customization/CustomizationPanel';
import ToggleCustomizationButton from './shared/ToggleCustomizationButton';
import SupportReminder from './shared/SupportReminder';

function MainLayout({ onBackToHome }) {
  const { state, dispatch: appDispatch } = useApp();
  const { dispatch, loadFromLocalStorage } = useResume();
  const resumeRef = useRef(null);
  const [mobileView, setMobileView] = useState('editor'); // 'editor' or 'preview'
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Load active resume when it changes
  useEffect(() => {
    if (state.activeResumeId) {
      const resumeData = loadFromLocalStorage(state.activeResumeId);
      if (resumeData) {
        dispatch({ type: 'LOAD_RESUME', payload: resumeData });
      }
    }
  }, [state.activeResumeId, loadFromLocalStorage, dispatch]);

  return (
    <div className="flex h-screen w-full">
      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out
        ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar onBackToHome={onBackToHome} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full overflow-hidden w-full lg:w-auto">
        <Header resumeRef={resumeRef} onMenuClick={() => setShowMobileSidebar(true)} />
        
        {/* Mobile View Toggle */}
        <div className="lg:hidden flex border-b border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-background-dark">
          <button
            onClick={() => setMobileView('editor')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              mobileView === 'editor'
                ? 'text-primary border-b-2 border-primary'
                : 'text-[#617589] dark:text-[#94a3b8]'
            }`}
          >
            <span className="material-symbols-outlined text-sm align-middle mr-1">edit</span>
            Edit
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              mobileView === 'preview'
                ? 'text-primary border-b-2 border-primary'
                : 'text-[#617589] dark:text-[#94a3b8]'
            }`}
          >
            <span className="material-symbols-outlined text-sm align-middle mr-1">visibility</span>
            Preview
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {state.showCustomization && <CustomizationPanel />}
          
          {/* Desktop: Show both panels side by side */}
          {/* Mobile: Show one panel at a time based on mobileView */}
          <div className={`lg:contents ${mobileView === 'editor' ? 'contents' : 'hidden'}`}>
            <EditorPanel />
          </div>
          <div className={`lg:contents ${mobileView === 'preview' ? 'contents' : 'hidden'}`}>
            <PreviewPanel resumeRef={resumeRef} />
          </div>
        </div>
      </div>
      <ToggleCustomizationButton />
      <SupportReminder />
    </div>
  );
}

export default MainLayout;
