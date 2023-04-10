import { Router } from 'express'
import { privateRoute } from '../config/passport'
import * as NotificationControllers from '../controllers/notificationControllers'

const router = Router()

router.post('/notification', NotificationControllers.createNotificationForgotPassword)

router.post('/redefinir-pass/:token' , NotificationControllers.redefinirNewPass)
router.get('/redefinir-senha' , NotificationControllers.redefinir)


export default router