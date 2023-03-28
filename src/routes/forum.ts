import { Router } from 'express'
import { isAuthenticated, privateRoute } from '../config/passport'
import * as ForumController from '../controllers/forumControllers'


const router = Router()


router.post('/forum/:user', privateRoute, ForumController.create)
router.get('/forum', isAuthenticated, ForumController.home)
router.get('/forum/all', privateRoute, ForumController.all)
router.get('/forum/:title', isAuthenticated, ForumController.oneForum)
router.get('/forum/:id', privateRoute, ForumController.one)
router.put('/forum/:id', privateRoute, ForumController.update)
router.delete('/forum/:id', privateRoute, ForumController.deletePost)


export default router