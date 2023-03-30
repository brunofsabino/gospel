import { Router } from 'express'
import { privateRoute } from '../config/passport'
import * as UserController from '../controllers/userControllers'


const router = Router()

router.post('/userAdm', UserController.createADM)
router.post('/user', UserController.create)
router.post('/user/4148fec44f0a20f4808a26928d4c8ed835e8175a', UserController.loginAdm)
//router.get('/user/4148fec44f0a20f4808a26928d4c8ed835e8175a', UserController.oneAdm)
router.get('/user', privateRoute, UserController.all)
//router.get('/user/:id/:token', UserController.oneUser)
router.get('/user/:id', privateRoute, UserController.one)
router.get('/user/:name/:id', privateRoute, UserController.oneUser)
router.get('/e5765c426d9d292a3fd76afe009beaf2', UserController.adm)
//router.get('/userAdmToken/:token', UserController.oneAdm)
// router.post('/perfil/:name', UserController.onePerfil)
router.get('/user/email/:email', UserController.oneEmail)
router.post('/login', UserController.login)
router.get('/home', UserController.home)
router.post('/loginAdm', UserController.loginAdm)
//router.post('/loginAdm/area', UserController.loginAdmArea)
router.post('/logout', UserController.logout)
router.put('/user/:id', privateRoute, UserController.update)
router.delete('/user/:id', privateRoute, UserController.deleteUser)



export default router