import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Jumbotron from '../components/Jumbotron'

import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  console.log(posts)
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Clone with Next.js and Sanity</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Jumbotron />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {
          posts.map(post => (
            <Link 
              key={post._id}
              href={`/post/${post.slug.current}`}
            >
              <div className='border rounded-lg group cursor-pointer overflow-hidden'>
                {
                  post.mainImage && (
                    <img 
                      className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
                      src={ urlFor(post.mainImage).url()! } alt="" />
                  )
                }
                <div className='flex justify-between p-5 bg-white'>
                  <div>
                    <p className='text-lg font-bold'>{post.title}</p>
                    <p className='text-xs'>{post.description} by {post.author.name}</p>
                  </div>
                  <img 
                    className='h-12 w-12 rounded-full'
                    src={ urlFor(post.author.image).url()! } alt="" />
                </div>
              </div>
            </Link>
          ))
        }
      </div>
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
