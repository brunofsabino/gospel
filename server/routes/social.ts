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



export default router