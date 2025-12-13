import React, { useRef, useState } from 'react';
import { useBioData } from '../../context/BioDataContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Palette } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const ThemeSelector = () => {
    const { state, dispatch, TYPES } = useBioData();
    const themes = [
        { id: 'standard', name: 'Standard', color: '#2563eb' },
        { id: 'classic', name: 'Classic', color: '#d4af37' },
        { id: 'modern', name: 'Modern', color: '#111827' },
        { id: 'retro', name: 'Retro', color: '#b95c32' },
        { id: 'traditional', name: 'Traditional', color: '#a4161a' },
        { id: 'floral', name: 'Floral', color: '#db2777' },
    ];

    return (
        <div className="flex gap-2 mb-4 bg-white/50 p-2 rounded-full shadow-sm border w-fit mx-auto lg:mx-0">
            {themes.map(t => (
                <button
                    key={t.id}
                    onClick={() => dispatch({ type: TYPES.SET_THEME, payload: t.id })}
                    className={twMerge(
                        "w-8 h-8 rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2",
                        state.theme === t.id ? 'ring-2 ring-offset-2 ring-offset-white scale-110' : 'opacity-70 hover:opacity-100'
                    )}
                    style={{ backgroundColor: t.color, borderColor: t.color }}
                    title={t.name}
                />
            ))}
        </div>
    );
};

const Section = ({ title, children, isEmpty }) => {
    if (isEmpty) return null;
    return (
        <section className="mb-4 break-inside-avoid">
            <h3 className="text-[var(--primary)] font-bold mb-2 uppercase text-xs tracking-wider border-b border-dashed border-[var(--border-color)] pb-1">
                {title}
            </h3>
            <div className="grid grid-cols-[140px_1fr] gap-y-2 text-sm text-left">
                {children}
            </div>
        </section>
    );
};

const Row = ({ label, value }) => {
    if (!value) return null;
    return (
        <>
            <span className="font-bold text-[var(--text-muted)]">{label}:</span>
            <span className="font-medium whitespace-pre-wrap">{value}</span>
        </>
    );
};

