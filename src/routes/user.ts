import { Router } from 'express'
import { privateRoute } from '../config/passport'
import * as UserController from '../controllers/userControllers'


const router = Router()

router.post('/userAdm', UserController.createADM)
router.post('/user', UserController.create)
router.get('/user', privateRoute, UserController.all)
router.get('/user/:id', UserController.one)
router.get('/e5765c426d9d292a3fd76afe009beaf2', UserController.adm)
router.get('/userAdmToken/:token', UserController.oneAdm)
// router.post('/perfil/:name', UserController.onePerfil)
router.get('/user/email/:email', UserController.oneEmail)
router.post('/login', UserController.login)
router.post('/loginAdm', UserController.loginAdm)
router.post('/logout', UserController.logout)
router.put('/user/:id', privateRoute, UserController.update)
router.delete('/user/:id', privateRoute, UserController.deleteUser)



export default router