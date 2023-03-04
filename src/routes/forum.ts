import { Router } from 'express'
import { privateRoute } from '../config/passport'
import * as ForumController from '../controllers/forumControllers'


const router = Router()


router.post('/forum/:user', privateRoute, ForumController.create)
router.get('/forum', privateRoute, ForumController.all)
router.get('/forum/:id', privateRoute, ForumController.one)
router.put('/forum/:id', privateRoute, ForumController.update)
router.delete('/forum/:id', privateRoute, ForumController.deletePost)


export default router