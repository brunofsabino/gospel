import { Router } from 'express'
import { privateRoute } from '../config/passport'
import * as LikeInCommentController from '../controllers/likeInCommentControllers'

const router = Router()

router.post('/likeInComment', privateRoute, LikeInCommentController.create)
router.post('/likeInResponseComment', privateRoute, LikeInCommentController.createResponse)
router.get('/likeInComment', privateRoute, LikeInCommentController.all)
router.get('/likeInComment/:id', privateRoute, LikeInCommentController.one)
router.put('/likeInComment/:id', privateRoute, LikeInCommentController.update)
router.delete('/likeInComment/:id', privateRoute, LikeInCommentController.deleteLikeCommentPost)

export default router