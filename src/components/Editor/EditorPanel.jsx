import React from 'react';
import PersonalInfoSection from './PersonalInfoSection';
import SummarySection from './SummarySection';
import WorkExperienceSection from './WorkExperienceSection';
import EducationSection from './EducationSection';
import ProjectsSection from './ProjectsSection';
import CertificationsSection from './CertificationsSection';
import SkillsSection from './SkillsSection';
import AchievementsSection from './AchievementsSection';

function EditorPanel() {
  return (
    <main className="w-[45%] bg-white dark:bg-background-dark border-r border-[#dbe0e6] dark:border-white/10 flex flex-col">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-xl mx-auto space-y-6">
          <PersonalInfoSection />
          <hr className="border-[#dbe0e6] dark:border-white/10" />
          <SummarySection />
          <hr className="border-[#dbe0e6] dark:border-white/10" />
          <WorkExperienceSection />
          <hr className="border-[#dbe0e6] dark:border-white/10" />
          <ProjectsSection />
          <hr className="border-[#dbe0e6] dark:border-white/10" />
          <EducationSection />
          <hr className="border-[#dbe0e6] dark:border-white/10" />
          <CertificationsSection />
          <hr className="border-[#dbe0e6] dark:border-white/10" />
          <SkillsSection />
          <hr className="border-[#dbe0e6] dark:border-white/10" />
          <AchievementsSection />
        </div>
      </div>
    </main>
  );
}

export default EditorPanel;
