import React, { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { useCustomization } from '../../contexts/CustomizationContext';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

function PreviewPanel({ resumeRef }) {
  const { resume } = useResume();
  const { customization } = useCustomization();
  const [zoom, setZoom] = useState(0.85); // Start at 85% for perfect readability

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleFitScreen = () => {
    setZoom(0.85);
  };

  const renderTemplate = () => {
    const templateProps = {
      resume,
      customization,
    };

    switch (resume.template) {
      case 'classic':
        return <ClassicTemplate ref={resumeRef} {...templateProps} />;
      case 'minimal':
        return <MinimalTemplate ref={resumeRef} {...templateProps} />;
      case 'modern':
      default:
        return <ModernTemplate ref={resumeRef} {...templateProps} />;
    }
  };

  return (
    <section className="w-full lg:flex-1 bg-background-light dark:bg-background-dark/50 flex flex-col relative">
      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 rounded-full bg-white dark:bg-[#2d3947] shadow-lg border border-[#dbe0e6] dark:border-white/5 flex items-center justify-center text-[#111418] dark:text-white transition-transform active:scale-95 hover:shadow-xl"
          title="Zoom In"
        >
          <span className="material-symbols-outlined">zoom_in</span>
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 rounded-full bg-white dark:bg-[#2d3947] shadow-lg border border-[#dbe0e6] dark:border-white/5 flex items-center justify-center text-[#111418] dark:text-white transition-transform active:scale-95 hover:shadow-xl"
          title="Zoom Out"
        >
          <span className="material-symbols-outlined">zoom_out</span>
        </button>
        <button
          onClick={handleFitScreen}
          className="w-10 h-10 rounded-full bg-white dark:bg-[#2d3947] shadow-lg border border-[#dbe0e6] dark:border-white/5 flex items-center justify-center text-[#111418] dark:text-white transition-transform active:scale-95 hover:shadow-xl"
          title="Fit to Screen"
        >
          <span className="material-symbols-outlined">fit_screen</span>
        </button>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8 lg:p-12 flex justify-center">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease',
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </section>
  );
}

export default PreviewPanel;
