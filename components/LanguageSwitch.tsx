'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageSwitch() {
    const { language, setLanguage } = useLanguage()

    return (
        <div className="fixed top-4 right-4 z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-800 rounded-full p-1 border border-gray-700 shadow-lg"
            >
                <div className="flex items-center space-x-1 relative">
                    <motion.div
                        className="absolute inset-y-1 bg-blue-600 rounded-full"
                        animate={{
                            x: language === 'en' ? 4 : 52,
                            width: language === 'en' ? 40 : 40,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />

                    <button
                        onClick={() => setLanguage('en')}
                        className={`relative z-10 px-3 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${language === 'en' ? 'text-white' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        🇺🇸
                    </button>

                    <button
                        onClick={() => setLanguage('es')}
                        className={`relative z-10 px-3 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${language === 'es' ? 'text-white' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        🇦🇷
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
