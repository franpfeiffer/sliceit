import BudgetCalculator from '@/components/BudgetCalculator'
import LanguageSwitch from '@/components/LanguageSwitch'
import PWAInstall from '@/components/PWAInstall'

export default function Home() {
    return (
        <>
            <LanguageSwitch />
            <PWAInstall />
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <BudgetCalculator />
            </div>
        </>
    )
}
