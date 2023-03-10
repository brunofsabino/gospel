import { Router } from 'express'
import { privateRoute } from '../config/passport'
import * as PostController from '../controllers/postControllers'


const router = Router()


router.post('/post/createFile', PostController.createFile)
router.post('/post/:userADMId', privateRoute, PostController.create)
router.get('/post', privateRoute, PostController.all)
router.get('/post/:id', privateRoute, PostController.one)
router.put('/post/:id', privateRoute, PostController.update)
router.delete('/post/:id', privateRoute, PostController.deletePost)


export default router