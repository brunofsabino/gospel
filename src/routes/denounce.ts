import { Router } from 'express'
import { privateRouteAdm, privateRoute } from '../config/passport'
import * as DenounceController from '../controllers/denounceController'

const router = Router()

router.post('/denounce', privateRoute, DenounceController.create)
// router.get('/commentForum', privateRoute, CommentForumController.all)
// router.get('/commentForum/:id', privateRoute, CommentForumController.one)
// router.put('/commentForum/:id', privateRoute, CommentForumController.update)
// router.delete('/commentForum/:id', privateRoute, CommentForumController.deleteCommentForum)

export default router