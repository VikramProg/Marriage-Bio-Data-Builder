import React, { useState } from 'react';
import { useBioData } from '../../context/BioDataContext';
import ModernInput from '../UI/ModernInput';
import { motion } from 'framer-motion';
import { Plus, Trash2, User } from 'lucide-react';
import SiblingModal from './SiblingModal';

const Step5_Family = () => {
    const { state, dispatch, TYPES } = useBioData();
    const { formData } = state;
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fallback if siblings is still a string (backward compatibility or initial render issue)
    const siblingsList = Array.isArray(formData.siblings) ? formData.siblings : [];

    const handleChange = (field, value) => {
        dispatch({ type: TYPES.UPDATE_FIELD, field, value });
    };

    const handleAddSibling = (sibling) => {
        dispatch({ type: TYPES.ADD_SIBLING, payload: sibling });
    };

    const handleRemoveSibling = (index) => {
        dispatch({ type: TYPES.REMOVE_SIBLING, payload: index });
    };

    return (
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                👨‍👩‍👧‍👦 Family Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModernInput
                    label="Father's Name"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Rao"
                />
                <ModernInput
                    label="Father's Occupation"
                    name="fatherOccupation"
                    value={formData.fatherOccupation}
                    onChange={handleChange}
                    placeholder="e.g. Businessman"
                />

                <ModernInput
                    label="Mother's Name"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    placeholder="e.g. Sunita Rao"
                />
                <ModernInput
                    label="Mother's Occupation"
                    name="motherOccupation"
                    value={formData.motherOccupation}
                    onChange={handleChange}
                    placeholder="e.g. Homemaker"
                />

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">Siblings</label>

                    {/* List of Added Siblings */}
                    <div className="grid grid-cols-1 gap-3 mb-3">
                        {siblingsList.map((sib, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                                        <User size={16} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {sib.relation} ({sib.maritalStatus})
                                        </p>
                                        {(sib.name || sib.occupation) && (
                                            <p className="text-xs text-gray-500">
                                                {[sib.name, sib.occupation].filter(Boolean).join(' - ')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveSibling(index)}
                                    className="text-red-400 hover:text-red-600 p-2"
                                    title="Remove"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-3 border-2 border-dashed border-blue-200 text-blue-500 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all flex items-center justify-center gap-2 font-medium"
                    >
                        <Plus size={18} /> Add Sibling
                    </button>
                </div>

                <div className="md:col-span-2">
                    <ModernInput
                        label="Native Place"
                        name="nativePlace"
                        value={formData.nativePlace}
                        onChange={handleChange}
                        placeholder="e.g. Pune, Maharashtra"
                    />
                </div>
            </div>

            <SiblingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddSibling}
            />
        </motion.div>
    );
};

export default Step5_Family;
