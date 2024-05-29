import Spacing from '@/components/shared/Spacing'
import withAuth from '@/hooks/withAuth'
import dynamic from 'next/dynamic'

const Transactions = dynamic(() => import('@components/account/Transactions'))
const MonthlyChart = dynamic(() => import('@components/account/MonthlyChart'))
const CategoryPieChart = dynamic(
  () => import('@components/account/CategoryPieChart'),
)

const AccountPage = () => {
  return (
    <div>
      <MonthlyChart chartData={generateMonthlyChartData()} />

      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <CategoryPieChart chartData={generatePieChartData()} />

      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <Transactions />
    </div>
  )
}

function generatePieChartData() {
  return ['카페', '쇼핑', '여행', '식비'].map((label) => ({
    label,
    amount: Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000,
  }))
}

function generateMonthlyChartData() {
  return [
    '2024-01-31',
    '2024-02-29',
    '2024-03-31',
    '2024-04-30',
    '2024-05-31',
    '2024-06-30',
    '2024-07-31',
    '2024-08-31',
    '2024-09-30',
    '2024-10-31',
    '2024-11-30',
    '2024-12-31',
  ].map((date) => ({
    date,
    balance: Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000,
  }))
}

export default withAuth(AccountPage)
