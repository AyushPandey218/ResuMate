import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CustomizationContext = createContext();

const initialState = {
  fontFamily: 'Inter',
  accentColor: '#137fec',
  margins: 'normal',
  showPhoto: false,
  columns: 1,
};

function customizationReducer(state, action) {
  switch (action.type) {
    case 'LOAD_CUSTOMIZATION':
      return { ...state, ...action.payload };
    
    case 'UPDATE_FONT_FAMILY':
      return { ...state, fontFamily: action.payload };
    
    case 'UPDATE_ACCENT_COLOR':
      return { ...state, accentColor: action.payload };
    
    case 'UPDATE_MARGINS':
      return { ...state, margins: action.payload };
    
    case 'TOGGLE_PHOTO':
      return { ...state, showPhoto: !state.showPhoto };
    
    case 'UPDATE_COLUMNS':
      return { ...state, columns: action.payload };
    
    case 'RESET_CUSTOMIZATION':
      return initialState;
    
    default:
      return state;
  }
}

export function CustomizationProvider({ children }) {
  const [state, dispatch] = useReducer(customizationReducer, initialState);

  // Load customization from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('resumate-customization');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_CUSTOMIZATION', payload: parsed });
      } catch (error) {
        console.error('Failed to load customization:', error);
      }
    }
  }, []);

  // Save customization to localStorage on changes
  useEffect(() => {
    localStorage.setItem('resumate-customization', JSON.stringify(state));
  }, [state]);

  return (
    <CustomizationContext.Provider value={{ customization: state, dispatch }}>
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization() {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error('useCustomization must be used within CustomizationProvider');
  }
  return context;
}
