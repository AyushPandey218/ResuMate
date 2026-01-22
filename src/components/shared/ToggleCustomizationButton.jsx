import React from 'react';
import { useApp } from '../../contexts/AppContext';

function ToggleCustomizationButton() {
  const { state, dispatch } = useApp();

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_CUSTOMIZATION' });
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-4 left-4 lg:bottom-6 lg:left-80 z-20 flex items-center gap-2 rounded-xl h-10 sm:h-12 px-4 sm:px-5 bg-primary text-white text-xs sm:text-sm font-bold transition-all hover:bg-primary/90 shadow-lg shadow-primary/20"
      title={state.showCustomization ? 'Hide Customization' : 'Show Customization'}
    >
      <span className="material-symbols-outlined text-lg sm:text-xl">palette</span>
      <span className="hidden sm:inline">{state.showCustomization ? 'Hide' : 'Customize'}</span>
    </button>
  );
}

export default ToggleCustomizationButton;
