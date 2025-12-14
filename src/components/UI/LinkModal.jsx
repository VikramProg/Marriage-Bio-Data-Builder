import React, { useState } from 'react';
import ModernInput from './ModernInput';

const LinkModal = ({ onAdd, onCancel, link }) => {
    const [value, setValue] = useState('');

    const handleAdd = () => {
        onAdd(value);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center px-4">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-xl w-full">
                <h2 className="text-2xl font-bold mb-4">Add Link Label</h2>
                <p className="mb-3 break-words">You've entered a link:</p>
                <p className="mb-4">
                    <span className="font-mono bg-gray-100 p-2 rounded inline-block break-all w-full">{link}</span>
                </p>
                <p className="mb-4">Do you want to add a label for this link? (Optional)</p>
                <ModernInput
                    label="Link Label"
                    name="value"
                    value={value}
                    onChange={(name, val) => setValue(val)}
                    placeholder="e.g. My Portfolio"
                />
                <div className="flex justify-end mt-6 gap-2">
                    <button
                        onClick={onCancel}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
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
