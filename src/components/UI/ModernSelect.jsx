import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

const ModernSelect = ({ label, name, value, onChange, options, className, placeholder }) => {
    return (
        <div className={twMerge("relative group", className)}>
            <label className="block text-sm font-medium mb-1 text-gray-700">
                {label}
            </label>
            <motion.select
                name={name}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                whileFocus={{ scale: 1.01 }}
                className={clsx(
                    "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/50 backdrop-blur-sm transition-all duration-200 outline-none appearance-none",
                    "focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
                    "hover:border-gray-400",
                    "cursor-pointer"
                )}
            >
                {placeholder && <option value="" disabled>{placeholder}</option>}
                {options.map((opt, index) => {
                    const isObject = typeof opt === 'object' && opt !== null;
                    const value = isObject ? opt.value : opt;
                    const label = isObject ? opt.label : opt;
                    return (
                        <option key={isObject ? value : index} value={value}>{label}</option>
                    );
                })}
            </motion.select>
        </div>
    );
};

export default ModernSelect;
