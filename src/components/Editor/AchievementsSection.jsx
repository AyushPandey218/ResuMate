import React, { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';

function AchievementsSection() {
  const { resume, dispatch } = useResume();
  const achievements = resume.content.achievements;
  const [newAchievement, setNewAchievement] = useState('');

  const handleAdd = () => {
    if (newAchievement.trim()) {
      dispatch({ type: 'ADD_ACHIEVEMENT', payload: newAchievement.trim() });
      setNewAchievement('');
    }
  };

  const handleDelete = (achievement) => {
    dispatch({ type: 'DELETE_ACHIEVEMENT', payload: achievement });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <section className="pb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#111418] dark:text-white text-lg font-bold">Key Achievements</h3>
        <span className="material-symbols-outlined text-primary">emoji_events</span>
      </div>
      <div className="space-y-3 mb-4">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="flex items-start gap-2 p-3 rounded-lg bg-[#f8fafc] dark:bg-white/5 border border-[#dbe0e6] dark:border-white/10"
          >
            <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
            <p className="flex-1 text-sm text-[#111418] dark:text-white">{achievement}</p>
            <button
              onClick={() => handleDelete(achievement)}
              className="material-symbols-outlined text-[16px] text-[#617589] hover:text-red-500 transition-colors"
            >
              close
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newAchievement}
          onChange={(e) => setNewAchievement(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 rounded-xl border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-white/5 h-11 px-4 text-sm focus:ring-primary focus:border-primary dark:text-white"
          placeholder="e.g., Increased team productivity by 40%"
        />
        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-primary/90 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">add</span> Add
        </button>
      </div>
    </section>
  );
}

export default AchievementsSection;
