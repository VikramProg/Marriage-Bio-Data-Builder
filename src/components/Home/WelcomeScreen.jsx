import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';

const WelcomeScreen = ({ onStart }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8 relative"
            >
                <div className="w-28 h-28 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden">
                    <img src="/logo.svg" alt="SaathJanam logo" className="absolute inset-0 w-full h-full object-contain p-4" />
                    <Heart className="text-red-500 w-12 h-12 fill-current animate-pulse opacity-40" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                    SaathJanam Bio Data Builder
                </h1>
                <p className="text-lg md:text-xl text-blue-600 font-semibold mt-2">
                    Create your perfect marriage bio-data in minutes
                </p>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg text-gray-600 max-w-xl mb-10"
            >
                Design a beautiful, professional bio-data in minutes.
                Choose from stunning templates, customize details, and export high-quality images for free.
                <span className="block mt-2 font-medium text-gray-800">No Signup. No Ads. 100% Privacy.</span>
            </motion.p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={onStart}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-lg hover:shadow-xl"
            >
                Create My Bio-Data
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-500"
            >
                <div className="flex flex-col items-center">
                    <span className="font-bold text-gray-800 text-lg">Free</span>
                    <span>Forever</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-bold text-gray-800 text-lg">Secure</span>
                    <span>Client-side only</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-bold text-gray-800 text-lg">Image</span>
                    <span>HD Export</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-bold text-gray-800 text-lg">10+</span>
                    <span>Templates (adding more)</span>
                </div>
            </motion.div>
        </div>
    );
};

export default WelcomeScreen;
