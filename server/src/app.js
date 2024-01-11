import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()


//middlewares

app.use(cors({
    origin: process.env.CLIENT_URL||"http://localhost:5173",
    credentials:true
}))
app.use(express.json({limit:"50kb"}))
app.use(cookieParser())
app.use(express.urlencoded({extended:true,limit:"50kb"}))
app.use(express.static("public"))


//routes 
import userRouter from './routes/user.routes.js'
import urlRouter from './routes/url.routes.js'


app.use('/api/v1/users',userRouter)
app.use('/api/v1/urls',urlRouter)



export default app