import React, { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';

function SkillsSection() {
  const { resume, dispatch } = useResume();
  const skills = resume.content.skills;
  const [newSkill, setNewSkill] = useState('');

  const handleAdd = () => {
    if (newSkill.trim()) {
      dispatch({ type: 'ADD_SKILL', payload: newSkill.trim() });
      setNewSkill('');
    }
  };

  const handleDelete = (skill) => {
    dispatch({ type: 'DELETE_SKILL', payload: skill });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <section className="pb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#111418] dark:text-white text-lg font-bold">Skills</h3>
        <span className="material-symbols-outlined text-primary">psychology</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
          >
            {skill}
            <button
              onClick={() => handleDelete(skill)}
              className="material-symbols-outlined text-[14px] hover:text-primary/70"
            >
              close
            </button>
          </span>
        ))}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-32 rounded-full border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-white/5 h-7 px-3 text-xs focus:ring-primary focus:border-primary dark:text-white"
            placeholder="Add skill..."
          />
          <button
            onClick={handleAdd}
            className="bg-[#f0f2f4] dark:bg-white/10 text-[#617589] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-[#e4e7ea] dark:hover:bg-white/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">add</span> Add Skill
          </button>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
