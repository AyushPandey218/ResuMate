import React, { useEffect, useRef } from 'react';
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
  const { state } = useApp();
  const { dispatch, loadFromLocalStorage } = useResume();
  const resumeRef = useRef(null);

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
      <Sidebar onBackToHome={onBackToHome} />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Header resumeRef={resumeRef} />
        <div className="flex flex-1 overflow-hidden">
          {state.showCustomization && <CustomizationPanel />}
          <EditorPanel />
          <PreviewPanel resumeRef={resumeRef} />
        </div>
      </div>
      <ToggleCustomizationButton />
      <SupportReminder />
    </div>
  );
}

export default MainLayout;
