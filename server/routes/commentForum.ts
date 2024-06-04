import { Router } from 'express'
import { privateRoute } from '../config/passport'
import * as CommentForumController from '../controllers/commentForumControllers'

const router = Router()

router.post('/commentForum/:userId/:forumId', privateRoute, CommentForumController.create)
router.post('/commentForumresponse/:userId/:postId/:commentId', privateRoute, CommentForumController.createResponseComment)
router.get('/commentForum', privateRoute, CommentForumController.all)
router.get('/commentForum/:id', privateRoute, CommentForumController.one)
router.get('/commentForumresponse/:id', privateRoute, CommentForumController.oneResponse)
router.put('/commentForum/:id', privateRoute, CommentForumController.update)
router.put('/commentForum/del/:id', privateRoute, CommentForumController.updateDel)
router.put('/commentForumresponse/:id', privateRoute, CommentForumController.updateResponse)
router.put('/commentForumresponse/del/:id', privateRoute, CommentForumController.updateDelResponse)
router.delete('/commentForum/:id', privateRoute, CommentForumController.deleteCommentForum)

export default router