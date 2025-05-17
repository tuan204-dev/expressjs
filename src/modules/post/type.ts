export interface IPost {
    _id: string
    title: string
    author: string
    content: string
    createdAt?: Date
    updatedAt?: Date
}

export type ICreatePostParams = Omit<IPost, '_id' | 'createdAt' | 'updatedAt'>

export type IUpdatePostParams = { _id: string } & Partial<Omit<IPost, '_id' | 'createdAt' | 'updatedAt'>>
