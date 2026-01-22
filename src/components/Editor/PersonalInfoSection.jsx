import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { useCustomization } from '../../contexts/CustomizationContext';

function PersonalInfoSection() {
  const { resume, dispatch } = useResume();
  const { customization, dispatch: customizationDispatch } = useCustomization();
  const personalInfo = resume.content.personalInfo;

  const handleChange = (field, value) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [field]: value },
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('photo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    handleChange('photo', '');
  };

  const handleTogglePhoto = () => {
    customizationDispatch({ type: 'TOGGLE_PHOTO' });
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#111418] dark:text-white text-lg font-bold">Personal Information</h3>
        <span className="material-symbols-outlined text-primary">person</span>
      </div>

      {/* Photo Upload Section */}
      <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700">
        <label className="block text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-2 uppercase tracking-wide">
          Profile Photo
        </label>
        <div className="flex items-center gap-4">
          {personalInfo.photo ? (
            <div className="relative">
              <img
                src={personalInfo.photo}
                alt="Profile"
                className="w-24 h-24 rounded-lg object-cover border-2 border-slate-300 dark:border-slate-600"
              />
              <button
                onClick={handleRemovePhoto}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                title="Remove photo"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
              <span className="material-symbols-outlined text-slate-400 text-3xl">person</span>
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-semibold transition-colors">
                <span className="material-symbols-outlined text-sm">upload</span>
                <span>{personalInfo.photo ? 'Change Photo' : 'Upload Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              
              {personalInfo.photo && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Show on Resume</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customization.showPhoto}
                      onChange={handleTogglePhoto}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              JPG, PNG or GIF. Max 5MB.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col">
          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
            First Name
          </p>
          <input
            type="text"
            value={personalInfo.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="w-full rounded-xl border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-white/5 h-11 px-4 text-sm focus:ring-primary focus:border-primary dark:text-white"
            placeholder="John"
          />
        </label>
        <label className="flex flex-col">
          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
            Last Name
          </p>
          <input
            type="text"
            value={personalInfo.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="w-full rounded-xl border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-white/5 h-11 px-4 text-sm focus:ring-primary focus:border-primary dark:text-white"
            placeholder="Doe"
          />
        </label>
        <label className="flex flex-col col-span-2">
          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
            Email Address
          </p>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full rounded-xl border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-white/5 h-11 px-4 text-sm focus:ring-primary focus:border-primary dark:text-white"
            placeholder="john.doe@example.com"
          />
        </label>
        <label className="flex flex-col">
          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
            Phone
          </p>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full rounded-xl border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-white/5 h-11 px-4 text-sm focus:ring-primary focus:border-primary dark:text-white"
            placeholder="+1 (555) 000-0000"
          />
        </label>
        <label className="flex flex-col">
          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
            City
          </p>
          <input
            type="text"
            value={personalInfo.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full rounded-xl border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-white/5 h-11 px-4 text-sm focus:ring-primary focus:border-primary dark:text-white"
            placeholder="New York"
          />
        </label>
        <label className="flex flex-col">
          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
            State/Province
          </p>
          <input
            type="text"
            value={personalInfo.state}
            onChange={(e) => handleChange('state', e.target.value)}
            className="w-full rounded-xl border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-white/5 h-11 px-4 text-sm focus:ring-primary focus:border-primary dark:text-white"
            placeholder="NY"
          />
        </label>
        <label className="flex flex-col col-span-2">
          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
            Country
          </p>
          <input
            type="text"
            value={personalInfo.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className="w-full rounded-xl border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-white/5 h-11 px-4 text-sm focus:ring-primary focus:border-primary dark:text-white"
            placeholder="United States"
          />
        </label>
        <label className="flex flex-col">
          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
            Website
          </p>
          <input
            type="url"
            value={personalInfo.website}
            onChange={(e) => handleChange('website', e.target.value)}
            className="w-full rounded-xl border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-white/5 h-11 px-4 text-sm focus:ring-primary focus:border-primary dark:text-white"
            placeholder="portfolio.com"
          />
        </label>
        <label className="flex flex-col">
          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
            LinkedIn
          </p>
          <input
            type="url"
            value={personalInfo.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="w-full rounded-xl border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-white/5 h-11 px-4 text-sm focus:ring-primary focus:border-primary dark:text-white"
            placeholder="linkedin.com/in/johndoe"
          />
        </label>
        <label className="flex flex-col col-span-2">
          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
            GitHub
          </p>
          <input
            type="url"
            value={personalInfo.github}
            onChange={(e) => handleChange('github', e.target.value)}
            className="w-full rounded-xl border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-white/5 h-11 px-4 text-sm focus:ring-primary focus:border-primary dark:text-white"
            placeholder="github.com/johndoe"
          />
        </label>
      </div>
    </section>
  );
}

export default PersonalInfoSection;
