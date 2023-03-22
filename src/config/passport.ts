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
        token = req.cookies['jwt'];
        console.log(token)
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

// export const verifyToken = (req:Request, res: Response) => {
//     passport.authenticate('jwt', (err: any, user: Express.User | undefined) => {
//         req.user = user
//         return user ? true : false
//     })
// }
export default passport