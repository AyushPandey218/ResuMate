import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

function SummarySection() {
  const { resume, dispatch } = useResume();
  const summary = resume.content.summary;

  const handleChange = (value) => {
    dispatch({
      type: 'UPDATE_SUMMARY',
      payload: value,
    });
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#111418] dark:text-white text-lg font-bold">Professional Summary</h3>
        <span className="material-symbols-outlined text-primary">article</span>
      </div>
      <label className="flex flex-col">
        <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
          Summary
        </p>
        <textarea
          value={summary}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full rounded-xl border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-white/5 h-32 p-4 text-sm resize-none focus:ring-primary focus:border-primary dark:text-white"
          placeholder="Write a brief professional summary highlighting your key skills and experience..."
        />
      </label>
    </section>
  );
}

export default SummarySection;
