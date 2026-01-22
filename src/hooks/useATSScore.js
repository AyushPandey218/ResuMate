import { useMemo } from 'react';

export function useATSScore(resume) {
  const score = useMemo(() => {
    if (!resume || !resume.content) return 0;

    let totalScore = 0;
    const { personalInfo, summary, workExperience, education, projects, certifications, skills, achievements } = resume.content;

    // Personal Information (15 points)
    let personalScore = 0;
    if (personalInfo.firstName) personalScore += 3;
    if (personalInfo.lastName) personalScore += 3;
    if (personalInfo.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) personalScore += 3;
    if (personalInfo.phone) personalScore += 3;
    if (personalInfo.city || personalInfo.state || personalInfo.country) personalScore += 3;
    totalScore += personalScore;

    // Summary/Objective (10 points)
    if (summary && summary.length >= 50) {
      totalScore += 10;
    } else if (summary && summary.length >= 20) {
      totalScore += 5;
    }

    // Work Experience (25 points)
    let workScore = 0;
    if (workExperience && workExperience.length > 0) {
      workScore += 8; // Has work experience
      
      workExperience.forEach(exp => {
        if (exp.jobTitle) workScore += 2;
        if (exp.company) workScore += 2;
        if (exp.startDate) workScore += 1;
        if (exp.description && exp.description.length >= 50) workScore += 2;
      });
      
      workScore = Math.min(workScore, 25); // Cap at 25
    }
    totalScore += workScore;

    // Education (12 points)
    let eduScore = 0;
    if (education && education.length > 0) {
      eduScore += 4; // Has education
      
      education.forEach(edu => {
        if (edu.degree) eduScore += 3;
        if (edu.institution) eduScore += 2;
        if (edu.endDate) eduScore += 1;
      });
      
      eduScore = Math.min(eduScore, 12); // Cap at 12
    }
    totalScore += eduScore;

    // Projects (15 points)
    let projectScore = 0;
    if (projects && projects.length > 0) {
      projectScore += 5; // Has projects
      
      projects.forEach(proj => {
        if (proj.name) projectScore += 2;
        if (proj.technologies) projectScore += 2;
        if (proj.description && proj.description.length >= 50) projectScore += 2;
      });
      
      projectScore = Math.min(projectScore, 15); // Cap at 15
    }
    totalScore += projectScore;

    // Certifications (10 points)
    let certScore = 0;
    if (certifications && certifications.length > 0) {
      certScore += 4; // Has certifications
      
      certifications.forEach(cert => {
        if (cert.name && cert.issuer) certScore += 3;
      });
      
      certScore = Math.min(certScore, 10); // Cap at 10
    }
    totalScore += certScore;

    // Skills (10 points)
    if (skills && skills.length > 0) {
      if (skills.length >= 8) {
        totalScore += 10;
      } else if (skills.length >= 5) {
        totalScore += 8;
      } else if (skills.length >= 3) {
        totalScore += 5;
      } else {
        totalScore += 3;
      }
    }

    // Achievements (5 points)
    if (achievements && achievements.length > 0) {
      if (achievements.length >= 5) {
        totalScore += 5;
      } else if (achievements.length >= 3) {
        totalScore += 4;
      } else {
        totalScore += 2;
      }
    }

    // Formatting & Structure (8 points)
    let formatScore = 0;
    
    // Check for action verbs in work experience
    const actionVerbs = ['led', 'managed', 'developed', 'created', 'implemented', 'designed', 'improved', 'increased', 'reduced', 'achieved', 'built', 'launched'];
    const hasActionVerbs = workExperience.some(exp => 
      actionVerbs.some(verb => exp.description?.toLowerCase().includes(verb))
    );
    if (hasActionVerbs) formatScore += 4;
    
    // Check for quantifiable achievements (numbers)
    const hasNumbers = workExperience.some(exp => /\d+/.test(exp.description));
    if (hasNumbers) formatScore += 4;
    
    totalScore += formatScore;

    return Math.min(Math.round(totalScore), 100); // Cap at 100
  }, [resume]);

  const getFeedback = useMemo(() => {
    const feedback = [];
    
    if (score < 50) {
      feedback.push('Add more details to improve your ATS score');
    }
    
    if (!resume?.content?.personalInfo?.email) {
      feedback.push('Add an email address');
    }
    
    if (!resume?.content?.summary || resume.content.summary.length < 50) {
      feedback.push('Add a professional summary (at least 50 characters)');
    }
    
    if (!resume?.content?.workExperience?.length) {
      feedback.push('Add work experience');
    }
    
    if (!resume?.content?.projects?.length) {
      feedback.push('Add projects to showcase your work');
    }
    
    if (!resume?.content?.skills?.length || resume.content.skills.length < 5) {
      feedback.push('Add more relevant skills (aim for 5-8)');
    }
    
    if (!resume?.content?.certifications?.length) {
      feedback.push('Add certifications to boost credibility');
    }
    
    if (score >= 85) {
      feedback.push('Excellent! Your resume is ATS-friendly');
    } else if (score >= 70) {
      feedback.push('Good! Minor improvements can boost your score');
    }

    return feedback;
  }, [score, resume]);

  return { score, feedback: getFeedback };
}
