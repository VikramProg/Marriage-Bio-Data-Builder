import React from 'react';
import { useBioData } from '../../context/BioDataContext';
import ModernInput from '../UI/ModernInput';
import ModernSelect from '../UI/ModernSelect';
import { motion } from 'framer-motion';

const Step2_Details = () => {
    const { state, dispatch, TYPES } = useBioData();
    const { formData } = state;

    const handleChange = (field, value) => {
        dispatch({ type: TYPES.UPDATE_FIELD, field, value });
    };

    return (
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                👤 Personal Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Smart Height Input */}
                <ModernInput
                    label="Height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="e.g. 5 10 or 5'5&quot;"
                    isHeight={true}
                />

                <ModernInput
                    label="Complexion"
                    name="complexion"
                    value={formData.complexion}
                    onChange={handleChange}
                    placeholder="e.g. Fair, Wheatish"
                />

                <ModernSelect
                    label="Marital Status"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    options={[
                        { value: 'Never Married', label: 'Never Married' },
                        { value: 'Divorced', label: 'Divorced' },
                        { value: 'Widowed', label: 'Widowed' },
                        { value: 'Awaiting Divorce', label: 'Awaiting Divorce' },
                    ]}
                />

                <ModernSelect
                    label="Religion"
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    options={[
                        { value: 'Hindu', label: 'Hindu' },
                        { value: 'Muslim', label: 'Muslim' },
                        { value: 'Christian', label: 'Christian' },
                        { value: 'Sikh', label: 'Sikh' },
                        { value: 'Jain', label: 'Jain' },
                        { value: 'Buddhist', label: 'Buddhist' },
                        { value: 'Parsi', label: 'Parsi' },
                        { value: 'Jewish', label: 'Jewish' },
                        { value: 'Other', label: 'Other' },
                    ]}
                />

                <ModernInput
                    label="Caste / Sub-Caste"
                    name="caste" // Note: Context doesn't have explicit caste field, mapped to religion or separate? 
                    // Plan said details. Context has 'religion' field which usually holds "Hindu / Brahmin".
                    // Let's check context. Context has only 'religion'. 
                    // Let's add 'caste' field to context or assume religion field is composite?
                    // User request "Personal Details divid it in two steps".
                    // I'll add 'caste' to context to be safe or just map to existing if needed.
                    // Actually, let's keep it simple. Let's assume user enters "Hindu - Brahmin" in religion or add a field.
                    // I will add a 'caste' field to Update Context or just reuse 'gotra' in step 3? 
                    // Wait, Step 2 Details needs Caste. Let's add 'caste' to context quickly.
                    value={formData.caste || ''}
                    onChange={handleChange}
                    placeholder="e.g. Brahmin"
                />
            </div>
        </motion.div>
    );
};

export default Step2_Details;
