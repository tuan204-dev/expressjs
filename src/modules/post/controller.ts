import { Request, Response } from 'express'
import { getResponse } from '~/utils/common'
import { ICreatePostParams, IUpdatePostParams } from './type'
import Post from './model'

export const updatePost = async (req: Request<unknown, unknown, IUpdatePostParams>, res: Response) => {
    const { _id, ...params } = req.body

    if (!_id) {
        res.status(400).json(
            getResponse({
                data: null,
                message: 'Post ID is required'
            })
        )

        return
    }

    const updatedPost = await Post.findByIdAndUpdate(
        _id,
        {
            ...params
        },
        { new: true }
    )

    res.status(200).json(
        getResponse({
            data: updatedPost,
            message: 'Post updated successfully'
        })
    )
}

export const createPost = async (req: Request<unknown, unknown, ICreatePostParams>, res: Response) => {
    const { title, author, content } = req.body

    const newPost = await Post.create({
        title,
        author,
        content
    })

    newPost.save()

    res.status(201).json(
        getResponse({
            data: newPost,
            message: 'Post created successfully'
        })
    )
}

export const getPosts = async (req: Request, res: Response) => {
    const { page = 1, size = 10 } = req.query

    const skip = (+page - 1) * +size

    const postList = await Post.find().skip(skip).limit(+size).sort({ createdAt: -1 })

    const totalPost = await Post.countDocuments()

    res.status(200).json(
        getResponse({
            data: {
                data: postList,
                total: totalPost
            },
            message: 'Posts fetched successfully'
        })
    )
}

export const getPostById = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
        res.status(400).json(
            getResponse({
                data: null,
                message: 'Post ID is required'
            })
        )

        return
    }

    const post = await Post.findById(id)

    if (!post) {
        res.status(404).json(
            getResponse({
                data: null,
                message: 'Post not found'
            })
        )

        return
    }

    res.status(200).json(
        getResponse({
            data: post,
            message: 'Post fetched successfully'
        })
    )
}
