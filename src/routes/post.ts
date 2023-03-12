import { Router } from 'express'
import { privateRoute } from '../config/passport'
import * as PostController from '../controllers/postControllers'
import multer from 'multer'


const router = Router()
const upload = multer({
  dest: './tmp'
})


router.post('/post/createFile', PostController.createFile)
router.post('/post/:userADMId', upload.single('avatar'), PostController.create)
router.get('/post', privateRoute, PostController.all)
router.get('/post/:id', privateRoute, PostController.one)
router.put('/post/:id', privateRoute, PostController.update)
router.delete('/post/:id', privateRoute, PostController.deletePost)


export default router