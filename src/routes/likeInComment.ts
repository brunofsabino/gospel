import { Router } from 'express'
import { privateRoute } from '../config/passport'
import * as LikeInCommentController from '../controllers/likeInCommentControllers'

const router = Router()

router.post('/likeInComment', privateRoute, LikeInCommentController.create)
router.get('/likeInComment', privateRoute, LikeInCommentController.all)
// router.get('/comment/:id', privateRoute, CommentController.one)
// router.put('/comment/:id', privateRoute, CommentController.update)
// router.delete('/comment/:id', privateRoute, CommentController.deleteCommentPost)

export default router