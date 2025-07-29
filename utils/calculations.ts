import { BudgetBreakdown } from '@/types/budget'

export function calculateBudget(income: number): BudgetBreakdown {
    const needs = income * 0.50
    const savings = income * 0.25
    const emergency = income * 0.15
    const wants = income * 0.10

    return {
        income,
        needs,
        savings,
        emergency,
        wants,
        yearlySavings: savings * 12,
        emergencyFund6M: emergency * 6
    }
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount)
}

export function formatNumberInput(value: string): string {
    const cleanValue = value.replace(/[^0-9.]/g, '')
    const parts = cleanValue.split('.')

    if (parts.length > 2) {
        return parts[0] + '.' + parts.slice(1).join('')
    }

    if (parts[1] && parts[1].length > 2) {
        return parts[0] + '.' + parts[1].substring(0, 2)
    }

    return cleanValue
}

export function addCommasToNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
