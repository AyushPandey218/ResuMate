import React from 'react';

function MinimalTemplate({ resume, customization }) {
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
      className={`a4-paper bg-white shadow-2xl rounded-sm text-[#111418] flex flex-col gap-5 ${getMarginClass()} ${getFontFamilyClass()}`}
      style={{
        fontSize: `${fontSize}pt`,
        lineHeight: lineSpacing,
      }}
    >
      {/* Header - Minimalist */}
      <div className="text-center pb-4">
        <h1 className="text-2xl font-bold tracking-wide mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex justify-center gap-2 text-[9px] text-[#617589] flex-wrap">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {(personalInfo.city || personalInfo.state || personalInfo.country) && (
            <span>| {[personalInfo.city, personalInfo.state, personalInfo.country].filter(Boolean).join(', ')}</span>
          )}
          {personalInfo.website && <span>| {personalInfo.website}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section>
          <p className="text-[11px] text-[#4a5568] leading-relaxed text-center italic">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <section>
          <h2
            className="text-xs font-bold mb-3 uppercase tracking-widest pb-1 border-b"
            style={{ color: accentColor, borderColor: accentColor }}
          >
            Experience
          </h2>
          <div className="space-y-3">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-xs font-bold">{exp.jobTitle}</h3>
                  <span className="text-[9px] text-[#617589]">
                    {exp.startDate} {exp.startDate && exp.endDate && '—'} {exp.endDate}
                  </span>
                </div>
                <p className="text-[10px] font-medium text-[#617589] mb-1">
                  {exp.company}
                  {exp.location && ` • ${exp.location}`}
                </p>
                {exp.description && (
                  <div className="text-[10px] text-[#4a5568] leading-relaxed">
                    {exp.description.split('\n').map((line, i) => (
                      <p key={i} className="mb-0.5">
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
          <h2
            className="text-xs font-bold mb-3 uppercase tracking-widest pb-1 border-b"
            style={{ color: accentColor, borderColor: accentColor }}
          >
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-xs font-bold">{edu.degree}</p>
                  <p className="text-[9px] text-[#617589]">{edu.institution}</p>
                </div>
                {edu.endDate && (
                  <span className="text-[9px] text-[#617589]">{edu.endDate}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <h2
            className="text-xs font-bold mb-3 uppercase tracking-widest pb-1 border-b"
            style={{ color: accentColor, borderColor: accentColor }}
          >
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-xs font-bold">{project.name}</h3>
                  <span className="text-[9px] text-[#617589]">
                    {project.startDate} {project.startDate && project.endDate && '—'} {project.endDate}
                  </span>
                </div>
                {project.technologies && (
                  <p className="text-[10px] font-medium text-[#617589] mb-1">{project.technologies}</p>
                )}
                {project.description && (
                  <p className="text-[10px] text-[#4a5568] leading-relaxed mb-1">{project.description}</p>
                )}
                {project.link && (
                  <p className="text-[9px] text-primary">{project.link}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2
            className="text-xs font-bold mb-3 uppercase tracking-widest pb-1 border-b"
            style={{ color: accentColor, borderColor: accentColor }}
          >
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-xs font-bold">{cert.name}</p>
                  <p className="text-[9px] text-[#617589]">{cert.issuer}</p>
                </div>
                {cert.date && (
                  <span className="text-[9px] text-[#617589]">{cert.date}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2
            className="text-xs font-bold mb-2 uppercase tracking-widest pb-1 border-b"
            style={{ color: accentColor, borderColor: accentColor }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="text-[9px] text-[#4a5568] border border-[#dbe0e6] px-2 py-0.5 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section>
          <h2
            className="text-xs font-bold mb-2 uppercase tracking-widest pb-1 border-b"
            style={{ color: accentColor, borderColor: accentColor }}
          >
            Key Achievements
          </h2>
          <ul className="space-y-1">
            {achievements.map((achievement, index) => (
              <li key={index} className="text-[10px] text-[#4a5568] leading-relaxed">
                • {achievement}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default MinimalTemplate;
