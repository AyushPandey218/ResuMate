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
      className="fixed bottom-6 left-80 z-20 flex items-center gap-2 rounded-xl h-12 px-5 bg-primary text-white text-sm font-bold transition-all hover:bg-primary/90 shadow-lg shadow-primary/20"
      title={state.showCustomization ? 'Hide Customization' : 'Show Customization'}
    >
      <span className="material-symbols-outlined">palette</span>
      <span>{state.showCustomization ? 'Hide' : 'Customize'}</span>
    </button>
  );
}

export default ToggleCustomizationButton;
