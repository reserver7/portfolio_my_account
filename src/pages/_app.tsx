import Layout from '@/components/shared/Layout'
import globalStyles from '@/styles/globalStyles'
import { Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

const clinet = new QueryClient({})

export default function App({
  Component,
  pageProps: { dehydratedState, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <QueryClientProvider client={clinet}>
        <Hydrate state={dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </Layout>
  )
}
