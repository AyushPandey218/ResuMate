import React from 'react';
import { useCustomization } from '../../contexts/CustomizationContext';
import { useResume } from '../../contexts/ResumeContext';

function CustomizationPanel() {
  const { customization, dispatch } = useCustomization();
  const { resume, dispatch: resumeDispatch } = useResume();

  const handleFontFamilyChange = (font) => {
    dispatch({ type: 'UPDATE_FONT_FAMILY', payload: font });
  };

  const handleAccentColorChange = (color) => {
    dispatch({ type: 'UPDATE_ACCENT_COLOR', payload: color });
  };

  const handleMarginsChange = (margin) => {
    dispatch({ type: 'UPDATE_MARGINS', payload: margin });
  };

  const handleTogglePhoto = () => {
    dispatch({ type: 'TOGGLE_PHOTO' });
  };

  const handleTemplateChange = (template) => {
    resumeDispatch({ type: 'UPDATE_TEMPLATE', payload: template });
  };

  const handleResetCustomization = () => {
    if (window.confirm('Reset all customization settings to default?')) {
      dispatch({ type: 'RESET_CUSTOMIZATION' });
    }
  };

  const colorOptions = [
    { name: 'Blue', value: '#137fec' },
    { name: 'Rose', value: '#e11d48' },
    { name: 'Green', value: '#16a34a' },
    { name: 'Purple', value: '#7c3aed' },
    { name: 'Orange', value: '#ea580c' },
    { name: 'Black', value: '#111827' },
  ];

  return (
    <aside className="hidden lg:flex w-72 border-r border-slate-200 bg-white dark:bg-background-dark dark:border-slate-800 overflow-y-auto flex-col custom-scrollbar">
      <div className="p-4 sm:p-6">
        <h1 className="text-[#111418] dark:text-white text-base font-bold uppercase tracking-wider">
          Customizer
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Real-time styling tools</p>
      </div>

      {/* Template Selection */}
      <div className="px-6 pb-6">
        <div className="flex items-center gap-2 mb-4 text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
          <span className="material-symbols-outlined text-sm">style</span>
          <span className="text-xs font-semibold uppercase tracking-wider">Template</span>
        </div>
        <div className="flex flex-col gap-2">
          {['modern', 'classic', 'minimal'].map((template) => (
            <label
              key={template}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                resume.template === template
                  ? 'border-primary bg-primary/5'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <input
                type="radio"
                name="template"
                value={template}
                checked={resume.template === template}
                onChange={() => handleTemplateChange(template)}
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium dark:text-slate-200 capitalize">
                {template}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="px-6 pb-6">
        <div className="flex items-center gap-2 mb-4 text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
          <span className="material-symbols-outlined text-sm">text_fields</span>
          <span className="text-xs font-semibold uppercase tracking-wider">Typography</span>
        </div>
        <div className="space-y-6">
          {/* Font Family */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium dark:text-slate-200">Font Family</label>
            <div className="flex h-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
              {['Inter', 'Playfair', 'Roboto'].map((font) => (
                <label
                  key={font}
                  className={`flex cursor-pointer h-full grow items-center justify-center rounded-md px-2 text-xs font-semibold transition-all ${
                    customization.fontFamily === font
                      ? 'bg-white dark:bg-slate-700 shadow-sm text-primary'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <span>{font}</span>
                  <input
                    type="radio"
                    name="font-family"
                    value={font}
                    checked={customization.fontFamily === font}
                    onChange={() => handleFontFamilyChange(font)}
                    className="invisible w-0"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="px-6 pb-6">
        <div className="flex items-center gap-2 mb-4 text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
          <span className="material-symbols-outlined text-sm">dashboard</span>
          <span className="text-xs font-semibold uppercase tracking-wider">Layout</span>
        </div>
        <div className="space-y-6">
          {/* Resume Photo Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium dark:text-slate-200">Resume Photo</span>
              <span className="text-[10px] text-slate-500">Show photo on document</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={customization.showPhoto}
                onChange={handleTogglePhoto}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* Page Margins */}
          <div className="space-y-2">
            <label className="text-sm font-medium dark:text-slate-200">Page Margins</label>
            <div className="flex h-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
              {['compact', 'normal', 'wide'].map((margin) => (
                <label
                  key={margin}
                  className={`flex cursor-pointer h-full grow items-center justify-center rounded-md px-2 text-xs font-semibold transition-all capitalize ${
                    customization.margins === margin
                      ? 'bg-white dark:bg-slate-700 text-primary'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <span>{margin}</span>
                  <input
                    type="radio"
                    name="margins"
                    value={margin}
                    checked={customization.margins === margin}
                    onChange={() => handleMarginsChange(margin)}
                    className="invisible w-0"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="px-6 pb-6">
        <div className="flex items-center gap-2 mb-4 text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
          <span className="material-symbols-outlined text-sm">palette</span>
          <span className="text-xs font-semibold uppercase tracking-wider">Colors</span>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium dark:text-slate-200">Accent Color</label>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleAccentColorChange(color.value)}
                  className={`size-8 rounded-full border-2 cursor-pointer transition-all hover:scale-110 ${
                    customization.accentColor === color.value
                      ? 'border-white dark:border-slate-700 ring-2 ring-primary/50'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="mt-auto p-6 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800">
        <p className="text-[10px] text-slate-400 text-center mb-3">
          All data stays in your browser.
        </p>
        <button
          onClick={handleResetCustomization}
          className="w-full flex items-center justify-center gap-2 rounded-lg h-10 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">restart_alt</span>
          <span>Reset Styles</span>
        </button>
      </div>
    </aside>
  );
}

export default CustomizationPanel;
