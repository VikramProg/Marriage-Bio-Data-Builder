import React, { useRef } from 'react';
import { Camera, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageUpload = ({ image, onImageChange }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (e) => {
        e.stopPropagation();
        onImageChange(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">
                Profile Photo <span className="text-gray-400 font-normal text-xs">(Optional)</span>
            </label>

            <div
                onClick={() => fileInputRef.current?.click()}
                className={`
                    relative w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer transition-all overflow-hidden group
                    ${image ? 'border-blue-500' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'}
                `}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <AnimatePresence>
                    {image ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative w-full h-full"
                        >
                            <img src={image} alt="Profile" className="w-full h-full object-cover" />
                            {/* Overlay remove button */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    onClick={removeImage}
                                    className="p-2 bg-white rounded-full text-red-500 shadow-md hover:scale-110 transition-transform"
                                    title="Remove Photo"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="text-center text-gray-400 group-hover:text-blue-500 transition-colors">
                            <Camera size={24} className="mx-auto mb-1" />
                            <span className="text-xs">Upload</span>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ImageUpload;
