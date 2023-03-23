import { Router } from 'express'
import { isAuthenticated, privateRoute } from '../config/passport'
import * as PostController from '../controllers/postControllers'

const router = Router()

// router.post('/commentForum/:userId/:forumId', privateRoute, CommentForumController.create)
router.get('/', isAuthenticated, PostController.home)
router.get('/home', PostController.home2)
router.get('/logout', PostController.logout)
//router.get('/commentForum/:id', privateRoute, CommentForumController.one)
//router.put('/commentForum/:id', privateRoute, CommentForumController.update)
//router.delete('/commentForum/:id', privateRoute, CommentForumController.deleteCommentForum)

export default router