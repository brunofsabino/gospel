import express, { ErrorRequestHandler, Request, Response } from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import homeRouter from './routes/home'
import userRouter from './routes/user'
import postRouter from './routes/post'
import commentRouter from './routes/comment'
import denounce from './routes/denounce'
import notification from './routes/notification'
import likeInCommentPostRouter from './routes/likeInComment'
import likeInCommentForumRouter from './routes/likeInForum'
import forumRouter from './routes/forum'
import commentForumRouter from './routes/commentForum'
import session, { SessionOptions } from 'express-session';
import { MulterError } from 'multer'
import cookieParser from 'cookie-parser'
import { User } from '@prisma/client'

dotenv.config()

const server = express()

server.use(cookieParser())
server.use(cors({
  credentials: true,
  origin: 'https://www.opiniaogospel.com.br',
  optionsSuccessStatus: 200,
}))


server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))
server.use(express.static(path.join(__dirname, '../public')))
server.use(express.urlencoded({ extended: true}))

server.use(passport.initialize())


declare module 'express-session' {
  export interface SessionData {
    userId: string;
  }
}
const sessionConfig: SessionOptions = {
  secret: 'dasafasdasdefay',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // use secure: true em produção, com HTTPS
};
server.use(session(sessionConfig))

server.use(userRouter)
server.use(homeRouter)
server.use(postRouter)
server.use(commentRouter)
server.use(likeInCommentPostRouter)
server.use(forumRouter)
server.use(commentForumRouter)
server.use(likeInCommentForumRouter)
server.use(denounce)
server.use(notification)



server.use((req, res)=> {
  const menuHomeMobile = false
  const menuForumMobile = false
  let userId = {}
    if (req.user) {
      console.log(req.user)
      const user1 = req.user as User
        userId = {
        id: user1.id,
        name: user1.name,
        email: user1.email,
        avatar: user1.avatar ?? '',
        nickName: user1.nickName
      }
    } 
    res.render('pages/404', { userId, menuHomeMobile, menuForumMobile})
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