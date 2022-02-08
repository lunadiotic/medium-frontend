import Head from 'next/head'
import Header from '../components/Header'
import Jumbotron from '../components/Jumbotron'

import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
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

export const getServerSideProps = async () => {
  const query = `
    *[_type == "post"]{
      _id,
      title,
      description,
      slug,
      publishedAt,
      body,
      mainImage,
      author->{
        name,
        image
      }
    }
  `

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts
    }
  }
}
