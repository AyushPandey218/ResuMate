import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  resumes: [], // Array of resume IDs
  activeResumeId: null,
  darkMode: false,
  viewMode: 'split', // 'split', 'editor', 'preview'
  showCustomization: false,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOAD_APP_STATE':
      return { ...state, ...action.payload };
    
    case 'CREATE_RESUME':
      return {
        ...state,
        resumes: [...state.resumes, action.payload.id],
        activeResumeId: action.payload.id,
      };
    
    case 'DELETE_RESUME':
      const filteredResumes = state.resumes.filter(id => id !== action.payload);
      return {
        ...state,
        resumes: filteredResumes,
        activeResumeId: state.activeResumeId === action.payload 
          ? (filteredResumes[0] || null) 
          : state.activeResumeId,
      };
    
    case 'SET_ACTIVE_RESUME':
      return { ...state, activeResumeId: action.payload };
    
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    
    case 'TOGGLE_CUSTOMIZATION':
      return { ...state, showCustomization: !state.showCustomization };
    
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load app state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('resumate-app-state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        dispatch({ type: 'LOAD_APP_STATE', payload: parsed });
      } catch (error) {
        console.error('Failed to load app state:', error);
      }
    }
  }, []);

  // Save app state to localStorage on changes
  useEffect(() => {
    localStorage.setItem('resumate-app-state', JSON.stringify(state));
  }, [state]);

  // Apply dark mode class to html element
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