const BioDataPreview = ({ hideControls = false }) => {
    const { state } = useBioData();
    const { formData, theme } = state;
    const printRef = useRef();
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = async () => {
        setIsGenerating(true);
        const element = printRef.current;

        try {
            const canvas = await html2canvas(element, {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                backgroundColor: '#ffffff' // Set a solid background to avoid transparency issues
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const canvasAspectRatio = canvasWidth / canvasHeight;

            let imgWidth = pdfWidth;
            let imgHeight = imgWidth / canvasAspectRatio;

            // If the image height is still greater than the PDF height,
            // scale it down to fit the height and adjust the width proportionally.
            if (imgHeight > pdfHeight) {
                imgHeight = pdfHeight;
                imgWidth = imgHeight * canvasAspectRatio;
            }

            // Center the image on the page
            const xOffset = (pdfWidth - imgWidth) / 2;
            const yOffset = (pdfHeight - imgHeight) / 2;

            pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
            pdf.save(`${formData.fullName || 'BioData'}_MarriageBioData.pdf`);
        } catch (err) {
            console.error("Error generating PDF:", err);
            alert("Failed to generate PDF. Please try again.");
        }
        setIsGenerating(false);
    };

    // Helper to check if section has any data
    const hasData = (fields) => fields.some(f => f && (Array.isArray(f) ? f.length > 0 : String(f).length > 0));

    // Helper to format Sibling Array
    const formatSiblings = (siblings) => {
        if (!Array.isArray(siblings) || siblings.length === 0) return 'None';
        return siblings.map(s => {
            let str = `${s.relation} (${s.maritalStatus})`;
            if (s.name) str += ` - ${s.name}`;
            return str;
        }).join(', ');
    };

    // Helper to get custom fields for a section
    const getCustomFields = (sectionName) => {
        const fields = formData.customFields || [];
        return fields.filter(f => f.section === sectionName);
    };

    const CustomRows = ({ section }) => {
        const fields = getCustomFields(section);
        if (fields.length === 0) return null;
        return (
            <>
                {fields.map((field, idx) => (
                    <Row key={`custom-${idx}`} label={field.label} value={field.value} />
                ))}
            </>
        );
    };

    return (
        <div className="w-full flex flex-col items-center">

            {!hideControls && (
                <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <ThemeSelector />
                    <button
                        onClick={handleDownload}
                        disabled={isGenerating}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all font-bold tracking-wide active:scale-95"
                    >
                        {isGenerating ? 'Generating...' : <><Download size={18} /> Download PDF</>}
                    </button>
                </div>
            )}

            {/* Download button for FinalReview context (if controls hidden but action needed) usually handled by parent, 
                 but we add a fallback or leave it to parent. Let's add a button if hidden *and* explicitly requested? 
                 No, let's assume parent (FinalReview) might use its own button calling logic? 
                 Actually, FinalReview uses this component. 
                 Let's add a "Download Only" button if hideControls is explicitly true.
             */}
            {/* Fallback buttons removed to prevent duplication in Final Review */}

            <div className="w-full bg-gray-500/5 p-4 rounded-xl overflow-x-auto flex justify-center border border-gray-200">
                {/* A4 Aspect Ratio Container */}
                <div
                    ref={printRef}
                    id="bio-data-content"
                    className={`
                        w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[15mm]
                        theme-${theme}
                    `}
                    style={{
                        backgroundColor: 'var(--bg-color)',
                        color: 'var(--text-main)',
                        fontFamily: 'var(--font-body)'
                    }}
                >
                    {/* Header */}
                    <div className="text-center mb-10 pb-6 border-b-2 border-[var(--primary)] relative">
                        {/* Image Rendering */}
                        {formData.profileImage && (
                            <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-[var(--primary)] overflow-hidden shadow-lg">
                                <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        )}

                        <h1 className="text-4xl font-bold uppercase tracking-widest text-[var(--primary)] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                            {formData.fullName || 'Marriage Bio-Data'}
                        </h1>
                        <p className="text-[var(--text-muted)] italic text-lg flex items-center justify-center gap-2">
                            <span className="text-2xl text-[var(--primary)]">🕉️</span> || Ganeshaya Namah || <span className="text-2xl text-[var(--primary)]">🕉️</span>
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="space-y-4">
                        {/* Personal Section */}
                        <Section title="Personal Details" isEmpty={!hasData([formData.fullName, formData.dateOfBirth, formData.height])}>
                            <Row label="Full Name" value={formData.fullName} />
                            <Row label="Date of Birth" value={formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString() : ''} />
                            <Row label="Time of Birth" value={formData.timeOfBirth} />
                            <Row label="Place of Birth" value={formData.placeOfBirth} />
                            <Row label="Height" value={formData.height} />
                            <Row label="Complexion" value={formData.complexion} />
                            <Row label="Marital Status" value={formData.maritalStatus} />
                            <Row label="Religion" value={formData.religion} />
                            <Row label="Caste" value={formData.caste} />
                            <CustomRows section="Personal Details" />
                        </Section>

                        {/* Horoscope Section */}
                        <Section title="Horoscope Details" isEmpty={!hasData([formData.rasi, formData.nakshatra, formData.gotra])}>
                            <Row label="Rasi" value={formData.rasi} />
                            <Row label="Nakshatra" value={formData.nakshatra} />
                            <Row label="Gotra" value={formData.gotra} />
                            <Row label="Manglik" value={formData.manglik} />
                            <CustomRows section="Horoscope Details" />
                        </Section>

                        {/* Education Section */}
                        <Section title="Education & Profession" isEmpty={!hasData([formData.education, formData.occupation, formData.company])}>
                            <Row label="Education" value={formData.education} />
                            <Row label="Occupation" value={formData.occupation} />
                            <Row label="Company" value={formData.company} />
                            <Row label="Annual Income" value={formData.income} />
                            <CustomRows section="Education & Job" />
                        </Section>

                        {/* Family Section */}
                        <Section title="Family Background" isEmpty={!hasData([formData.fatherName, formData.motherName, formData.siblings])}>
                            <Row label="Father's Name" value={formData.fatherName} />
                            <Row label="Father's Job" value={formData.fatherOccupation} />
                            <Row label="Mother's Name" value={formData.motherName} />
                            <Row label="Mother's Job" value={formData.motherOccupation} />
                            <Row label="Siblings" value={formatSiblings(formData.siblings)} />
                            <Row label="Native Place" value={formData.nativePlace} />
                            <CustomRows section="Family Details" />
                        </Section>

                        {/* Contact Section */}
                        <Section title="Contact Details" isEmpty={!hasData([formData.contactNumber, formData.email, formData.address])}>
                            <Row label="Contact No." value={formData.contactNumber} />
                            <Row label="Email ID" value={formData.email} />
                            <Row label="Address" value={formData.address} />
                            <CustomRows section="Contact Details" />
                        </Section>

                    </div>

                    <div className="mt-8 text-center text-xs text-[var(--text-muted)] italic border-t border-[var(--border-color)] pt-4">
                        Family & Friends Expect Your Presence.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BioDataPreview;
