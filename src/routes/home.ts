import { Router } from 'express'
import { isAuthenticated, privateRoute } from '../config/passport'
import * as PostController from '../controllers/postControllers'

const router = Router()


router.get('/', isAuthenticated, PostController.home)
router.get('/home', PostController.home2)
router.get('/logout', PostController.logout)


export default router