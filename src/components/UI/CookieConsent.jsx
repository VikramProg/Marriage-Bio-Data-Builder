import React from 'react';

const STORAGE_KEY = 'cookie_consent';

const CookieConsent = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    } else {
      updateConsent(stored);
    }
  }, []);

  const updateConsent = (status) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      const value = status === 'granted' ? 'granted' : 'denied';
      window.gtag('consent', 'update', {
        analytics_storage: value,
        ad_storage: value,
      });
    }
  };

  const handleChoice = (status) => {
    localStorage.setItem(STORAGE_KEY, status);
    updateConsent(status);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto z-50 max-w-3xl">
      <div className="bg-white shadow-2xl border border-gray-200 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center md:gap-4">
        <div className="flex-1 text-sm text-gray-700">
          We use cookies to understand usage and improve SaathJanam. No ads, no tracking beyond anonymized analytics.
        </div>
        <div className="flex gap-2 mt-3 md:mt-0">
          <button
            onClick={() => handleChoice('denied')}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200"
          >
            Decline
          </button>
          <button
            onClick={() => handleChoice('granted')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
