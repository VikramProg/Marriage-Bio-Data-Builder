import React, { useEffect, useRef, useState } from 'react';

const AutoFitPrint = ({ children }) => {
    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const fitToPage = () => {
            if (!containerRef.current) return;

            // Standard A4 height in pixels at 96 DPI is approx 1123px (297mm)
            // But browsers vary. Let's aim for a safe printable height, e.g., 280mm
            const A4_HEIGHT_MM = 297;
            const SAFE_HEIGHT_MM = 290; // Leave space for headers/footers if any
            const MM_TO_PX = 3.78; // Approx px per mm
            const targetHeightPx = SAFE_HEIGHT_MM * MM_TO_PX;

            const contentHeight = containerRef.current.scrollHeight;
            const contentWidth = containerRef.current.scrollWidth;

            // If content is taller than A4, scale it down
            if (contentHeight > targetHeightPx) {
                const newScale = targetHeightPx / contentHeight;
                // Don't scale down too much? Limit to 0.5 maybe
                setScale(Math.max(newScale, 0.5));
            } else {
                setScale(1);
            }
        };

        // Delay slightly to allow rendering
        setTimeout(fitToPage, 500);
        window.addEventListener('resize', fitToPage);
        return () => window.removeEventListener('resize', fitToPage);
    }, []);

    return (
        <div
            className="w-full h-full flex justify-center items-start overflow-hidden"
            style={{
                // Ensure the parent container doesn't scroll, we want to scale inside
                height: '100vh'
            }}
        >
            <div
                ref={containerRef}
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.2s',
                    marginBottom: `${(1 - scale) * 100}%` // compensate for white space
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default AutoFitPrint;
