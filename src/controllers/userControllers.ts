import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import validator from 'validator'
import {isEmail} from 'class-validator'
import Cookies from 'js-cookie'


export const createADM = async(req: Request, res: Response) => {
  const { name, password, email } = req.body
  const emailValid = validator.isEmail(email)
  if(name && password && emailValid) {
      const emailExists = await UserService.findByEmail(email)
      if(!emailExists) {
          const newUser = await UserService.createAdm({name, password, email})
          if(newUser) {
              res.status(201).json({ id: newUser.dataNewUser.id, token: newUser.token })
          }
      } else {
          res.status(500).json({error : "E-mail já cadastrado. Faça o login!"})
      }
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}

export const create = async(req: Request, res: Response) => {
  const { name, password, email } = req.body
  const emailValid = validator.isEmail(email)
  const nameValid = validator.isEmpty(name)
  const passwordValid = validator.isEmpty(password)

  if(!emailValid || nameValid || passwordValid) {
    res.status(500).json({error : "Digite um e-mail ou nome valido"})
  } else if (!nameValid && !passwordValid && emailValid) {
      const emailExists = await UserService.findByEmail(email)
      if(!emailExists) {
          const newUser = await UserService.create({
            name, 
            password, 
            email
          })
          if(newUser) {
            req.session.user = newUser.dataNewUser.id;
            console.log(req.session)
            res.cookie('jwt', newUser.token, {httpOnly: true,secure: true, maxAge: 24 * 60 * 60 * 1000 });
            //res.setHeader('Set-Cookie', `id=${newUser.dataNewUser.id}; Max-Age=360000`);
            res.status(201).json({ id: newUser.dataNewUser.id,  token: newUser.token })
          }
      } else {
          res.status(500).json({error : "E-mail já cadastrado. Faça o login!"})
      }
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const all = async(req: Request, res: Response) => {
  const all = await UserService.findAll()
  res.status(200).json({users: all})
}
export const adm = async(req: Request, res: Response) => {
    //const all = await UserService.findAll()
    res.render('pages/site.ejs')
    //res.render('pages/login.ejs')
}
export const admArea = async(req: Request, res: Response) => {
    //const all = await UserService.findAll()
    res.render('pages/areaAdm.ejs')
}
export const oneAdm = async(req: Request, res: Response) => {
    //const { token } = req.params
    res.render('pages/site.ejs')
}
export const one = async(req: Request, res: Response) => {
  const { id } = req.params
  console.log(id)
  const user = await UserService.findOne(id)
  
  if(user) {
    res.status(200).json({id: user.id, name: user.name, email: user.email })
  } else {
      res.status(400).json({error : "Usuario nao localizado"})
  }
}

export const oneEmail = async(req: Request, res: Response) => {
    const { email } = req.params
    const user = await UserService.findByEmail(email)
    if(user) {
        res.status(200).json({id: user.id, email:user.email })
    } else {
        res.status(200).json({error : "E-mail não cadastrado"})
    }
  }

export const update = async(req: Request, res: Response) => {
  const { id } = req.params
  const { name, password, avatar } = req.body
  const user = await UserService.findOne(id)
  if(user) {
    
    //const nameValid = validator.isEmpty(name)
    //const passwordValid = validator.isEmpty(password)
      if(name || password || avatar) {
        console.log('name, password, avatar')
          const userUpdate = await UserService.update(user.id, {
              name: name ?? user.name, 
              password: password ?? user.password,
              avatar: avatar ?? null
          })
          if(userUpdate) {
              res.status(201).json({ id: userUpdate.id, name: userUpdate.name, email: userUpdate.email, avatar: userUpdate.avatar})
          } else {
              res.status(500).json({error : "Dados invalidos"})
          }
      } else if(name) {
          const userUpdateName = await UserService.updateName(user.id, {
              name
          })
          if(userUpdateName) {
              res.status(201).json({ id: userUpdateName.id, name: userUpdateName.name, email: userUpdateName.email})
          } else {
              res.status(500).json({error : "Dados invalidos"})
          }
      } else {
          res.status(500).json({error : "Dados invalidos"})
      }
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const login = async(req: Request, res: Response) => {
  const { email, password } = req.body
  const emailValid = validator.isEmail(email)
  const passwordValid = validator.isEmpty(password)
  if(emailValid && !passwordValid) {
      const loggedUser = await UserService.login(email, password)
      if(loggedUser) {
        res.cookie('jwt', loggedUser.token, {httpOnly: true,secure: true, maxAge: 24 * 60 * 60 * 1000 });
        //req.session.user = loggedUser.id;
        //res.setHeader('Set-Cookie', `id=${loggedUser.id}; Max-Age=360000`);
        res.status(200).json({sucess: true, token: loggedUser.token, id: loggedUser.id})
      } else {
          res.status(500).json({error : "Dados invalidos"})
      }
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const loginAdm = async(req: Request, res: Response) => {
  const { email, password } = req.body
  if(email && password) {
      const loggedUser = await UserService.admLogin(email, password)
      if(loggedUser && loggedUser.id === 'd215be0e-5383-4a98-ba99-5fd3f4738fd9') {
          
          res.status(200).json({sucess: true, token: loggedUser.token, name: loggedUser.name, email: loggedUser.email, id: loggedUser.id})
          //.render('pages/site.ejs')
            //res.render('pages/site.ejs')
      } else {
          res.status(500).json({error : "Dados invalidos"})
      }
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
// export const loginAdmArea = async(req: Request, res: Response) => {
//     const { email, password } = req.body
//     if(email && password) {
//         const loggedUser = await UserService.admLogin(email, password)
//         if(loggedUser && loggedUser.id === 'd215be0e-5383-4a98-ba99-5fd3f4738fd9') {
//             res.status(200).json({sucess: true, token: loggedUser.token, name: loggedUser.name, email: loggedUser.email, id: loggedUser.id})
//         } else {
//             res.status(500).json({error : "Dados invalidos"})
//         }
//     } else {
//         res.status(500).json({error : "Dados invalidos"})
//     }
//   }
export const logout = async(req: Request, res: Response) => {
  
}
export const home = async(req: Request, res: Response) => {
  const users = await UserService.findAll()
  if(users) {
      res.status(200).json({ users})
  } else {
    res.status(500).json({error : "Dados invalidos"})
  }
}
export const deleteUser = async(req: Request, res: Response) => {
  const { id } = req.params
  const user = await UserService.deleteUser(id)
  if(user) {
     res.json({ success: true})
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}