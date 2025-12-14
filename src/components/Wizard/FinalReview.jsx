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

    const handleDownloadClick = () => {
        setIsModalOpen(true);
    };

    const handleExport = (format) => {
        if (printComponentRef.current) {
            html2canvas(printComponentRef.current, {
                scale: 3, // Higher scale for better quality
                useCORS: true,
                allowTaint: true,
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = `biodata.${format}`;
                link.href = canvas.toDataURL(`image/${format}`, 1.0);
                link.click();
            });
        }
        setIsModalOpen(false);
    };


    // Auto-scaling logic
    const containerRef = useRef(null);
    const [scale, setScale] = React.useState(0.8);

    React.useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const targetWidth = 794; // A4 width in pixels (approx) at 96 DPI (210mm)
                const scaleWidth = (containerWidth - 40) / targetWidth;
                const newScale = Math.min(Math.max(scaleWidth, 0.3), 1);
                setScale(newScale);
            }
        };

        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) observer.observe(containerRef.current);
        updateScale();
        return () => observer.disconnect();
    }, []);

    const themes = [
        { id: 'standard', name: 'Standard', color: 'bg-blue-100' },
        { id: 'classic', name: 'Classic', color: 'bg-yellow-100' },
        { id: 'modern', name: 'Modern', color: 'bg-gray-800 text-white' },
        { id: 'retro', name: 'Retro', color: 'bg-orange-100' },
        { id: 'traditional', name: 'Traditional', color: 'bg-red-100' },
        { id: 'floral', name: 'Floral', color: 'bg-pink-100' },
        { id: 'divine', name: 'Divine', color: 'bg-orange-300' },
        { id: 'classic-hindu', name: 'Hindu', color: 'bg-yellow-400' },
        { id: 'royal', name: 'Royal', color: 'bg-purple-300' },
        { id: 'elegant', name: 'Elegant', color: 'bg-white border' },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Step 8</span>
                    <h2 className="text-3xl font-bold text-gray-800">Final Review</h2>
                </div>
                <div className="flex gap-3">
                    <button onClick={onEdit} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                        <Edit2 size={18} /> Edit Data
                    </button>
                    <button onClick={handleDownloadClick} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-md flex items-center gap-2">
                        <Download size={18} /> Download
                    </button>
                </div>
            </div>

            <div className="flex-grow flex flex-col md:flex-row gap-8 overflow-hidden">
                <div
                    ref={containerRef}
                    className="flex-grow overflow-hidden bg-gray-100 p-4 rounded-xl border border-gray-200 shadow-inner flex justify-center items-center relative min-h-[500px]"
                >
                    <div
                        style={{
                            transform: `scale(${scale})`,
                            transformOrigin: 'center top'
                        }}
                        className="transition-transform duration-200 ease-out mt-4 shadow-2xl"
                    >
                         <div ref={printComponentRef} style={{ background: 'white' }}>
                            <BioDataPreview hideControls={true} />
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-80 flex-shrink-0 flex flex-col gap-4 overflow-y-auto pr-2">
                    <h3 className="font-bold text-gray-700">Choose Template</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {themes.map(t => (
                            <button
                                key={t.id}
                                onClick={() => dispatch({ type: TYPES.SET_THEME, payload: t.id })}
                                className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                                    ${theme === t.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent hover:border-gray-200'}
                                    ${t.id === 'modern' ? 'bg-gray-800' : 'bg-white'}
                                `}
                            >
                                <div className={`w-12 h-12 rounded-full shadow-sm ${t.color} flex items-center justify-center mb-1`}>
                                    {theme === t.id && <Check size={20} className={t.id === 'modern' ? 'text-white' : 'text-gray-800'} />}
                                </div>
                                <span className={`text-xs font-medium ${t.id === 'modern' ? 'text-gray-300' : 'text-gray-600'}`}>{t.name}</span>
                            </button>
                        ))}
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
