import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
    {
        title: String,
        author: String,
        content: String
    },
    { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

export default Post
