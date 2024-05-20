import Account from '@/components/home/Account'
import { BannerSkeleton } from '@/components/home/EventBanners'
import dynamic from 'next/dynamic'

const EventBanners = dynamic(() => import('@/components/home/EventBanners'), {
  ssr: false,
  loading: () => <BannerSkeleton />,
})

export default function Home() {
  return (
    <>
      <EventBanners />
      <Account />
    </>
  )
}
