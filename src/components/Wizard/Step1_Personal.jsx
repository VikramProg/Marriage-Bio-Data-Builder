import React from 'react';
import { useBioData } from '../../context/BioDataContext';
import { motion } from 'framer-motion';
import ModernInput from '../UI/ModernInput';
import ModernSelect from '../UI/ModernSelect';
import DateSelector from '../UI/DateSelector';

const Step1_Personal = () => {
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
                <h2 className="text-2xl font-bold text-gray-800">Personal Details</h2>
                <p className="text-gray-500 text-sm">Let's start with the basics about yourself.</p>
            </div>

            <ModernInput
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DateSelector
                    label="Date of Birth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                />
                <ModernInput
                    label="Time of Birth"
                    name="timeOfBirth"
                    type="time"
                    value={formData.timeOfBirth}
                    onChange={handleChange}
                />
            </div>

            <ModernInput
                label="Place of Birth"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleChange}
                placeholder="e.g. Mumbai, Maharashtra"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ModernInput
                    label="Height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="e.g. 5 ft 10 in"
                />
                <ModernSelect
                    label="Marital Status"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    options={['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce']}
                />
            </div>

            <ModernInput
                label="Religion/Caste"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                placeholder="e.g. Hindu - Brahmin"
            />

            <ModernInput
                label="Complexion"
                name="complexion"
                value={formData.complexion}
                onChange={handleChange}
                placeholder="e.g. Fair, Wheatish"
            />
        </motion.div>
    );
};

export default Step1_Personal;
