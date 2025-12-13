import React from 'react';
import { useBioData } from '../../context/BioDataContext';
import { motion } from 'framer-motion';
import ModernInput from '../UI/ModernInput';

const Step4_Family = () => {
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
                <h2 className="text-2xl font-bold text-gray-800">Family Background</h2>
                <p className="text-gray-500 text-sm">Tell us about your family.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ModernInput
                    label="Father's Name"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                />
                <ModernInput
                    label="Father's Occupation"
                    name="fatherOccupation"
                    value={formData.fatherOccupation}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ModernInput
                    label="Mother's Name"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                />
                <ModernInput
                    label="Mother's Occupation"
                    name="motherOccupation"
                    value={formData.motherOccupation}
                    onChange={handleChange}
                />
            </div>

            <ModernInput
                label="Siblings"
                name="siblings"
                value={formData.siblings}
                onChange={handleChange}
                placeholder="e.g. 1 Brother, 1 Sister"
            />

            <ModernInput
                label="Native Place"
                name="nativePlace"
                value={formData.nativePlace}
                onChange={handleChange}
                placeholder="e.g. Pune, Maharashtra"
            />
        </motion.div>
    );
};

export default Step4_Family;
