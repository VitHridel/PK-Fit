import type { AppProps } from 'next/app'
import Head from 'next/head'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '@/utils/createEmotionCache'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '@/theme/theme'
import { Layout } from '@/components/Layout'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  return (
      <CacheProvider value={emotionCache}>
        <Head>
          <title>PK-FIT</title>
            <meta name="title" content="Váš parťák na cestě za zdravým životním stylem. | PK-FIT" />
          <meta name="description" content="Získejte inspiraci pro zdravý životní styl a dosáhněte svých fitness cílů s profesionálním trenérem. Vyzkoušejte individuální tréninkové plány a získejte podporu při dosahování optimální kondice. Změňte svůj životní styl s PK-FIT." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
  )
}
