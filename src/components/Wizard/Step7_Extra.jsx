import React, { useState } from 'react';
import { useBioData } from '../../context/BioDataContext';
import ModernInput from '../UI/ModernInput';
import ModernSelect from '../UI/ModernSelect';
import { motion } from 'framer-motion';
import { Plus, Trash2, ListPlus } from 'lucide-react';

const Step7_Extra = () => {
    const { state, dispatch, TYPES } = useBioData();
    const { formData } = state;
    const [newField, setNewField] = useState({ section: 'Personal Details', label: '', value: '' });

    const customFields = Array.isArray(formData.customFields) ? formData.customFields : [];

    const handleAddField = (e) => {
        e.preventDefault();
        if (newField.label && newField.value) {
            dispatch({ type: TYPES.ADD_CUSTOM_FIELD, payload: newField });
            setNewField(prev => ({ ...prev, label: '', value: '' }));
        }
    };

    const handleRemoveField = (index) => {
        dispatch({ type: TYPES.REMOVE_CUSTOM_FIELD, payload: index });
    };

    return (
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                ✨ Extra Details
            </h2>
            <p className="text-gray-500 mb-6 text-sm">Add any other information you missed in previous steps.</p>

            {/* Add New Field Form */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-4">
                        <ModernSelect
                            label="Section"
                            name="section"
                            value={newField.section}
                            onChange={(name, val) => setNewField(p => ({ ...p, [name]: val }))}
                            options={['Personal Details', 'Education & Job', 'Family Details', 'Contact Details']}
                        />
                    </div>
                    <div className="md:col-span-4">
                        <ModernInput
                            label="Label"
                            name="label"
                            value={newField.label}
                            onChange={(name, val) => setNewField(p => ({ ...p, [name]: val }))}
                            placeholder="e.g. Diet"
                        />
                    </div>
                    <div className="md:col-span-4 flex gap-2">
                        <div className="flex-grow">
                            <ModernInput
                                label="Value"
                                name="value"
                                value={newField.value}
                                onChange={(name, val) => setNewField(p => ({ ...p, [name]: val }))}
                                placeholder="e.g. Vegetarian"
                            />
                        </div>
                        <button
                            onClick={handleAddField}
                            disabled={!newField.label || !newField.value}
                            className="mb-[2px] h-[46px] w-[46px] flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                            title="Add Field"
                        >
                            <Plus size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* List of Custom Fields */}
            <div className="space-y-2">
                {customFields.length === 0 && (
                    <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                        <ListPlus size={32} className="mx-auto mb-2 opacity-50" />
                        <p>No custom fields added yet.</p>
                    </div>
                )}

                {customFields.map((field, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start gap-4">
                            <div className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded uppercase tracking-wider mt-1">
                                {field.section.split(' ')[0]}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">{field.label}</p>
                                <p className="text-gray-600">{field.value}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleRemoveField(index)}
                            className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    </motion.div>
                ))}
            </div>

        </motion.div>
    );
};

export default Step7_Extra;
