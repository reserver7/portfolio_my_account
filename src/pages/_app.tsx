import Layout from '@/components/shared/Layout'
import globalStyles from '@/styles/globalStyles'
import { Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

const clinet = new QueryClient({})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <QueryClientProvider client={clinet}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Layout>
  )
}
