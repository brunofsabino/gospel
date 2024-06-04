import { Router } from 'express'
import { privateRoute } from '../config/passport'
import * as CommentController from '../controllers/commentControllers'

const router = Router()

router.post('/comment/:userId/:postId/', privateRoute, CommentController.create)
router.post('/commentresponse/:userId/:postId/:commentId', privateRoute, CommentController.createResponseComment)
router.get('/comment', privateRoute, CommentController.all)
router.get('/comment/:id', privateRoute, CommentController.one)
router.get('/commentresponse/:id', privateRoute, CommentController.oneResponse)
router.put('/comment/:id', privateRoute, CommentController.update)
router.put('/comment/del/:id', privateRoute, CommentController.updateDel)
router.put('/commentresponse/del/:id', privateRoute, CommentController.updateDelResponse)
router.put('/commentresponse/:id', privateRoute, CommentController.updateResponse)
router.delete('/comment/:id', privateRoute, CommentController.deleteCommentPost)

export default router