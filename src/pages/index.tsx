import Account from '@/components/home/Account'
import { CardListSkeleton } from '@/components/home/CardList'
import { CreditScoreSkeleton } from '@/components/home/CreditScore'
import { BannerSkeleton } from '@/components/home/EventBanners'
import Spacing from '@/components/shared/Spacing'
import dynamic from 'next/dynamic'

const EventBanners = dynamic(() => import('@/components/home/EventBanners'), {
  ssr: false,
  loading: () => <BannerSkeleton />,
})

const CreditScore = dynamic(() => import('@/components/home/CreditScore'), {
  ssr: false,
  loading: () => <CreditScoreSkeleton />,
})

const CardList = dynamic(() => import('@/components/home/CardList'), {
  ssr: false,
  loading: () => <CardListSkeleton />,
})

export default function Home() {
  return (
    <>
      <EventBanners />
      <Account />
      <Spacing size={8} backgroundColor="gray100" />
      <CreditScore />
      <Spacing size={8} backgroundColor="gray100" />
      <CardList />
    </>
  )
}
