import React from 'react';
import { useBioData } from '../../context/BioDataContext';
import { motion } from 'framer-motion';
import ModernInput from '../UI/ModernInput';

const Step5_Contact = () => {
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
                <h2 className="text-2xl font-bold text-gray-800">Contact Details</h2>
                <p className="text-gray-500 text-sm">How can interested families reach you?</p>
            </div>

            <ModernInput
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
            />

            <ModernInput
                label="Email (Optional)"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
            />

            <div className="relative group">
                <label className="block text-sm font-medium mb-1 text-gray-700">Address</label>
                <motion.textarea
                    name="address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    rows={3}
                    whileFocus={{ scale: 1.01 }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/50 backdrop-blur-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:border-gray-400"
                    placeholder="Full residential address"
                />
            </div>
        </motion.div>
    );
};

export default Step5_Contact;
