import Image from 'next/image'
import { Inter } from 'next/font/google'

import Page from '@/containers/Page'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Page>
      <div className={inter.className}>
        test
      </div>
    </Page>
  )
}
