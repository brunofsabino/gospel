import { Router } from 'express'
import { privateRoute } from '../config/passport'
import * as CommentForumController from '../controllers/commentForumControllers'

const router = Router()

router.post('/commentForum/:userId/:forumId', privateRoute, CommentForumController.create)
router.get('/commentForum', privateRoute, CommentForumController.all)
router.get('/commentForum/:id', privateRoute, CommentForumController.one)
router.put('/commentForum/:id', privateRoute, CommentForumController.update)
router.delete('/commentForum/:id', privateRoute, CommentForumController.deleteCommentForum)

export default router