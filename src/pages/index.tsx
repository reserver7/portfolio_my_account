import Account from '@/components/home/Account'
import { CardListSkeleton } from '@/components/home/CardList'
import { CreditScoreSkeleton } from '@/components/home/CreditScore'
import { BannerSkeleton } from '@/components/home/EventBanners'
import Spacing from '@/components/shared/Spacing'
import { User } from '@/models/user'
import { getAccount } from '@/remote/account'
import { GetServerSidePropsContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { QueryClient, dehydrate } from 'react-query'

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
  const { data } = useSession()

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchQuery(['account', (session.user as User).id], () =>
      getAccount((session.user as User).id),
    )

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}
