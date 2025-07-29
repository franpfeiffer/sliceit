'use client'

import { motion } from 'framer-motion'

export default function BudgetInfo() {
    const infoCards = [
        {
            icon: '🏠',
            title: '50% - Needs',
            description: 'Essential expenses like rent, utilities, groceries, insurance, and minimum debt payments',
            color: 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70'
        },
        {
            icon: '💰',
            title: '25% - Savings',
            description: 'Retirement contributions, long-term goals, investments, and debt payoff above minimums',
            color: 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70'
        },
        {
            icon: '🚨',
            title: '15% - Emergency Fund',
            description: 'Building your safety net for unexpected expenses and financial security',
            color: 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70'
        },
        {
            icon: '🎉',
            title: '10% - Wants',
            description: 'Entertainment, dining out, hobbies, subscriptions, and other non-essential spending',
            color: 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70'
        }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700"
        >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">📚 How SliceIt Works</h3>

            <div className="grid md:grid-cols-2 gap-6">
                {infoCards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center p-4 rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md ${card.color}`}
                    >
                        <div className="w-12 h-12 flex items-center justify-center text-2xl mr-4 bg-gray-700 rounded-lg shadow-sm text-white">
                            {card.icon}
                        </div>
                        <div>
                            <h4 className="font-bold text-white">{card.title}</h4>
                            <p className="text-sm text-white">{card.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
