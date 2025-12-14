import React, { useState } from 'react';
import ModernInput from './ModernInput';

const LinkModal = ({ onAdd, onCancel, link }) => {
    const [value, setValue] = useState('');

    const handleAdd = () => {
        onAdd(value);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Add Link Label</h2>
                <p className="mb-4">You've entered a link: <span className="font-mono bg-gray-100 p-1 rounded">{link}</span></p>
                <p className="mb-4">Do you want to add a label for this link? (Optional)</p>
                <ModernInput
                    label="Link Label"
                    name="value"
                    value={value}
                    onChange={(name, val) => setValue(val)}
                    placeholder="e.g. My Portfolio"
                />
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onCancel}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Skip
                    </button>
                    <button
                        onClick={handleAdd}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Label
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LinkModal;
