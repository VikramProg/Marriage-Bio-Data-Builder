import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { BioDataProvider, useBioData } from './context/BioDataContext';
import MultiStepForm from './components/Wizard/MultiStepForm';
import BioDataPreview from './components/Preview/BioDataPreview';
import WelcomeScreen from './components/Home/WelcomeScreen';
import FinalReview from './components/Wizard/FinalReview';
import PrintScaler from './components/Preview/PrintScaler';
import { Eye, X, Github, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = () => {
  const { state } = useBioData();
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle Title Update
  React.useEffect(() => {
    document.title = 'SathJanam';
  }, []);

  // Handle Navigation Callbacks
  const handleStart = () => navigate('/create');
  const handleComplete = () => navigate('/review');
  const handleBackHome = () => navigate('/');
  const handleEdit = () => navigate('/create');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center py-6 px-4 md:py-10 transition-colors duration-500"
    >
      {/* Hide Header on Welcome Screen and Print Screen */}
      {location.pathname !== '/' && location.pathname !== '/print' && (
        <header className="w-full max-w-4xl mb-8 flex justify-between items-center px-2 py-2 md:py-3">
          <div onClick={handleBackHome} style={{ cursor: 'pointer' }} className="flex items-center gap-3">
            <img src="/logo.svg" alt="logo" className="h-8 w-8" />
            <h1 className="text-lg md:text-2xl font-bold text-gray-800 tracking-tighter leading-snug">
              SaathJanam Bio Data Builder
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {/* Preview Button (Opens Modal) - Only show in Wizard */}
            {location.pathname === '/create' && (
              <button
                onClick={() => setShowPreviewModal(true)}
                className="flex items-center gap-2 px-3 py-2 bg-white/50 hover:bg-white text-blue-700 rounded-full text-sm font-bold border border-blue-100 shadow-sm transition-all"
              >
                <Eye size={18} />
                <span className="hidden sm:inline">Preview</span>
              </button>
            )}
            <a href={import.meta.env.VITE_TWITTER_URL} target="_blank" rel="noopener noreferrer" title="Twitter Profile" className="p-1">
              <Twitter size={18} className="text-gray-500 hover:text-blue-500 transition-colors" />
            </a>
            <a href={import.meta.env.VITE_GITHUB_URL} target="_blank" rel="noopener noreferrer" title="GitHub Repository" className="p-1">
              <Github size={18} className="text-gray-500 hover:text-gray-800 transition-colors" />
            </a>
          </div>
        </header>
      )}

      {location.pathname !== '/' && location.pathname !== '/print' && (
        <hr className="w-full max-w-4xl border-t border-gray-200 mb-8" />
      )}

      <main className={`w-full relative transition-all duration-500 ${location.pathname === '/review' ? 'max-w-7xl' : 'max-w-4xl'}`}>
        <div className={`
            ${location.pathname === '/review' ? 'w-full' : 'max-w-2xl mx-auto'}
        `}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<WelcomeScreen onStart={handleStart} />} />

              <Route path="/create" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-xl border border-white/50"
                >
                  <MultiStepForm onBackHome={handleBackHome} onComplete={handleComplete} />
                </motion.div>
              } />

              <Route path="/review" element={
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                >
                  <FinalReview onEdit={handleEdit} onBackHome={handleBackHome} />
                </motion.div>
              } />

              {/* Dedicated Print Route */}
              <Route path="/print" element={
                <div className="w-full flex justify-center bg-white min-h-screen">
                  <div className="w-[210mm]">
                    <PrintScaler />
                    <BioDataPreview hideControls={true} />
                  </div>
                </div>
              } />
            </Routes>
          </AnimatePresence>
        </div>
      </main>

      {/* Preview Modal (Desktop & Mobile) */}
      <AnimatePresence>
        {showPreviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowPreviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-lg text-gray-800">Live Preview</h3>
                <button onClick={() => setShowPreviewModal(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4 md:p-6 bg-gray-100/50 flex justify-center items-start">
                {/* Scale down slightly on mobile so it fits better */}
                <div className="transform scale-[0.85] md:scale-100 origin-top">
                  <BioDataPreview hideControls={true} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {location.pathname !== '/print' && (
        <footer className="mt-12 text-center text-sm text-gray-400 pb-4 no-print">
          <p>Made with ❤️ & Privacy. No data stored on server.</p>
        </footer>
      )}
    </motion.div>
  );
};

function App() {
  return (
    <BioDataProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </BioDataProvider>
  );
}

export default App;
