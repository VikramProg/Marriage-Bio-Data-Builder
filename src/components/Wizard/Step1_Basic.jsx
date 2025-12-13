import React from 'react';
import { useBioData } from '../../context/BioDataContext';
import ModernInput from '../UI/ModernInput';
import DateSelector from '../UI/DateSelector';
import ImageUpload from '../UI/ImageUpload';
import { motion } from 'framer-motion';

const Step1_Basic = () => {
    const { state, dispatch, TYPES } = useBioData();
    const { formData } = state;

    const handleChange = (field, value) => {
        dispatch({ type: TYPES.UPDATE_FIELD, field, value });
    };

    const handleImageChange = (base64Image) => {
        dispatch({ type: TYPES.SET_IMAGE, payload: base64Image });
    };

    return (
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                📸 Basic Details
            </h2>

            <ImageUpload
                image={formData.profileImage}
                onImageChange={handleImageChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModernInput
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Aditi Rao"
                    required
                />

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
                    value={formData.timeOfBirth}
                    onChange={handleChange}
                    placeholder="e.g. 10:30 AM"
                />

                <ModernInput
                    label="Place of Birth"
                    name="placeOfBirth"
                    value={formData.placeOfBirth}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai, India"
                />
            </div>
        </motion.div>
    );
};

export default Step1_Basic;
