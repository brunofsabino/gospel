import express, { ErrorRequestHandler } from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import homeRouter from './routes/home'
import userRouter from './routes/user'
import postRouter from './routes/post'
import commentRouter from './routes/comment'
import likeInCommentPostRouter from './routes/likeInComment'
import likeInCommentForumRouter from './routes/likeInForum'
import forumRouter from './routes/forum'
import commentForumRouter from './routes/commentForum'
import session from 'express-session'
import { MulterError } from 'multer'
import Cookies from 'js-cookie'

dotenv.config()

const server = express()

server.use(cors())


server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))
server.use(express.static(path.join(__dirname, '../public')))
server.use(express.urlencoded({ extended: true}))

server.use(passport.initialize())
server.use(homeRouter)
server.use(userRouter)
server.use(postRouter)
server.use(commentRouter)
server.use(likeInCommentPostRouter)
server.use(forumRouter)
server.use(commentForumRouter)
server.use(likeInCommentForumRouter)



declare module 'express-session' {
  export interface SessionData {
    // user: { [key: string]: any };
    // userId: number;
    views: number;
    token: string;
  }
}
server.use(session({
  secret: 'dapsdaifnasdáosdasd',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}))

server.use((req, res)=> {
  res.render('pages/404')
  //res.json({error: 'Endpoint não encontrado.'})
})


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    //res.status(400) // bad request
    // if(err instanceof MulterError) {
    //   res.json({ error: err.code })
    // } 
    // if(err instanceof MulterError) {
    //   console.log("Erro img:" + err.code)
    //   res.json({ error: err.code })
    // } else {
    //   console.log("Erro img:" + err)
    //   res.json({ error: "Ocorreu algum erro"})
    // }
    if(err.status) {
        res.status(err.status)
    } else {
        res.status(400)
    }
    if(err.message) {
        res.json({ error: err.message})
    } else {
        res.json({ error: "Ocorreu algum erro"})
    }
    
}
server.use(errorHandler)

server.listen(process.env.PORT, () => {
    console.log("Running in the door 4000")
})