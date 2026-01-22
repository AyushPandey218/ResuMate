import React from 'react';

function ClassicTemplate({ resume, customization }) {
  const { content } = resume;
  const { personalInfo, summary, workExperience, education, projects, certifications, skills, achievements } = content;
  const { fontFamily, fontSize, lineSpacing, accentColor, margins } = customization;

  const getMarginClass = () => {
    switch (margins) {
      case 'compact':
        return 'p-8';
      case 'wide':
        return 'p-16';
      default:
        return 'p-12';
    }
  };

  const getFontFamilyClass = () => {
    switch (fontFamily) {
      case 'Playfair':
        return 'font-serif';
      case 'Roboto':
        return 'font-roboto';
      default:
        return 'font-display';
    }
  };

  return (
    <div
      id="resume-preview"
      className={`a4-paper bg-white shadow-2xl rounded-sm text-[#111418] flex flex-col gap-6 ${getMarginClass()} ${getFontFamilyClass()}`}
      style={{
        fontSize: `${fontSize}pt`,
        lineHeight: lineSpacing,
      }}
    >
      {/* Header - Left Aligned Classic Style */}
      <div className="border-b-2 border-[#111418] pb-4">
        <h1 className="text-4xl font-bold mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex gap-3 text-[10px] text-[#617589] font-medium flex-wrap">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {(personalInfo.city || personalInfo.state || personalInfo.country) && (
            <span>• {[personalInfo.city, personalInfo.state, personalInfo.country].filter(Boolean).join(', ')}</span>
          )}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section>
          <h2 className="text-sm font-bold mb-2 uppercase" style={{ color: accentColor }}>
            Professional Summary
          </h2>
          <p className="text-[11px] text-[#4a5568] leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <section>
          <h2 className="text-sm font-bold mb-3 uppercase" style={{ color: accentColor }}>
            Professional Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold">{exp.jobTitle}</h3>
                  <span className="text-[10px] text-[#617589] font-semibold">
                    {exp.startDate} {exp.startDate && exp.endDate && '—'} {exp.endDate}
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#111418] mb-2">
                  {exp.company}
                  {exp.location && ` • ${exp.location}`}
                </p>
                {exp.description && (
                  <div className="text-[11px] text-[#4a5568] leading-relaxed">
                    {exp.description.split('\n').map((line, i) => (
                      <p key={i} className="mb-1">
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section>
          <h2 className="text-sm font-bold mb-3 uppercase" style={{ color: accentColor }}>
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <p className="text-xs font-bold">{edu.degree}</p>
                    <p className="text-[10px] text-[#617589] italic">{edu.institution}</p>
                  </div>
                  {edu.endDate && (
                    <span className="text-[10px] text-[#617589] font-semibold">{edu.endDate}</span>
                  )}
                </div>
                {edu.gpa && <p className="text-[10px] text-[#617589]">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-sm font-bold mb-3 uppercase" style={{ color: accentColor }}>
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold">{project.name}</h3>
                  <span className="text-[10px] text-[#617589] font-semibold">
                    {project.startDate} {project.startDate && project.endDate && '—'} {project.endDate}
                  </span>
                </div>
                {project.technologies && (
                  <p className="text-xs font-semibold text-[#111418] mb-2">{project.technologies}</p>
                )}
                {project.description && (
                  <p className="text-[11px] text-[#4a5568] leading-relaxed mb-1">{project.description}</p>
                )}
                {project.link && (
                  <p className="text-[10px] text-primary">{project.link}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="text-sm font-bold mb-3 uppercase" style={{ color: accentColor }}>
            Certifications
          </h2>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <p className="text-xs font-bold">{cert.name}</p>
                    <p className="text-[10px] text-[#617589] italic">{cert.issuer}</p>
                  </div>
                  {cert.date && (
                    <span className="text-[10px] text-[#617589] font-semibold">{cert.date}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-sm font-bold mb-2 uppercase" style={{ color: accentColor }}>
            Skills
          </h2>
          <p className="text-[11px] text-[#4a5568]">{skills.join(' • ')}</p>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section>
          <h2 className="text-sm font-bold mb-2 uppercase" style={{ color: accentColor }}>
            Key Achievements
          </h2>
          <ul className="space-y-1">
            {achievements.map((achievement, index) => (
              <li key={index} className="text-[11px] text-[#4a5568] leading-relaxed">
                • {achievement}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default ClassicTemplate;
