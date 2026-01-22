import React, { useState, useEffect } from 'react';

function SupportReminder() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has permanently dismissed it
    const dismissed = localStorage.getItem('supportReminderDismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show popup immediately
    setIsVisible(true);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('supportReminderDismissed', 'true');
  };

  const handleSupport = () => {
    window.open('https://buymeacoffee.com/ayush_wg218', '_blank');
    handleDismiss();
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-white dark:bg-[#1a2332] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 p-5 max-w-sm relative">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Content */}
        <div className="flex items-start gap-3 pr-6">
          <div className="text-3xl">☕</div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-[#111418] dark:text-white mb-1">
              Enjoying Resumate?
            </h3>
            <p className="text-xs text-[#617589] dark:text-[#94a3b8] mb-3">
              If this tool is helping you land your dream job, consider buying me a coffee! ☕
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleSupport}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#FFDD00] hover:bg-[#FFED4E] text-black rounded-lg font-semibold text-xs transition-all hover:scale-105"
              >
                <span>☕</span>
                <span>Buy Me a Coffee</span>
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 text-[#617589] hover:text-[#111418] dark:text-[#94a3b8] dark:hover:text-white text-xs font-medium transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportReminder;
