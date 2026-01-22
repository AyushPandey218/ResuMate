import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ResumeContext = createContext();

const createEmptyResume = () => ({
  id: uuidv4(),
  title: 'Untitled Resume',
  lastEdited: new Date().toISOString(),
  template: 'modern',
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
});

function resumeReducer(state, action) {
  switch (action.type) {
    case 'LOAD_RESUME':
      return action.payload;
    
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        content: {
          ...state.content,
          personalInfo: { ...state.content.personalInfo, ...action.payload },
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'UPDATE_SUMMARY':
      return {
        ...state,
        content: { ...state.content, summary: action.payload },
        lastEdited: new Date().toISOString(),
      };
    
    case 'ADD_WORK_EXPERIENCE':
      return {
        ...state,
        content: {
          ...state.content,
          workExperience: [
            ...state.content.workExperience,
            {
              id: uuidv4(),
              jobTitle: '',
              company: '',
              location: '',
              startDate: '',
              endDate: '',
              current: false,
              description: '',
              order: state.content.workExperience.length,
            },
          ],
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'UPDATE_WORK_EXPERIENCE':
      return {
        ...state,
        content: {
          ...state.content,
          workExperience: state.content.workExperience.map(exp =>
            exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
          ),
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'DELETE_WORK_EXPERIENCE':
      return {
        ...state,
        content: {
          ...state.content,
          workExperience: state.content.workExperience.filter(exp => exp.id !== action.payload),
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'REORDER_WORK_EXPERIENCE':
      return {
        ...state,
        content: {
          ...state.content,
          workExperience: action.payload,
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'ADD_EDUCATION':
      return {
        ...state,
        content: {
          ...state.content,
          education: [
            ...state.content.education,
            {
              id: uuidv4(),
              degree: '',
              institution: '',
              location: '',
              startDate: '',
              endDate: '',
              gpa: '',
              description: '',
              order: state.content.education.length,
            },
          ],
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        content: {
          ...state.content,
          education: state.content.education.map(edu =>
            edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
          ),
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'DELETE_EDUCATION':
      return {
        ...state,
        content: {
          ...state.content,
          education: state.content.education.filter(edu => edu.id !== action.payload),
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'REORDER_EDUCATION':
      return {
        ...state,
        content: {
          ...state.content,
          education: action.payload,
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'ADD_SKILL':
      return {
        ...state,
        content: {
          ...state.content,
          skills: [...state.content.skills, action.payload],
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'DELETE_SKILL':
      return {
        ...state,
        content: {
          ...state.content,
          skills: state.content.skills.filter(skill => skill !== action.payload),
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'ADD_PROJECT':
      return {
        ...state,
        content: {
          ...state.content,
          projects: [
            ...state.content.projects,
            {
              id: uuidv4(),
              name: '',
              description: '',
              technologies: '',
              link: '',
              startDate: '',
              endDate: '',
              order: state.content.projects.length,
            },
          ],
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'UPDATE_PROJECT':
      return {
        ...state,
        content: {
          ...state.content,
          projects: state.content.projects.map(proj =>
            proj.id === action.payload.id ? { ...proj, ...action.payload.data } : proj
          ),
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'DELETE_PROJECT':
      return {
        ...state,
        content: {
          ...state.content,
          projects: state.content.projects.filter(proj => proj.id !== action.payload),
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'REORDER_PROJECTS':
      return {
        ...state,
        content: {
          ...state.content,
          projects: action.payload,
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'ADD_CERTIFICATION':
      return {
        ...state,
        content: {
          ...state.content,
          certifications: [
            ...state.content.certifications,
            {
              id: uuidv4(),
              name: '',
              issuer: '',
              date: '',
              expiryDate: '',
              credentialId: '',
              order: state.content.certifications.length,
            },
          ],
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'UPDATE_CERTIFICATION':
      return {
        ...state,
        content: {
          ...state.content,
          certifications: state.content.certifications.map(cert =>
            cert.id === action.payload.id ? { ...cert, ...action.payload.data } : cert
          ),
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'DELETE_CERTIFICATION':
      return {
        ...state,
        content: {
          ...state.content,
          certifications: state.content.certifications.filter(cert => cert.id !== action.payload),
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'REORDER_CERTIFICATIONS':
      return {
        ...state,
        content: {
          ...state.content,
          certifications: action.payload,
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'ADD_ACHIEVEMENT':
      return {
        ...state,
        content: {
          ...state.content,
          achievements: [...state.content.achievements, action.payload],
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'DELETE_ACHIEVEMENT':
      return {
        ...state,
        content: {
          ...state.content,
          achievements: state.content.achievements.filter(ach => ach !== action.payload),
        },
        lastEdited: new Date().toISOString(),
      };
    
    case 'UPDATE_TEMPLATE':
      return {
        ...state,
        template: action.payload,
        lastEdited: new Date().toISOString(),
      };
    
    case 'UPDATE_TITLE':
      return {
        ...state,
        title: action.payload,
        lastEdited: new Date().toISOString(),
      };
    
    default:
      return state;
  }
}

export function ResumeProvider({ children }) {
  const [state, dispatch] = useReducer(resumeReducer, createEmptyResume());
  const [history, setHistory] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'ADD_TO_HISTORY':
          return {
            past: [...state.past, action.payload],
            present: action.payload,
            future: [],
          };
        case 'UNDO':
          if (state.past.length === 0) return state;
          const previous = state.past[state.past.length - 1];
          const newPast = state.past.slice(0, state.past.length - 1);
          return {
            past: newPast,
            present: previous,
            future: [state.present, ...state.future],
          };
        case 'REDO':
          if (state.future.length === 0) return state;
          const next = state.future[0];
          const newFuture = state.future.slice(1);
          return {
            past: [...state.past, state.present],
            present: next,
            future: newFuture,
          };
        case 'RESET_HISTORY':
          return {
            past: [],
            present: action.payload,
            future: [],
          };
        default:
          return state;
      }
    },
    { past: [], present: createEmptyResume(), future: [] }
  );

  const saveToLocalStorage = useCallback((resumeData) => {
    try {
      localStorage.setItem(`resumate-resume-${resumeData.id}`, JSON.stringify(resumeData));
    } catch (error) {
      console.error('Failed to save resume:', error);
    }
  }, []);

  const loadFromLocalStorage = useCallback((resumeId) => {
    try {
      const saved = localStorage.getItem(`resumate-resume-${resumeId}`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load resume:', error);
    }
    return null;
  }, []);

  const undo = useCallback(() => {
    setHistory({ type: 'UNDO' });
  }, []);

  const redo = useCallback(() => {
    setHistory({ type: 'REDO' });
  }, []);

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  // Save to localStorage when state changes (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveToLocalStorage(state);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [state, saveToLocalStorage]);

  return (
    <ResumeContext.Provider
      value={{
        resume: state,
        dispatch,
        history,
        undo,
        redo,
        canUndo,
        canRedo,
        createEmptyResume,
        loadFromLocalStorage,
        saveToLocalStorage,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within ResumeProvider');
  }
  return context;
}
