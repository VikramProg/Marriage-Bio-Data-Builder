import React from 'react';
import { useBioData } from '../../context/BioDataContext';
import ModernInput from '../UI/ModernInput';
import { motion } from 'framer-motion';

// Was Step3, now Step4
const Step4_Education = () => {
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
                🎓 Education & Job
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <ModernInput
                        label="Highest Qualification"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        placeholder="e.g. B.Tech Computer Science"
                    />
                </div>

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

                <ModernInput
                    label="Annual Income"
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                    placeholder="e.g. 12 LPA"
                />
            </div>
        </motion.div>
    );
};

export default Step4_Education;
