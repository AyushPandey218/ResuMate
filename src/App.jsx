import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { ResumeProvider } from './contexts/ResumeContext';
import { CustomizationProvider } from './contexts/CustomizationContext';
import MainLayout from './components/MainLayout';
import LandingPage from './components/LandingPage';

function AppContent() {
  const { state } = useApp();
  const [showLanding, setShowLanding] = useState(true);

  // Check if user has any resumes (has used the app before)
  useEffect(() => {
    if (state.resumes && state.resumes.length > 0) {
      setShowLanding(false);
    }
  }, [state.resumes]);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleBackToHome = () => {
    setShowLanding(true);
  };

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return <MainLayout onBackToHome={handleBackToHome} />;
}

function App() {
  return (
    <AppProvider>
      <ResumeProvider>
        <CustomizationProvider>
          <AppContent />
        </CustomizationProvider>
      </ResumeProvider>
    </AppProvider>
  );
}

export default App;
