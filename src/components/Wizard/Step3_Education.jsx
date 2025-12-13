import React from 'react';
import { useBioData } from '../../context/BioDataContext';
import { motion } from 'framer-motion';
import ModernInput from '../UI/ModernInput';

const Step3_Education = () => {
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
                <h2 className="text-2xl font-bold text-gray-800">Education & Career</h2>
                <p className="text-gray-500 text-sm">Your professional background.</p>
            </div>

            <ModernInput
                label="Highest Qualification"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="e.g. B.Tech in CSE"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ModernInput
                    label="Occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer"
                />
                <ModernInput
                    label="Company Name"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Google"
                />
            </div>

            <ModernInput
                label="Annual Income"
                name="income"
                value={formData.income}
                onChange={handleChange}
                placeholder="e.g. 18 LPA"
            />
        </motion.div>
    );
};

export default Step3_Education;
