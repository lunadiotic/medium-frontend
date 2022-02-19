import { GetStaticProps } from 'next'
import React from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'

interface Props {
    post: Post
}

const Post = ({post}: Props) => {

    console.log(post)

  return (
    <main className="max-w-7xl mx-auto">
        <Header />

        <img
            className='w-full h-40 object-cover'
            src={urlFor(post.mainImage).url()!} 
            alt="" 
        />

        <article className='max-w-3xl mx-auto p-5'>
            <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
            <h2 className='text-xl font-light text-gray-500 mb-2'>{post.description}</h2>

            <div className='flex items-center space-x-2'>
                <img className='h-10 w-10 rounded-full' src={urlFor(post.author.image).url()!} alt="" />
                <p className='font-extralight text-sm'>
                    Blog post by <span className='text-green-500'>{post.author.name}</span> - Published at {new Date(post.publishedAt).toLocaleString()}
                </p>
            </div>
        </article>
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
    const query = `*[_type == "post"]{
        _id,
        slug {
            current
        }
    }`

    const posts = await sanityClient.fetch(query)

    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        publishedAt,
        title,
        description,
        body,
        slug,
        mainImage,
        author->{
            name,
            image
        }
    }`

    const post = await sanityClient.fetch(query, {
        slug: params?.slug,
    })

    if (!post) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post,
        }
    }
}