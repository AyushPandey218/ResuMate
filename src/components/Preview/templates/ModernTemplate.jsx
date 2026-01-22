import React from 'react';

const ModernTemplate = React.forwardRef(({ resume, customization }, ref) => {
  const { content } = resume;
  const { personalInfo, summary, workExperience, education, projects, certifications, skills, achievements } = content;
  const {
    fontFamily,
    accentColor,
    margins,
    showPhoto,
  } = customization;

  const getMarginClass = () => {
    switch (margins) {
      case 'compact':
        return 'px-8 py-6';
      case 'wide':
        return 'px-12 py-8';
      default:
        return 'px-10 py-7';
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
      ref={ref}
      id="resume-preview"
      className={`a4-paper bg-white shadow-2xl text-[#1a1a1a] ${getMarginClass()} ${getFontFamilyClass()}`}
    >
      {/* Header Section - Professional & Clean */}
      <header className="print-header mb-4 pb-3 border-b-2" style={{ borderColor: `${accentColor}20` }}>
        <div className="flex items-start gap-5">
          {/* Photo */}
          {showPhoto && personalInfo.photo && (
            <img
              src={personalInfo.photo}
              alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
              className="w-24 h-24 rounded-xl object-cover border-2 shadow-sm"
              style={{ borderColor: accentColor }}
            />
          )}
          
          {/* Name and Contact Info */}
          <div className="flex-1">
            <h1 className="text-[26px] font-extrabold tracking-tight mb-2 text-[#0a0a0a]" style={{ letterSpacing: '-0.03em' }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[9px] text-[#4a5568] leading-tight">
              {personalInfo.email && (
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="hover:underline transition-all font-semibold inline-flex items-center gap-1"
                  style={{ color: accentColor }}
                >
                  <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: `${accentColor}20` }}></span>
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <span className="inline-flex items-center gap-1 font-medium">
                  <span className="inline-block w-3 h-3 rounded-full bg-slate-200"></span>
                  {personalInfo.phone}
                </span>
              )}
              {(personalInfo.city || personalInfo.state || personalInfo.country) && (
                <span className="inline-flex items-center gap-1 font-medium">
                  <span className="inline-block w-3 h-3 rounded-full bg-slate-200"></span>
                  {[personalInfo.city, personalInfo.state, personalInfo.country].filter(Boolean).join(', ')}
                </span>
              )}
              {personalInfo.linkedin && (
                <a 
                  href={personalInfo.linkedin} 
                  className="hover:underline transition-all font-semibold inline-flex items-center gap-1"
                  style={{ color: accentColor }}
                >
                  <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: `${accentColor}20` }}></span>
                  LinkedIn
                </a>
              )}
              {personalInfo.github && (
                <a 
                  href={personalInfo.github} 
                  className="hover:underline transition-all font-semibold inline-flex items-center gap-1"
                  style={{ color: accentColor }}
                >
                  <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: `${accentColor}20` }}></span>
                  GitHub
                </a>
              )}
              {personalInfo.website && (
                <a 
                  href={personalInfo.website} 
                  className="hover:underline transition-all font-semibold inline-flex items-center gap-1"
                  style={{ color: accentColor }}
                >
                  <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: `${accentColor}20` }}></span>
                  {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-3">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: accentColor }}></div>
            <h2 
              className="text-[11px] font-bold tracking-wide uppercase"
              style={{ color: accentColor }}
            >
              Professional Summary
            </h2>
          </div>
          <p className="text-[9px] text-[#2d3748] leading-[1.4] pl-3.5">
            {summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-3">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: accentColor }}></div>
            <h2 
              className="text-[11px] font-bold tracking-wide uppercase"
              style={{ color: accentColor }}
            >
              Professional Experience
            </h2>
          </div>
          <div className="space-y-3 pl-3.5">
            {workExperience.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="flex justify-between items-start mb-0.5 gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[10px] font-bold text-[#0a0a0a] mb-0.5">{exp.jobTitle}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-[9px] font-semibold" style={{ color: accentColor }}>
                        {exp.company}
                      </p>
                      {exp.location && (
                        <span className="text-[8.5px] text-[#4a5568] flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[8.5px] text-[#4a5568] font-semibold whitespace-nowrap flex-shrink-0 px-1.5 py-0.5 rounded" style={{ backgroundColor: `${accentColor}10` }}>
                    {exp.startDate} {exp.startDate && exp.endDate && '–'} {exp.endDate || 'Present'}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-[9px] text-[#2d3748] leading-[1.35] mt-1">
                    {exp.description.split('\n').map((line, i) => {
                      const trimmedLine = line.trim();
                      if (!trimmedLine) return null;
                      
                      // Check if line starts with bullet point
                      const startsWithBullet = trimmedLine.startsWith('•') || trimmedLine.startsWith('-');
                      const content = startsWithBullet ? trimmedLine.substring(1).trim() : trimmedLine;
                      
                      return (
                        <div key={i} className="flex items-start gap-1.5 mb-1">
                          <span className="w-1 h-1 rounded-full mt-[4px] flex-shrink-0" style={{ backgroundColor: accentColor }}></span>
                          <span className="flex-1 min-w-0">{content}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="mb-3">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: accentColor }}></div>
            <h2 
              className="text-[11px] font-bold tracking-wide uppercase"
              style={{ color: accentColor }}
            >
              Projects
            </h2>
          </div>
          <div className="space-y-2 pl-3.5">
            {projects.map((project) => (
              <div key={project.id} className="relative grid grid-cols-[1fr_auto] gap-3">
                <div>
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <h3 className="text-[10px] font-bold text-[#0a0a0a]">{project.name}</h3>
                    {(project.startDate || project.endDate) && (
                      <span className="text-[8px] text-[#4a5568] font-medium">
                        {project.startDate} {project.startDate && project.endDate && '–'} {project.endDate}
                      </span>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-[8.5px] text-[#4a5568] mb-1 font-medium">
                      <strong>Tech:</strong> {project.technologies}
                    </p>
                  )}
                  {project.description && (
                    <p className="text-[9px] text-[#2d3748] leading-[1.35]">
                      {project.description}
                    </p>
                  )}
                </div>
                {project.link && (
                  <div className="flex items-start pt-0.5">
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[8px] font-semibold hover:underline inline-flex items-center gap-0.5 whitespace-nowrap" 
                      style={{ color: accentColor }}
                    >
                      <span>🔗</span>
                      <span>View</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="mb-3">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: accentColor }}></div>
            <h2 
              className="text-[11px] font-bold tracking-wide uppercase"
              style={{ color: accentColor }}
            >
              Education
            </h2>
          </div>
          <div className="space-y-2 pl-3.5">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[10px] font-bold text-[#0a0a0a]">{edu.degree}</h3>
                  <p className="text-[9.5px] font-semibold mt-0.5" style={{ color: accentColor }}>{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-[8.5px] text-[#4a5568] mt-0.5 font-medium">GPA: {edu.gpa}</p>
                  )}
                </div>
                {edu.endDate && (
                  <span className="text-[8.5px] text-[#4a5568] font-semibold whitespace-nowrap flex-shrink-0 px-2 py-0.5 rounded" style={{ backgroundColor: `${accentColor}10` }}>{edu.endDate}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="mb-3">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: accentColor }}></div>
            <h2 
              className="text-[11px] font-bold tracking-wide uppercase"
              style={{ color: accentColor }}
            >
              Technical Skills
            </h2>
          </div>
          <div className="flex flex-wrap gap-1.5 pl-3.5">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="text-[8.5px] font-semibold px-2.5 py-1 rounded-full border-2"
                style={{ 
                  borderColor: accentColor,
                  backgroundColor: 'white',
                  color: accentColor
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <section className="mb-3">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: accentColor }}></div>
            <h2 
              className="text-[11px] font-bold tracking-wide uppercase"
              style={{ color: accentColor }}
            >
              Certifications
            </h2>
          </div>
          <div className="space-y-2 pl-3.5">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start gap-3 p-2 rounded" style={{ backgroundColor: `${accentColor}05` }}>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[10px] font-bold text-[#0a0a0a]">{cert.name}</h3>
                  <p className="text-[9px] font-semibold mt-0.5" style={{ color: accentColor }}>{cert.issuer}</p>
                </div>
                {cert.date && (
                  <span className="text-[8.5px] text-[#4a5568] font-semibold whitespace-nowrap flex-shrink-0 px-2 py-0.5 rounded" style={{ backgroundColor: 'white' }}>{cert.date}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements Section */}
      {achievements.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: accentColor }}></div>
            <h2 
              className="text-[11px] font-bold tracking-wide uppercase"
              style={{ color: accentColor }}
            >
              Key Achievements
            </h2>
          </div>
          <div className="space-y-1 pl-3.5">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-[5px] flex-shrink-0" style={{ backgroundColor: accentColor }}></span>
                <span className="text-[9.5px] text-[#2d3748] leading-[1.5] flex-1 min-w-0">{achievement}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
});

ModernTemplate.displayName = 'ModernTemplate';

export default ModernTemplate;
