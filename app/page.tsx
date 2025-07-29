import BudgetCalculator from '@/components/BudgetCalculator'
import LanguageSwitch from '@/components/LanguageSwitch'

export default function Home() {
  return (
    <>
      <LanguageSwitch />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <BudgetCalculator />
      </div>
    </>
  )
}
