import { Translations } from '@/types/budget'

export const translations: { en: Translations; es: Translations } = {
    en: {
        header: {
            title: "SliceIt",
            subtitle: "Slice your budget perfectly with the 50-25-15-10 rule",
            ruleDescription: "50% Needs • 25% Savings • 15% Emergency • 10% Wants"
        },
        form: {
            label: "💵 Enter Your Monthly Income",
            placeholder: "5000",
            helperText: "You can enter any amount (e.g., 1000000 or 1,000,000)",
            button: "Slice My Budget"
        },
        categories: {
            needs: {
                title: "🏠 Needs",
                subtitle: "Essential expenses",
                description: "Essential expenses like rent, utilities, groceries, insurance, and minimum debt payments"
            },
            savings: {
                title: "💰 Savings",
                subtitle: "Future goals",
                description: "Retirement contributions, long-term goals, investments, and debt payoff above minimums"
            },
            emergency: {
                title: "🚨 Emergency",
                subtitle: "Safety net",
                description: "Building your safety net for unexpected expenses and financial security"
            },
            wants: {
                title: "🎉 Wants",
                subtitle: "Fun & entertainment",
                description: "Entertainment, dining out, hobbies, subscriptions, and other non-essential spending"
            }
        },
        results: {
            title: "Your Budget Slices",
            progressTitle: "📈 Slice Progress",
            actionPlanTitle: "💡 Monthly Action Plan",
            totalIncome: "Total Monthly Income",
            projections: {
                monthlySavings: { label: "Monthly Savings", subtitle: "Building your future" },
                yearlyPotential: { label: "Yearly Potential", subtitle: "Annual savings goal" },
                emergencyFund: { label: "6-Month Fund", subtitle: "Emergency target" }
            },
            actionTips: {
                savings: "Automate {amount} to savings each month",
                emergency: "Build emergency fund with {amount} monthly",
                wants: "Enjoy {amount} guilt-free for fun activities",
                needs: "Keep essentials under {amount} maximum"
            }
        },
        info: {
            title: "📚 How SliceIt Works"
        },
        placeholders: {
            emptyState: {
                title: "Enter your income above to slice your budget perfectly",
                subtitle: "Works with any amount - from thousands to millions!"
            },
            error: {
                title: "Oops!",
                invalidAmount: "Please enter a valid income amount"
            }
        }
    },
    es: {
        header: {
            title: "SliceIt",
            subtitle: "Divide tu presupuesto perfectamente con la regla 50-25-15-10",
            ruleDescription: "50% Necesidades • 25% Ahorros • 15% Emergencias • 10% Deseos"
        },
        form: {
            label: "💵 Ingresa tu Ingreso Mensual",
            placeholder: "5000",
            helperText: "Puedes ingresar cualquier cantidad (ej: 1000000 o 1,000,000)",
            button: "Dividir mi Presupuesto"
        },
        categories: {
            needs: {
                title: "🏠 Necesidades",
                subtitle: "Gastos esenciales",
                description: "Gastos esenciales como renta, servicios, comida, seguros y pagos mínimos de deudas"
            },
            savings: {
                title: "💰 Ahorros",
                subtitle: "Metas futuras",
                description: "Contribuciones para retiro, metas a largo plazo, inversiones y pagos extra de deudas"
            },
            emergency: {
                title: "🚨 Emergencias",
                subtitle: "Fondo de seguridad",
                description: "Construyendo tu red de seguridad para gastos inesperados y seguridad financiera"
            },
            wants: {
                title: "🎉 Deseos",
                subtitle: "Diversión y entretenimiento",
                description: "Entretenimiento, salir a cenar, pasatiempos, suscripciones y otros gastos no esenciales"
            }
        },
        results: {
            title: "Tus Divisiones de Presupuesto",
            progressTitle: "📈 Progreso de Divisiones",
            actionPlanTitle: "💡 Plan de Acción Mensual",
            totalIncome: "Ingreso Mensual Total",
            projections: {
                monthlySavings: { label: "Ahorros Mensuales", subtitle: "Construyendo tu futuro" },
                yearlyPotential: { label: "Potencial Anual", subtitle: "Meta de ahorros anuales" },
                emergencyFund: { label: "Fondo 6 Meses", subtitle: "Meta de emergencias" }
            },
            actionTips: {
                savings: "Automatiza {amount} a ahorros cada mes",
                emergency: "Construye fondo de emergencia con {amount} mensual",
                wants: "Disfruta {amount} sin culpa en actividades divertidas",
                needs: "Mantén gastos esenciales bajo {amount} máximo"
            }
        },
        info: {
            title: "📚 Cómo Funciona SliceIt"
        },
        placeholders: {
            emptyState: {
                title: "Ingresa tu ingreso arriba para dividir tu presupuesto perfectamente",
                subtitle: "¡Funciona con cualquier cantidad - desde miles hasta millones!"
            },
            error: {
                title: "¡Ups!",
                invalidAmount: "Por favor ingresa una cantidad de ingreso válida"
            }
        }
    }
}
