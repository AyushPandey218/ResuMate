import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { useResume } from '../../contexts/ResumeContext';
import { formatLastEdited } from '../../utils/resumeHelpers';

function ResumeList() {
  const { state, dispatch } = useApp();
  const { loadFromLocalStorage } = useResume();
  const [resumeMetadata, setResumeMetadata] = useState([]);

  useEffect(() => {
    // Load metadata for all resumes
    const metadata = state.resumes.map((id) => {
      const resume = loadFromLocalStorage(id);
      return resume
        ? {
            id: resume.id,
            title: resume.title,
            lastEdited: resume.lastEdited,
          }
        : null;
    }).filter(Boolean);

    setResumeMetadata(metadata);
  }, [state.resumes, loadFromLocalStorage]);

  const handleSelectResume = (id) => {
    dispatch({ type: 'SET_ACTIVE_RESUME', payload: id });
  };

  const handleDeleteResume = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this resume?')) {
      localStorage.removeItem(`resumate-resume-${id}`);
      dispatch({ type: 'DELETE_RESUME', payload: id });
    }
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <p className="text-[#94a3b8] text-[10px] uppercase font-bold tracking-wider mb-4 px-3">
        Stored in Browser
      </p>
      <div className="flex flex-col gap-1">
        {resumeMetadata.length === 0 ? (
          <div className="text-center py-8 text-[#617589] text-sm">
            <p>No resumes yet</p>
            <p className="text-xs mt-1">Click "New Resume" to start</p>
          </div>
        ) : (
          resumeMetadata.map((resume) => (
            <div
              key={resume.id}
              onClick={() => handleSelectResume(resume.id)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer group transition-colors ${
                state.activeResumeId === resume.id
                  ? 'bg-white/10 border border-white/5'
                  : 'hover:bg-white/5'
              }`}
            >
              <span
                className={`material-symbols-outlined ${
                  state.activeResumeId === resume.id
                    ? 'text-primary'
                    : 'text-[#617589] group-hover:text-white'
                }`}
              >
                article
              </span>
              <div className="flex flex-col overflow-hidden flex-1">
                <p
                  className={`text-sm font-medium truncate transition-colors ${
                    state.activeResumeId === resume.id
                      ? 'text-white'
                      : 'text-[#94a3b8] group-hover:text-white'
                  }`}
                >
                  {resume.title}
                </p>
                <p className="text-[10px] text-[#617589]">
                  Last edit: {formatLastEdited(resume.lastEdited)}
                </p>
              </div>
              {state.activeResumeId === resume.id && (
                <button
                  onClick={(e) => handleDeleteResume(resume.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                  title="Delete resume"
                >
                  <span className="material-symbols-outlined text-sm text-red-400">delete</span>
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ResumeList;
