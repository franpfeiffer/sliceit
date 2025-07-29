'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BudgetBreakdown, BudgetCategory } from '@/types/budget'
import { formatCurrency } from '@/utils/calculations'

interface BudgetResultsProps {
    budget: BudgetBreakdown
}

export default function BudgetResults({ budget }: BudgetResultsProps) {
    const [progressValues, setProgressValues] = useState([0, 0, 0, 0])

    const categories: BudgetCategory[] = [
        {
            title: '🏠 Needs',
            subtitle: 'Essential expenses',
            amount: budget.needs,
            percentage: 50,
            color: 'needs',
            icon: '🏠'
        },
        {
            title: '💰 Savings',
            subtitle: 'Future goals',
            amount: budget.savings,
            percentage: 25,
            color: 'savings',
            icon: '💰'
        },
        {
            title: '🚨 Emergency',
            subtitle: 'Safety net',
            amount: budget.emergency,
            percentage: 15,
            color: 'emergency',
            icon: '🚨'
        },
        {
            title: '🎉 Wants',
            subtitle: 'Fun & entertainment',
            amount: budget.wants,
            percentage: 10,
            color: 'wants',
            icon: '🎉'
        }
    ]

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgressValues([50, 25, 15, 10])
        }, 300)
        return () => clearTimeout(timer)
    }, [])

    const getAmountColor = (color: string) => {
        switch (color) {
            case 'needs': return 'text-red-400'
            case 'savings': return 'text-green-400'
            case 'emergency': return 'text-yellow-400'
            case 'wants': return 'text-blue-400'
            default: return 'text-white'
        }
    }

    const getProgressColor = (color: string) => {
        switch (color) {
            case 'needs': return 'bg-gradient-to-r from-red-500 to-red-600'
            case 'savings': return 'bg-gradient-to-r from-green-500 to-green-600'
            case 'emergency': return 'bg-gradient-to-r from-yellow-500 to-yellow-600'
            case 'wants': return 'bg-gradient-to-r from-blue-500 to-blue-600'
            default: return 'bg-gray-500'
        }
    }

    const getBulletColor = (color: string) => {
        switch (color) {
            case 'needs': return 'bg-red-500'
            case 'savings': return 'bg-green-500'
            case 'emergency': return 'bg-yellow-500'
            case 'wants': return 'bg-blue-500'
            default: return 'bg-gray-500'
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="animate-slide-up space-y-8"
        >
            <div className="grid lg:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700"
                >
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">🍰 Your Budget Slices</h2>

                    <div className="space-y-6">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.color}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className={`budget-category ${category.color}`}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                        <div className="text-lg font-bold text-white">{category.title}</div>
                                        <div className="text-sm text-white">{category.subtitle}</div>
                                    </div>
                                    <div className={`text-2xl font-bold ${getAmountColor(category.color)}`}>
                                        {formatCurrency(category.amount)}
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-white text-right">
                                    {category.percentage}%
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-8 p-6 bg-gray-700 rounded-xl border border-gray-600"
                    >
                        <div className="text-center">
                            <div className="text-sm text-white font-medium">Total Monthly Income</div>
                            <div className="text-3xl font-bold text-white">{formatCurrency(budget.income)}</div>
                        </div>
                    </motion.div>
                </motion.div>

                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">📈 Slice Progress</h3>

                        <div className="space-y-6">
                            {categories.map((category, index) => (
                                <div key={category.color} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-white">{category.title}</span>
                                        <span className="text-sm text-white">{category.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                                        <motion.div
                                            className={`progress-fill h-full rounded-full ${getProgressColor(category.color)}`}
                                            initial={{ width: '0%' }}
                                            animate={{ width: `${progressValues[index]}%` }}
                                            transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700"
                    >
                        <h4 className="text-xl font-bold text-white mb-4">💡 Monthly Action Plan</h4>
                        <div className="space-y-3 text-sm">
                            {[
                                { category: 'savings', text: `Automate ${formatCurrency(budget.savings)} to savings each month` },
                                { category: 'emergency', text: `Build emergency fund with ${formatCurrency(budget.emergency)} monthly` },
                                { category: 'wants', text: `Enjoy ${formatCurrency(budget.wants)} guilt-free for fun activities` },
                                { category: 'needs', text: `Keep essentials under ${formatCurrency(budget.needs)} maximum` }
                            ].map((tip, index) => (
                                <motion.div
                                    key={tip.category}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                    className="flex items-center space-x-3"
                                >
                                    <span className={`w-3 h-3 rounded-full flex-shrink-0 ${getBulletColor(tip.category)}`} />
                                    <span className="text-white">{tip.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid md:grid-cols-3 gap-6"
            >
                {[
                    {
                        amount: budget.savings,
                        label: 'Monthly Savings',
                        subtitle: 'Building your future',
                        gradient: 'from-blue-900/40 to-blue-800/40',
                        border: 'border-blue-600'
                    },
                    {
                        amount: budget.yearlySavings,
                        label: 'Yearly Potential',
                        subtitle: 'Annual savings goal',
                        gradient: 'from-green-900/40 to-green-800/40',
                        border: 'border-green-600'
                    },
                    {
                        amount: budget.emergencyFund6M,
                        label: '6-Month Fund',
                        subtitle: 'Emergency target',
                        gradient: 'from-yellow-900/40 to-yellow-800/40',
                        border: 'border-yellow-600'
                    }
                ].map((card, index) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className={`projection-card bg-gradient-to-br ${card.gradient} ${card.border}`}
                    >
                        <div className="text-3xl font-bold mb-2 text-white">{formatCurrency(card.amount)}</div>
                        <div className="text-sm font-semibold mb-1 text-white">{card.label}</div>
                        <div className="text-xs opacity-75 text-white">{card.subtitle}</div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}
