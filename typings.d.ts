export interface Post {
    _id: string,
    publishedAt: string | number | Date,
    title: string,
    slug: {
        current: string
    },
    description: string,
    mainImage: {
        asset: {
            url: string
        }
    },
    body: [object],
    author: {
        name: string,
        image: string
    }
}