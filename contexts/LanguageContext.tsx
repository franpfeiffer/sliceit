'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { translations } from '@/utils/translations'
import { Translations } from '@/types/budget'

interface LanguageContextType {
    language: 'en' | 'es'
    setLanguage: (lang: 'en' | 'es') => void
    t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<'en' | 'es'>('en')

    const value = {
        language,
        setLanguage,
        t: translations[language]
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
