import React from 'react';
import DatePicker from 'react-datepicker';
import { Calendar } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const DateSelector = ({ label, name, value, onChange, required, showYearDropdown = true }) => {
    // Convert string 'YYYY-MM-DD' to Date object for picker
    const selectedDate = value ? new Date(value) : null;

    const handleDateChange = (date) => {
        // format back to YYYY-MM-DD string for consistency with state
        if (date) {
            const formatted = date.toISOString().split('T')[0];
            onChange(name, formatted);
        } else {
            onChange(name, '');
        }
    };

    return (
        <div className="relative group">
            <label className="block text-sm font-medium mb-1 text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd MMM yyyy"
                    showYearDropdown={showYearDropdown}
                    showMonthDropdown
                    dropdownMode="select" // Easier selection
                    placeholderText="Select Date"
                    className={twMerge(
                        "w-full px-4 py-3 rounded-lg border bg-white/50 backdrop-blur-sm transition-all duration-200 outline-none",
                        "focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:shadow-sm",
                        "hover:border-gray-400 border-gray-300 w-full block"
                    )}
                    wrapperClassName="w-full"
                    required={required}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <Calendar size={18} />
                </div>
            </div>

            {/* Custom Styles for Datepicker to match theme Glassmorphism */}
            <style>{`
                .react-datepicker-wrapper { width: 100%; }
                .react-datepicker {
                    font-family: inherit;
                    border: 1px solid #e5e7eb;
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .react-datepicker__header {
                    background-color: #f3f4f6;
                    border-bottom: 1px solid #e5e7eb;
                }
                .react-datepicker__day--selected {
                    background-color: #2563eb !important;
                }
             `}</style>
        </div>
    );
};

export default DateSelector;
