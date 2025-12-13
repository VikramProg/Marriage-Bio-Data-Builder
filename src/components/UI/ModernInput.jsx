import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const ModernInput = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder = "",
    required = false,
    className,
    isHeight, // Destructure to avoid passing to DOM
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e) => {
        let newVal = e.target.value;

        // Mobile Number Formatting (+91 XXXXX XXXXX)
        if (name === 'contactNumber' || name === 'mobile') {
            // Allow only digits, plus, and space
            newVal = newVal.replace(/[^\d+ ]/g, '');

            // Auto-format Indian Mobile Number
            // Case: User entered 10 digits clean -> Add +91
            if (/^[6-9]\d{9}$/.test(newVal)) {
                newVal = `+91 ${newVal.substring(0, 5)} ${newVal.substring(5)}`;
            }
        }

        // Smart Height Formatting
        if (name === 'height' || props.isHeight) {
            // Allow digits, space, single quote, double quote, dots
            newVal = newVal.replace(/[^0-9\s.'"ftin]/gi, '');

            // Logic: "5 11" -> "5' 11"" or "5ft 11in"
            // Pattern: Single digit (4-7) followed by space followed by 1-2 digits
            const heightPattern = /^([4-7])\s+([0-9]{1,2})$/;
            const match = newVal.match(heightPattern);
            if (match) {
                newVal = `${match[1]}ft ${match[2]}in`;
            }
            // Logic: "5.10" -> "5ft 10in"
            const dotPattern = /^([4-7])\.([0-9]{1,2})$/;
            const dotMatch = newVal.match(dotPattern);
            if (dotMatch) {
                newVal = `${dotMatch[1]}ft ${dotMatch[2]}in`;
            }
        }

        onChange(name, newVal);
    };

    return (
        <div className={twMerge("relative group", className)}>
            <label
                className={clsx(
                    "block text-sm font-medium mb-1 transition-colors duration-200",
                    isFocused ? "text-blue-600" : "text-gray-700"
                )}
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div className="relative">
                <motion.input
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className={clsx(
                        "w-full px-4 py-3 rounded-lg border bg-white/50 backdrop-blur-sm transition-all duration-200 outline-none",
                        "focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:shadow-sm",
                        "hover:border-gray-400",
                        isFocused ? "border-blue-500" : "border-gray-300"
                    )}
                    {...props}
                />

                {/* Gamification: Success indicator if filled */}
                {value && value.length > 2 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500"
                    />
                )}
            </div>
        </div>
    );
};

export default ModernInput;
