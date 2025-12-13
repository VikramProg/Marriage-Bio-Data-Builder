import React from 'react';
import { useBioData } from '../../context/BioDataContext';
import { motion } from 'framer-motion';
import ModernInput from '../UI/ModernInput';
import ModernSelect from '../UI/ModernSelect';

const Step2_Horoscope = () => {
    const { state, dispatch, TYPES } = useBioData();
    const { formData } = state;

    const handleChange = (field, value) => {
        dispatch({ type: TYPES.UPDATE_FIELD, field, value });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Horoscope Details</h2>
                <p className="text-gray-500 text-sm">Optional details about your astrological sign.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ModernInput
                    label="Rasi (Zodiac Sign)"
                    name="rasi"
                    value={formData.rasi}
                    onChange={handleChange}
                    placeholder="e.g. Mesha"
                />
                <ModernInput
                    label="Nakshatra"
                    name="nakshatra"
                    value={formData.nakshatra}
                    onChange={handleChange}
                    placeholder="e.g. Ashwini"
                />
            </div>

            <ModernInput
                label="Gotra"
                name="gotra"
                value={formData.gotra}
                onChange={handleChange}
                placeholder="e.g. Bharadwaj"
            />

            <ModernSelect
                label="Manglik (Dosham)?"
                name="manglik"
                value={formData.manglik}
                onChange={handleChange}
                options={['No', 'Yes', 'Don\'t Know']}
            />
        </motion.div>
    );
};

export default Step2_Horoscope;
