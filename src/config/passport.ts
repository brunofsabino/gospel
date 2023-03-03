import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import dotenv from 'dotenv'
import { Strategy as JWTStrategy , ExtractJwt} from 'passport-jwt'
import jwt from 'jsonwebtoken'
import { UserService } from '../services/UserService'

dotenv.config()

const notAuthorizedJson = { status: 401, message: "Não autorizado" }
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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

export const generateToken = (data: object) => {
    return jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: "1d" })
}

export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', (err: any, user: Express.User | undefined) => {
        req.user = user
        return user ? next() : next(notAuthorizedJson)
    })(req, res, next)
}
export const privateRouteADM = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', (err: any, user: Express.User ) => {
      req.user = user
      // if(req.user) {
      //   if(req.user.id === '446e0c3a-87bd-4fc6-a23f-5a39f894ef72') {

      //   }
      // }
      
      return user ? next() : next(notAuthorizedJson)
  })(req, res, next)
}
//446e0c3a-87bd-4fc6-a23f-5a39f894ef72
export default passport