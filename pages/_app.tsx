import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useApollo } from '@/lib/apollo-client'
import { GlobalStyles } from '@/styles/globalStyles'
import { ThemeProvider } from '@/lib/theme-context'

import { Layout } from '@/components/layout'

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#ffffff' />
        <meta name='description' content='🥇' />
        <title>🥇 Pokédex</title>
      </Head>
      <ApolloProvider client={apolloClient}>
        <GlobalStyles />
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}
