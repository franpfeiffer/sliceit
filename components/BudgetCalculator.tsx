'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator } from 'lucide-react'
import { BudgetBreakdown } from '@/types/budget'
import { calculateBudget, formatNumberInput, addCommasToNumber } from '@/utils/calculations'
import { useLanguage } from '@/contexts/LanguageContext'
import BudgetResults from './BudgetResults'
import BudgetInfo from './BudgetInfo'

export default function BudgetCalculator() {
    const [income, setIncome] = useState('')
    const [budget, setBudget] = useState<BudgetBreakdown | null>(null)
    const [error, setError] = useState('')
    const { t } = useLanguage()

    const handleInputChange = (value: string) => {
        const formatted = formatNumberInput(value)
        setIncome(formatted)
        setError('')
    }

    const handleInputBlur = () => {
        const numValue = parseFloat(income.replace(/,/g, ''))
        if (!isNaN(numValue) && numValue > 0) {
            setIncome(addCommasToNumber(numValue))
        }
    }

    const handleInputFocus = () => {
        const cleanValue = income.replace(/,/g, '')
        setIncome(cleanValue)
    }

    const handleCalculate = () => {
        const numIncome = parseFloat(income.replace(/,/g, ''))

        if (!numIncome || numIncome <= 0) {
            setError(t.placeholders.error.invalidAmount)
            setBudget(null)
            return
        }

        const budgetBreakdown = calculateBudget(numIncome)
        setBudget(budgetBreakdown)
        setError('')
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCalculate()
        }
    }

    return (
        <div className="space-y-8">
            <header className="text-center mb-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold text-white mb-4"
                >
                    {t.header.title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-white mb-4"
                >
                    {t.header.subtitle}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block p-4 bg-gray-800 rounded-xl shadow-lg border border-gray-700"
                >
                    <p className="text-sm text-white font-medium">
                        <span className="text-red-400">50% {t.categories.needs.title.replace('🏠 ', '')}</span> •
                        <span className="text-green-400">25% {t.categories.savings.title.replace('💰 ', '')}</span> •
                        <span className="text-yellow-400">15% {t.categories.emergency.title.replace('🚨 ', '')}</span> •
                        <span className="text-blue-400">10% {t.categories.wants.title.replace('🎉 ', '')}</span>
                    </p>
                </motion.div>
            </header>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700"
            >
                <div className="text-center mb-6">
                    <label htmlFor="income" className="block text-lg font-semibold text-white mb-3">
                        {t.form.label}
                    </label>
                    <div className="relative max-w-md mx-auto">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                            $
                        </span>
                        <input
                            id="income"
                            type="text"
                            value={income}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onKeyPress={handleKeyPress}
                            pattern="[0-9]*\.?[0-9]*"
                            inputMode="decimal"
                            className="w-full pl-10 pr-4 py-4 text-2xl text-center bg-gray-700 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-white placeholder-gray-400"
                            placeholder={t.form.placeholder}
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                        {t.form.helperText}
                    </p>
                </div>

                <motion.button
                    onClick={handleCalculate}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-green-700 transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                    <Calculator size={20} />
                    {t.form.button}
                </motion.button>
            </motion.div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-900/20 border border-red-700 rounded-xl p-6 text-center"
                >
                    <div className="text-4xl mb-4">❌</div>
                    <h3 className="text-lg font-semibold text-red-300 mb-2">{t.placeholders.error.title}</h3>
                    <p className="text-red-400">{error}</p>
                </motion.div>
            )}

            {budget ? (
                <BudgetResults budget={budget} />
            ) : (
                <div className="text-center text-gray-400 py-12">
                    <p className="text-xl text-white">{t.placeholders.emptyState.title}</p>
                    <p className="text-sm text-gray-400 mt-2">{t.placeholders.emptyState.subtitle}</p>
                </div>
            )}

            <BudgetInfo />
        </div>
    )
}
