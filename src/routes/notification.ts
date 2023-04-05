import { Router } from 'express'
import { privateRoute } from '../config/passport'
import * as NotificationControllers from '../controllers/notificationControllers'

const router = Router()

router.post('/notification', NotificationControllers.createNotificationForgotPassword)
// router.post('/likeInResponseForumComment', privateRoute, LikeInForumController.createResponse)
router.post('/redefinir-pass/:token' , NotificationControllers.redefinirNewPass)
router.get('/redefinir-senha' , NotificationControllers.redefinir)
// router.get('/likeInForum/:id', privateRoute, LikeInForumController.one)
// router.put('/likeInForum/:id', privateRoute, LikeInForumController.update)
// router.delete('/likeInForum/:id', privateRoute, LikeInForumController.deleteLikeCommentForum)

export default router