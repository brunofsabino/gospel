import { Router } from 'express'
import { privateRouteAdm, privateRoute } from '../config/passport'
import * as DenounceController from '../controllers/denounceController'

const router = Router()

router.post('/denounceComment', privateRoute, DenounceController.createDenounceComment)
router.post('/denounceCommentInForum', privateRoute, DenounceController.createDenounceInForumComment)
router.get('/denounce/:id', privateRouteAdm, DenounceController.all)
router.get('/denounceInForum/:id', privateRouteAdm, DenounceController.allInForum)


export default router