export interface BudgetBreakdown {
    income: number
    needs: number
    savings: number
    emergency: number
    wants: number
    yearlySavings: number
    emergencyFund6M: number
}

export interface BudgetCategory {
    title: string
    subtitle: string
    amount: number
    percentage: number
    color: 'needs' | 'savings' | 'emergency' | 'wants'
    icon: string
}

export interface Translations {
    header: {
        title: string
        subtitle: string
        ruleDescription: string
    }
    form: {
        label: string
        placeholder: string
        helperText: string
        button: string
    }
    categories: {
        needs: { title: string; subtitle: string; description: string }
        savings: { title: string; subtitle: string; description: string }
        emergency: { title: string; subtitle: string; description: string }
        wants: { title: string; subtitle: string; description: string }
    }
    results: {
        title: string
        progressTitle: string
        actionPlanTitle: string
        totalIncome: string
        projections: {
            monthlySavings: { label: string; subtitle: string }
            yearlyPotential: { label: string; subtitle: string }
            emergencyFund: { label: string; subtitle: string }
        }
        actionTips: {
            savings: string
            emergency: string
            wants: string
            needs: string
        }
    }
    info: {
        title: string
    }
    placeholders: {
        emptyState: {
            title: string
            subtitle: string
        }
        error: {
            title: string
            invalidAmount: string
        }
    }
}
