import { format, formatDistanceToNow } from 'date-fns';

export function formatLastEdited(dateString) {
  try {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    return 'Unknown';
  }
}

export function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return format(date, 'MMM yyyy');
  } catch (error) {
    return dateString;
  }
}

export function exportToJSON(resume) {
  const dataStr = JSON.stringify(resume, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `${resume.title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

export function importFromJSON(file, callback) {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const resume = JSON.parse(e.target.result);
      callback(resume, null);
    } catch (error) {
      callback(null, 'Invalid JSON file');
    }
  };
  
  reader.onerror = () => {
    callback(null, 'Failed to read file');
  };
  
  reader.readAsText(file);
}

export function generateResumeTitle(personalInfo) {
  const { firstName, lastName, jobTitle } = personalInfo;
  
  if (jobTitle) {
    return jobTitle;
  } else if (firstName || lastName) {
    return `${firstName} ${lastName}`.trim() + "'s Resume";
  } else {
    return 'Untitled Resume';
  }
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
