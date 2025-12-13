import React, { useEffect } from 'react';

const PrintScaler = () => {
    useEffect(() => {
        const calculateScale = () => {
            const content = document.getElementById('bio-data-content');
            if (!content) return;

            // A4 Printable Height approx 1080px - 1100px (depending on margins 20-30mm)
            // Let's take a safe 285mm height = ~1077px
            const SAFE_HEIGHT_PX = 1080;
            const currentHeight = content.scrollHeight;

            if (currentHeight > SAFE_HEIGHT_PX) {
                const newScale = SAFE_HEIGHT_PX / currentHeight;
                // Use ZOOM for better print reflow support in Chrome/Edge
                document.body.style.zoom = newScale;
                console.log(`Auto-Zoomed Print to: ${newScale}`);
            } else {
                document.body.style.zoom = '1';
            }
        };

        // Run on mount and resize
        calculateScale();
        window.addEventListener('resize', calculateScale); // In case window size affects layout reflow

        // Also run before print
        window.addEventListener('beforeprint', calculateScale);

        return () => {
            window.removeEventListener('resize', calculateScale);
            window.removeEventListener('beforeprint', calculateScale);
        };
    }, []);

    return null; // Logic only
};

export default PrintScaler;
