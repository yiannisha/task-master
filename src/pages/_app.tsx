import { useState } from 'react'
import Head from 'next/head'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { Provider } from 'jotai'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'
import { Container } from 'reactstrap'

import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const defaultTitle = 'TaskMaster'

export default function App({ 
  Component, pageProps,
 }: AppProps<{
  initialSession: Session,
  // TEMP - FIX
  dehydratedState: any,
}>) {
    const [supabase] = useState(() => createBrowserSupabaseClient())
    const [queryClient] = useState(() => new QueryClient())

    return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
            <Provider>
              <Container className='h-screen my-10 flex flex-column align-items-center'>
                <Head><title>{ `${Component?.title} | ${defaultTitle}` || defaultTitle }</title></Head>
                <Component {...pageProps} />
              </Container>
            </Provider>
          </SessionContextProvider>
        </Hydrate>
      </QueryClientProvider>
  )
}
