import React, { useRef, useState } from 'react';
import { useBioData } from '../../context/BioDataContext';
import BioDataPreview from '../Preview/BioDataPreview';
import { Download, Edit2, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import ImageExportModal from '../UI/ImageExportModal';

const FinalReview = ({ onEdit }) => {
    const { state, dispatch, TYPES } = useBioData();
    const { theme } = state;
    const printComponentRef = useRef();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const trackDownloadClick = () => {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'download_click', {
                event_category: 'engagement',
                event_label: 'Final Review Download',
            });
        }
    };

    const handleDownloadClick = () => {
        trackDownloadClick();
        setIsModalOpen(true);
    };

    const handleExport = (format) => {
        if (printComponentRef.current) {
            const wrapper = printComponentRef.current.parentElement;
            const prevTransform = wrapper?.style.transform;
            const prevOrigin = wrapper?.style.transformOrigin;
            if (wrapper) {
                wrapper.style.transform = 'scale(1)';
                wrapper.style.transformOrigin = 'top left';
            }
            html2canvas(printComponentRef.current, {
                scale: 3, // Higher scale for better quality
                useCORS: true,
                allowTaint: true,
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = `biodata.${format}`;
                link.href = canvas.toDataURL(`image/${format}`, 1.0);
                link.click();
            }).finally(() => {
                if (wrapper) {
                    wrapper.style.transform = prevTransform || '';
                    wrapper.style.transformOrigin = prevOrigin || '';
                }
            });
        }
        setIsModalOpen(false);
    };


    // Auto-scaling logic
    const containerRef = useRef(null);
    const [scale, setScale] = React.useState(0.8);

    React.useEffect(() => {
        const updateScale = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const targetWidth = 794; // A4 width in pixels (approx) at 96 DPI (210mm)
                const scaleWidth = (containerWidth - 24) / targetWidth;
                const newScale = mobile ? 1 : Math.min(Math.max(scaleWidth, 0.5), 1);
                setScale(newScale);
            }
        };

        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) observer.observe(containerRef.current);
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateScale);
        };
    }, []);

    const themes = [
        { id: 'standard', name: 'Standard', color: 'bg-blue-500' },
        { id: 'classic', name: 'Classic', color: 'bg-yellow-400' },
        { id: 'modern', name: 'Modern', color: 'bg-gray-900' },
        { id: 'retro', name: 'Retro', color: 'bg-orange-500' },
        { id: 'traditional', name: 'Traditional', color: 'bg-red-600' },
        { id: 'floral', name: 'Floral', color: 'bg-pink-500' },
        { id: 'divine', name: 'Divine', color: 'bg-orange-300' },
        { id: 'classic-hindu', name: 'Hindu', color: 'bg-yellow-500' },
        { id: 'royal', name: 'Royal', color: 'bg-purple-500' },
        { id: 'elegant', name: 'Elegant', color: 'bg-gray-200' },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-3 gap-4 flex-wrap">
                <div>
                    <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Step 8</span>
                    <h2 className="text-3xl font-bold text-gray-800">Final Review</h2>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <button onClick={onEdit} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                        <Edit2 size={18} /> <span>Edit Data</span>
                    </button>
                    <button
                        onClick={handleDownloadClick}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-md flex items-center gap-2"
                        aria-label="Download"
                        title="Download"
                    >
                        <Download size={18} /> <span>Download</span>
                    </button>
                </div>
            </div>
            <div className="flex md:hidden w-full justify-between items-center mb-6 gap-3">
                <button onClick={onEdit} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                    <Edit2 size={18} /> <span>Edit Data</span>
                </button>
                <button
                    onClick={handleDownloadClick}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-md flex items-center justify-center"
                    aria-label="Download"
                    title="Download"
                >
                    <Download size={18} />
                </button>
            </div>

            {/* Templates first */}
            <div className="mb-4">
                <h3 className="font-bold text-gray-700 mb-2">Choose Template</h3>
                <div className="flex flex-wrap gap-3">
                    {themes.map(t => (
                        <button
                            key={t.id}
                            onClick={() => dispatch({ type: TYPES.SET_THEME, payload: t.id })}
                            className={`group relative w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all
                                ${theme === t.id ? 'border-blue-500 ring-2 ring-blue-200 scale-105' : 'border-transparent hover:border-gray-200'}
                                ${t.color}
                            `}
                            title={t.name}
                        >
                            {theme === t.id && <Check size={18} className="text-white drop-shadow" />}
                            {theme === t.id && (
                                <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-gray-700 bg-white px-2 py-1 rounded-lg shadow-sm whitespace-nowrap z-10">
                                    {t.name}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-grow flex flex-col md:flex-row gap-6 md:gap-8 overflow-visible">
                <div
                    ref={containerRef}
                    className={`flex-grow overflow-auto ${isMobile ? 'bg-transparent p-0' : 'bg-gray-100 p-2 md:p-4'} rounded-xl border border-gray-200 shadow-inner flex justify-start md:justify-center items-start relative min-h-0 md:min-h-[500px]`}
                >
                    <div
                        style={{
                            transform: `scale(${scale})`,
                            transformOrigin: 'left top'
                        }}
                        className={`transition-transform duration-200 ease-out mt-0 md:mt-2 shadow-2xl ${isMobile ? 'ml-0' : ''}`}
                    >
                         <div ref={printComponentRef} style={{ background: 'white' }}>
                            <BioDataPreview hideControls={true} />
                        </div>
                    </div>
                </div>
            </div>
            
            {isModalOpen && (
                <ImageExportModal 
                    onExport={handleExport}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default FinalReview;
