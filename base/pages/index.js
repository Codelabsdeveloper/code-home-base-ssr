import Head from 'next/head'

import dynamic from 'next/dynamic'

const HeaderComponent = dynamic(
  () => import('header/header'),
  { ssr: false }
)


export default function Home() {
  return (
    <div>
      <Head>
        <title>Microfrontends Demo</title>
        <meta name="description" content="Demo for Microfrontends using Module Federation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <main >
        Hello! This content is hosted locally.
      </main>
    </div>
  )
}
