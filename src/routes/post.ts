import { Router } from 'express'
import { privateRoute } from '../config/passport'
import * as PostController from '../controllers/postControllers'
import multer from 'multer'


const router = Router()
const upload = multer({
  dest: './tmp',
  fileFilter: (req, file, cb) => {
    const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png']
    cb(null, allowed.includes(file.mimetype))
  },
  limits: { fieldSize: 2000000}
})

router.post('/post', upload.single('img'), PostController.create)
router.get('/post/:id', PostController.all)
router.get('/post/:idAdm/:id', PostController.one)
router.get('/news/:title', PostController.oneNews)
router.put('/post/:id',  upload.single('img'), PostController.update)
router.put('/post/mainnews/:id',  PostController.updateMainNews)
router.put('/post/slideshow/:id',  PostController.updateSlide)
router.put('/post/newsshow/:id',  PostController.updateNewsShow)
router.delete('/post/:idAdm/:id', PostController.deletePost)


export default router