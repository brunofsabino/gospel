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


// router.post('/post/createFile', PostController.createFile)
router.post('/post/e5765c426d9d292a3fd76afe009beaf2/4148fec44f0a20f4808a26928d4c8ed835e8175a/create', upload.single('img'), PostController.create)
router.get('/site/:id', PostController.all)
router.get('/post/:id', PostController.one)
router.put('/post/:id', privateRoute, PostController.update)
router.delete('/post/:id', privateRoute, PostController.deletePost)


export default router