import React from 'react';
import { useBioData } from '../../context/BioDataContext';
import ModernInput from '../UI/ModernInput';
import { motion } from 'framer-motion';

// Was Step5, now Step6
const Step6_Contact = () => {
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
                📞 Contact Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModernInput
                    label="Mobile Number"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="+91 99999 99999"
                    type="tel"
                    required
                />

                <ModernInput
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    type="email"
                />

                <div className="md:col-span-2">
                    <ModernInput
                        label="Residential Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Full Postal Address"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Step6_Contact;
