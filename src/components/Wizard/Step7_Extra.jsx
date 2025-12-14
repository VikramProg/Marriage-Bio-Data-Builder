import React, { useState } from 'react';
import { useBioData } from '../../context/BioDataContext';
import ModernInput from '../UI/ModernInput';
import ModernSelect from '../UI/ModernSelect';
import { motion } from 'framer-motion';
import { Plus, Trash2, ListPlus, ExternalLink } from 'lucide-react';
import LinkModal from '../UI/LinkModal';

const Step7_Extra = () => {
    const { state, dispatch, TYPES } = useBioData();
    const { formData } = state;
    const [newField, setNewField] = useState({ section: 'Personal Details', label: '', value: '' });
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [tempField, setTempField] = useState(null);
    const [linkText, setLinkText] = useState('');

    const customFields = Array.isArray(formData.customFields) ? formData.customFields : [];

    const isUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleAddField = (e) => {
        e.preventDefault();
        if (newField.label) {
            if (isUrl(newField.value)) {
                setTempField(newField);
                setShowLinkModal(true);
            } else {
                dispatch({ type: TYPES.ADD_CUSTOM_FIELD, payload: newField });
                setNewField({ section: 'Personal Details', label: '', value: '' });
            }
        }
    };

    const handleAddLink = (linkValue) => {
        dispatch({ type: TYPES.ADD_CUSTOM_FIELD, payload: { ...tempField, linkText: linkValue } });
        setNewField({ section: 'Personal Details', label: '', value: '' });
        setShowLinkModal(false);
        setTempField(null);
        setLinkText('');
    };

    const handleCancelLink = () => {
        dispatch({ type: TYPES.ADD_CUSTOM_FIELD, payload: { ...tempField, linkText: tempField.value } });
        setNewField({ section: 'Personal Details', label: '', value: '' });
        setShowLinkModal(false);
        setTempField(null);
    }

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
                            label="Field Name"
                            name="label"
                            value={newField.label}
                            onChange={(name, val) => setNewField(p => ({ ...p, [name]: val }))}
                            placeholder="e.g. Website"
                        />
                    </div>
                    <div className="md:col-span-4 flex flex-col sm:flex-row gap-2">
                        <div className="flex-grow">
                            <ModernInput
                                label="Field Value"
                                name="value"
                                value={newField.value}
                                onChange={(name, val) => setNewField(p => ({ ...p, [name]: val }))}
                                placeholder="e.g. https://example.com"
                            />
                        </div>
                        <button
                            onClick={handleAddField}
                            disabled={!newField.label}
                            className="h-[46px] w-full sm:w-[46px] flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
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
                        className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start gap-3 sm:gap-4 w-full min-w-0">
                            <div className="text-[11px] font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded uppercase tracking-wider mt-1 shrink-0">
                                {field.section.split(' ')[0]}
                            </div>
                            <div className="min-w-0 space-y-1">
                                <p className="font-semibold text-gray-800 break-words">{field.label}</p>
                                {isUrl(field.value) ? (
                                    <a
                                        href={field.value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-blue-600 font-medium px-3 py-1.5 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors break-words"
                                        title={field.value}
                                    >
                                        <ExternalLink size={16} />
                                        <span className="truncate max-w-[220px] sm:max-w-[260px]">{field.linkText || field.value}</span>
                                    </a>
                                ) : (
                                    <p className="text-gray-600 break-words">{field.value}</p>
                                )}
                            </div>
                        </div>
                        <div className="self-end sm:self-start">
                            <button
                                onClick={() => handleRemoveField(index)}
                                className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                                title="Remove"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {showLinkModal && (
                <LinkModal
                    link={tempField.value}
                    onAdd={handleAddLink}
                    onCancel={handleCancelLink}
                />
            )}

        </motion.div>
    );
};

export default Step7_Extra;
