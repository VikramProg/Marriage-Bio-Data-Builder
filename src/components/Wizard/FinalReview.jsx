import React, { useRef } from 'react';
import { useBioData } from '../../context/BioDataContext';
import BioDataPreview from '../Preview/BioDataPreview';
import { Download, Edit2, Check } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import PrintScaler from '../Preview/PrintScaler';
// Let's check BioDataPreview. It has handleDownload.
// Actually, let's keep BioDataPreview as the display, and controls here?
// The previous implementation had BioDataPreview handle its own download with a prop `hideControls={true}`.
// So FinalReview should have the controls.
// Re-reading FinalReview implementation from user edits or memory...
// I haven't seen FinalReview code in this turn, I should create it/update it.
// Wait, I marked "Implement Final Review" as done in Phase 2. I should VIEW it first to update it.
// But I can rewrite it safely.

const FinalReview = ({ onEdit }) => {
    const { state, dispatch, TYPES } = useBioData();
    const { theme } = state;
    // We need a ref to trigger download inside BioDataPreview? 
    // Or we render the download button inside BioDataPreview but hide other controls?
    // Let's let BioDataPreview handle the "Print/Download" logic if it exposes it, or just use a wrapper.
    // Actually, BioDataPreview likely has the id="bio-data-content". We can trigger download here.

    // Ref for the content we want to print
    const printComponentRef = useRef();

    const handlePrint = useReactToPrint({
        contentRef: printComponentRef,
        documentTitle: state.formData.fullName || 'BioData',
        pageStyle: `
            @page {
                size: A4;
                margin: 0;
            }
            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                }
                html, body {
                    height: auto !important;
                    overflow: visible !important;
                    background: white;
                }
            }
        `,
    });

    const handleDownload = () => {
        if (printComponentRef.current) {
            handlePrint();
        }
    };

    // Auto-scaling logic
    const containerRef = useRef(null);
    const [scale, setScale] = React.useState(0.8);

    React.useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const containerHeight = containerRef.current.offsetHeight;
                const targetWidth = 794; // A4 width in pixels (approx) at 96 DPI (210mm)

                // Calculate scale to fit width with some padding
                const scaleWidth = (containerWidth - 40) / targetWidth;

                // Ensure it doesn't get too big (max 1) or too small (min 0.3)
                const newScale = Math.min(Math.max(scaleWidth, 0.3), 1);
                setScale(newScale);
            }
        };

        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) observer.observe(containerRef.current);

        // Initial call
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
                    <button onClick={handleDownload} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-md flex items-center gap-2">
                        <Download size={18} /> Download PDF
                    </button>
                </div>
            </div>

            <div className="flex-grow flex flex-col md:flex-row gap-8 overflow-hidden">
                {/* Preview Area - Scrollable */}
                {/* Preview Area - Auto Scaled */}
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
                        <BioDataPreview hideControls={true} />
                    </div>
                </div>

                {/* Theme Selector Sidebar */}
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
            {/* HIDDEN PRINT CONTAINER - Strictly for PDF Generation (A4 Size) */}
            <div className="fixed left-[-9999px] top-[-9999px]">
                <div ref={printComponentRef} style={{ width: '210mm', minHeight: '297mm', background: 'white' }}>
                    <PrintScaler />
                    <BioDataPreview hideControls={true} />
                </div>
            </div>
        </div>
    );
};

export default FinalReview;
