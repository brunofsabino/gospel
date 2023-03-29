import { Router } from 'express'
import { privateRouteAdm, privateRoute } from '../config/passport'
import * as DenounceController from '../controllers/denounceController'

const router = Router()

router.post('/denounceComment', privateRoute, DenounceController.createDenounceComment)
router.post('/denounceCommentInForum', privateRoute, DenounceController.createDenounceInForumComment)
router.get('/denounce/:id', privateRouteAdm, DenounceController.all)
router.get('/denounceInForum/:id', privateRouteAdm, DenounceController.allInForum)
// router.get('/commentForum/:id', privateRoute, CommentForumController.one)
// router.put('/commentForum/:id', privateRoute, CommentForumController.update)
// router.delete('/commentForum/:id', privateRoute, CommentForumController.deleteCommentForum)

export default router