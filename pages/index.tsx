import Head from 'next/head'
import Header from '../components/Header'
import Jumbotron from '../components/Jumbotron'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Clone with Next.js and Sanity</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Jumbotron />
    </div>
  )
}
