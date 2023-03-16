import { Router } from 'express'
import { privateRoute } from '../config/passport'
import * as CommentController from '../controllers/commentControllers'

const router = Router()

router.post('/comment/:userId/:postId/', privateRoute, CommentController.create)
router.get('/comment', privateRoute, CommentController.all)
router.get('/comment/:id', privateRoute, CommentController.one)
router.put('/comment/:id', privateRoute, CommentController.update)
router.delete('/comment/:id', privateRoute, CommentController.deleteCommentPost)

export default router