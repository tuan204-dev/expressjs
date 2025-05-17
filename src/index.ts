import express from 'express'
import postRoutes from './modules/post/routes'
import connectMongoDB from './config/mongodb'

const PORT = 8080

connectMongoDB()

const app = express()
app.use(express.json())

app.use('/post', postRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
