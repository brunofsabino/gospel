import { Router,NextFunction, Request, Response } from 'express'
import { isAuthenticated, privateRoute } from '../config/passport'
import * as UserController from '../controllers/userControllers'
import passport from "passport";
import jwt from "jsonwebtoken";
import multer from 'multer'
import { User } from '@prisma/client';
import cors from 'cors';

const router = Router()
const upload = multer({
  dest: './tmp',
  fileFilter: (req, file, cb) => {
    const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png']
    cb(null, allowed.includes(file.mimetype))
  },
  limits: { fieldSize: 2000000}
})


router.post('/userAdm', UserController.createADM)
router.post('/user', UserController.create)
router.post('/user/4148fec44f0a20f4808a26928d4c8ed835e8175a', UserController.loginAdm)

//router.get('/user', UserController.all)
router.get('/user', privateRoute, UserController.all)

//router.get('/user/:id', UserController.one)
router.get('/user/:id', privateRoute, UserController.one)
router.get('/userName/:name', isAuthenticated, UserController.oneUser)
router.get('/e5765c426d9d292a3fd76afe009beaf2', UserController.adm)

router.get('/userEmail/:email', UserController.oneEmail)
router.get('/sobre/codigo-de-conduta', UserController.conduta)
router.get('/sobre/politica-de-privacidade', UserController.privacidade)
router.get('/userEmail/:email', UserController.oneEmail)
router.post('/login', UserController.login)
router.post('/loginAdm', UserController.loginAdm)

router.put('/userPhoto/:id', privateRoute, upload.single('fileImg'), UserController.updatePhoto)
router.put('/userName/:id', privateRoute, UserController.updateName)
router.put('/user/:id', privateRoute, UserController.update)
router.post('/logout', UserController.logout)
router.delete('/user/:id', privateRoute, UserController.deleteUser)




export default router