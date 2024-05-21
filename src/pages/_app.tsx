import AuthGuard from '@/components/auth/AuthGuard'
import Layout from '@/components/shared/Layout'
import Navbar from '@/components/shared/Navbar'
import { AlertContextProvider } from '@/contexts/AlertContext'
import globalStyles from '@/styles/globalStyles'
import { Global } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

const clinet = new QueryClient({})

export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <SessionProvider session={session}>
        <QueryClientProvider client={clinet}>
          <Hydrate state={dehydratedState}>
            <AlertContextProvider>
              <AuthGuard>
                <Navbar />
                <Component {...pageProps} />
              </AuthGuard>
            </AlertContextProvider>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
