import { Router } from 'express'
import { privateRoute } from '../config/passport'
import * as LikeInForumController from '../controllers/likeInCommentForumControllers'

const router = Router()

router.post('/likeInForum', privateRoute, LikeInForumController.create)
router.post('/likeInResponseForumComment', privateRoute, LikeInForumController.createResponse)
router.get('/likeInForum', privateRoute, LikeInForumController.all)
router.get('/likeInForum/:id', privateRoute, LikeInForumController.one)
router.put('/likeInForum/:id', privateRoute, LikeInForumController.update)
router.delete('/likeInForum/:id', privateRoute, LikeInForumController.deleteLikeCommentForum)

export default router