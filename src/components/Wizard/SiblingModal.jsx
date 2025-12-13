import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ModernInput from '../UI/ModernInput';
import ModernSelect from '../UI/ModernSelect';

const SiblingModal = ({ isOpen, onClose, onAdd }) => {
    const [sibling, setSibling] = useState({
        relation: 'Brother',
        maritalStatus: 'Unmarried',
        name: '',
        occupation: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(sibling);
        setSibling({ relation: 'Brother', maritalStatus: 'Unmarried', name: '', occupation: '' });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>

                    <h3 className="text-xl font-bold mb-4 text-gray-800">Add Sibling</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <ModernSelect
                            label="Relation"
                            name="relation"
                            value={sibling.relation}
                            onChange={(name, val) => setSibling(p => ({ ...p, [name]: val }))}
                            options={['Brother', 'Sister']}
                        />

                        <ModernSelect
                            label="Marital Status"
                            name="maritalStatus"
                            value={sibling.maritalStatus}
                            onChange={(name, val) => setSibling(p => ({ ...p, [name]: val }))}
                            options={['Unmarried', 'Married']}
                        />

                        <ModernInput
                            label="Name (Optional)"
                            name="name"
                            value={sibling.name}
                            onChange={(name, val) => setSibling(p => ({ ...p, [name]: val }))}
                            placeholder="e.g. Rahul Sharma"
                        />

                        <ModernInput
                            label="Occupation (Optional)"
                            name="occupation"
                            value={sibling.occupation}
                            onChange={(name, val) => setSibling(p => ({ ...p, [name]: val }))}
                            placeholder="e.g. Software Engineer"
                        />

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Plus size={18} /> Add Sibling
                        </button>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default SiblingModal;
