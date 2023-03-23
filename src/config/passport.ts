import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import dotenv from 'dotenv'
import { Strategy as JWTStrategy , ExtractJwt} from 'passport-jwt'
import jwt from 'jsonwebtoken'
import { UserService } from '../services/UserService'
import { User } from '@prisma/client'

dotenv.config()

const notAuthorizedJson = { status: 401, message: "Não autorizado" }
const options = {
    //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        extractJwtFromCookie,
    ]),
    secretOrKey: process.env.JWT_SECRET as string
}

passport.use(new JWTStrategy(options, async(payload, done)=>{
    const user = await UserService.findOne(payload.id)
    if(user) {
        return done(null, user)
    } else {
        return done(notAuthorizedJson, false)
    }
}))
function extractJwtFromCookie(req: Request) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['94a08da1fecbb6e8b46990538c7b50b2'];
    }
    return token;
  }

export const generateToken = (data: object) => {
    return jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: "1d" })
}

export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt',{ session: false }, (err: any, user: User) => {
        req.user = user
        return user ? next() : next(notAuthorizedJson)
    })(req, res, next)
}
export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    passport.authenticate('jwt', { session: false }, (err: any, user: User) => {
      if (err || !user) {
        // Caso não esteja autenticado, continua a execução da rota normalmente
        return next();
      }
      // Se estiver autenticado, define req.user como o usuário autenticado
      req.user = user;
      return next();
    })(req, res, next);
  };

export default passport