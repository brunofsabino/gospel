import { Router,NextFunction, Request, Response } from 'express'
import { isAuthenticated, privateRoute } from '../config/passport'
import * as UserController from '../controllers/userControllers'
import * as PostController from '../controllers/postControllers'
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

// router.get('/', isAuthenticated, PostController.home)

// router.get('/failed', (req, res) => res.send("Falhou o login"));
// //router.get('/good', isLoggedIn, (req: any, res) => res.send(`Seja bem vindo(a) ${req.user.displayName}! --- email: ${req.user.emails[0].value} -- Photo: <img src=${req.user.photos[0].value}>`));
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),

// function(req, res) {
// // Successful authentication, redirect home.
// res.redirect('/');
// });

export default router