import React from 'react';
import { useBioData } from '../../context/BioDataContext';
import ModernInput from '../UI/ModernInput';
import ModernSelect from '../UI/ModernSelect';
import { motion } from 'framer-motion';

// Was Step2, now Step3
const Step3_Horoscope = () => {
    const { state, dispatch, TYPES } = useBioData();
    const { formData } = state;

    const handleChange = (field, value) => {
        dispatch({ type: TYPES.UPDATE_FIELD, field, value });
    };

    return (
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                ✨ Horoscope Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModernInput
                    label="Rasi (Moon Sign)"
                    name="rasi"
                    value={formData.rasi}
                    onChange={handleChange}
                    placeholder="e.g. Mesha (Aries)"
                />

                <ModernInput
                    label="Nakshatra"
                    name="nakshatra"
                    value={formData.nakshatra}
                    onChange={handleChange}
                    placeholder="e.g. Bharani"
                />

                <ModernInput
                    label="Gotra"
                    name="gotra"
                    value={formData.gotra}
                    onChange={handleChange}
                    placeholder="e.g. Bharadwaj"
                />

                <ModernSelect
                    label="Manglik"
                    name="manglik"
                    value={formData.manglik}
                    onChange={handleChange}
                    options={[
                        { value: 'No', label: 'No' },
                        { value: 'Yes', label: 'Yes' },
                        { value: 'Anshik', label: 'Anshik (Partial)' },
                        { value: 'Don\'t Know', label: 'Don\'t Know' },
                    ]}
                />
            </div>
        </motion.div>
    );
};

export default Step3_Horoscope;
