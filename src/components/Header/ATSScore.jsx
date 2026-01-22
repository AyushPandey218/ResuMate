import React from 'react';

function ATSScore({ score }) {
  const getScoreColor = () => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-primary';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex flex-col min-w-[200px]">
      <div className="flex justify-between items-center mb-1">
        <p className="text-[#111418] dark:text-white text-[10px] font-bold uppercase tracking-tight">
          ATS Score
        </p>
        <p className="text-primary text-[10px] font-bold">{score}%</p>
      </div>
      <div className="h-2 w-full bg-[#f0f2f4] dark:bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${getScoreColor()} transition-all duration-300`} style={{ width: `${score}%` }}></div>
      </div>
    </div>
  );
}

export default ATSScore;
