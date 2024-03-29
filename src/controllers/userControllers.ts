import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import sharp from 'sharp'
import { unlink } from 'fs/promises'
import Cookies from 'js-cookie'
import { User } from "@prisma/client"
import { CommentService } from "../services/CommentService";
import { ForumService } from "../services/ForumService";
import { CommentForumService } from "../services/CommentForumService";
import { schemaCreateUser, schemaUpdateUser, schemaNameUser, schemaLogin, schemaIds, schemaEmail } from "../dtos/validator";


export const createADM = async(req: Request, res: Response) => {
  const { name, password, email } = req.body
  try {
    schemaCreateUser.parse({ name, email, password });
    // Se chegou aqui, é porque os dados são válidos
    // Então você pode continuar com a lógica do seu controller
    const emailExists = await UserService.findByEmail(email)
      if(!emailExists) {
          const newUser = await UserService.createAdm({name, password, email, avatar: 'persona.png'})
          if(newUser) {
              res.status(201).json({ id: newUser.dataNewUser.id, token: newUser.token })
          }
      } else {
          res.status(500).json({error : "E-mail já cadastrado. Faça o login!"})
      }
  } catch (error) {
    // Se cair aqui, é porque os dados são inválidos
    res.status(500).json({error : "Dados invalidos"})
  }
}
function generateRandomString(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
export const create = async(req: Request, res: Response) => {
  const { name, password, email } = req.body
  
  try {
    schemaCreateUser.parse({ name, email, password });
    // Se chegou aqui, é porque os dados são válidos
    // Então você pode continuar com a lógica do seu controller
    const randomString = generateRandomString(35);
      const nickName = name.split(' ').join('-')
      const emailExists = await UserService.findByEmail(email)
      if(!emailExists) {
          const newUser = await UserService.create({
            name, 
            password, 
            email,
            avatar: 'persona.png',
            nickName: `${randomString}_${nickName}`
          })
          if(newUser) {
           
            res.cookie('94a08da1fecbb6e8b46990538c7b50b2', newUser.token, {httpOnly: true,secure: true, maxAge: 24 * 60 * 60 * 1000 });
            //res.setHeader('Set-Cookie', `id=${newUser.dataNewUser.id}; Max-Age=360000`);
            res.status(201).json({ id: newUser.dataNewUser.id,  token: newUser.token })
          }
      } else {
          res.status(500).json({error : "E-mail já cadastrado. Faça o login!"})
      }
  } catch (error) {
    // Se cair aqui, é porque os dados são inválidos
    
    res.status(400).json({error : "Digite um e-mail ou nome valido"})
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
  
  const user = await UserService.findOne(id)
  
  if(user) {
    res.status(200).json({id: user.id, name: user.name, email: user.email })
  } else {
      res.status(400).json({error : "Usuario nao localizado"})
  }
}
export const oneUser = async(req: Request, res: Response) => {
    const { name } = req.params
    const user = await UserService.findOneByNickName(name)
    if(user) {
      let loggedUser = false
      let userId = {}
      let newsComments = {}

      const commentsInPosts = await CommentService.findAllCommentsInPosts(user.id)
      const commentsInForum = await CommentForumService.findAllCommentsInForum(user.id)

      if (req.user) {
        const user1 = req.user as User
          userId = {
          id: user1.id,
          name: user1.name,
          email: user1.email,
          avatar: user1.avatar ?? '',
          nickName: user1.nickName
        }
        if(user1.id === user.id) {
          loggedUser = true
        }
      } 
      const menuHomeMobile = false
      const menuForumMobile = false
      

      res.render('pages/perfil', {
          user,
          loggedUser,
          menuHomeMobile,
          menuForumMobile,
          userId: req.user ? userId : '',
          commentsInPosts,
          commentsInForum
      })
    } else {
      const menuHomeMobile = false
      const menuForumMobile = false
      let userId = {}
      if (req.user) {
        
        const user1 = req.user as User
          userId = {
          id: user1.id,
          name: user1.name,
          email: user1.email,
          avatar: user1.avatar ?? '',
          nickName: user1.nickName
        }
      } 
      res.render('pages/404', { userId, menuHomeMobile, menuForumMobile})
    }
  }
export const oneEmail = async(req: Request, res: Response) => {
    const { email } = req.params
    try {
      schemaEmail.parse({ email });
      const user = await UserService.findByEmail(email)
      if(user) {
          res.status(200).json({id: user.id, email:user.email })
      } else {
          res.status(200).json({error : "E-mail não cadastrado"})
      }
    } catch (error) {
      res.status(200).json({error : "E-mail não cadastrado"})
    }
  }

export const update = async(req: Request, res: Response) => {
  const { id } = req.params
  const { name, password, avatar } = req.body

  try {
    schemaUpdateUser.parse({ name, password, avatar, id});
    const user = await UserService.findOne(id)
  if(user) {
    
      if(name || password || avatar) {
        
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
  } catch (error) {
    res.status(400).json({error : "Dados invalidos"})
  }
}

export const updatePhoto = async(req: Request, res: Response) => {
  const { id } = req.params
  const { fileImg } = req.body

  try {
    schemaIds.parse({ id });
    const user = await UserService.findOne(id)
  
  let userId = {}
  if (req.user && user) {
    const user1 = req.user as User
      userId = {
      id: user1.id,
      name: user1.name,
      email: user1.email,
      avatar: user1.avatar ?? ''
    }
    if(user1.id === user.id) {
      if(user && req.file) {
        const options = {
          fit: 'cover',
          position: 'centre'
        }
        const filename70 = `${req.file.filename}.70.jpg`
        await sharp(req.file.path).resize(70, 70, {fit: 'cover',
        position: 'center'}).toFormat('jpg').toFile(`./public/media/${filename70}`)
        await unlink(req.file.path)
          const userUpdatePhoto = await UserService.updatePhoto(user.id, {
              avatar: filename70
          })
          if(userUpdatePhoto) {
            const commentsInPosts = await CommentService.updateAvatar(user.id, { imgUserInComment: userUpdatePhoto.avatar ?? undefined })
            const updateForum = await ForumService.updateAvatar(user.id, {avatar_user: userUpdatePhoto.avatar ?? undefined} )
            const responseCommentsInPosts = await CommentService.updateAvatarResponse(user.id, { imgUserInComment: userUpdatePhoto.avatar ?? undefined })
            const commentsInForum = await CommentForumService.updateAvatar(user.id, { imgUserInComment: userUpdatePhoto.avatar ?? undefined })
            const responseCommentsInForum = await CommentForumService.updateAvatarResponse(user.id, { imgUserInComment: userUpdatePhoto.avatar ?? undefined })
            
              res.status(201).json({ avatar: userUpdatePhoto.avatar})
          } else {
              res.status(500).json({error : "Dados invalidos"})
          }
          
      } else {
          res.status(500).json({error : "Dados invalidos"})
      }
    }
  } 
  } catch (error) {
    res.status(400).json({error : "Dados invalidos"})
  }
}

export const updateName = async(req: Request, res: Response) => {
  const { id } = req.params
  const { name } = req.body

  try {
    schemaNameUser.parse({ name, id });
    const user = await UserService.findOne(id)
  const randomString = generateRandomString(35);
  const nickName = name.split(' ').join('-')
  
  let userId = {}
  if (req.user && user && name) {
    const user1 = req.user as User
      userId = {
      id: user1.id,
      name: user1.name,
      email: user1.email,
      avatar: user1.avatar ?? ''
    }
    if(user1.id === user.id) {
      const userUpdateName = await UserService.updateNameAndNickName(user.id, {
        name: name,
        nickName: `${randomString}_${nickName}`
      })
      if(userUpdateName) {
        const commentsInPosts = await CommentService.updateName(user.id, { nameUserInComment: userUpdateName.name ?? undefined, nickName: userUpdateName.nickName ?? undefined})
        const updateNameForum = await ForumService.updateName(user.id, { name_user: userUpdateName.name ?? undefined, nickName: userUpdateName.nickName ?? undefined})
        const responseCommentsInPosts = await CommentService.updateNameResponse(user.id, { nameUser: userUpdateName.name ?? undefined, nickName: userUpdateName.nickName?? undefined })
        const commentsInForum = await CommentForumService.updateName(user.id, { nameUserInComment: userUpdateName.name ?? undefined, nickName: userUpdateName.nickName ?? undefined })
        const responseCommentsInForum = await CommentForumService.updateNameResponse(user.id, { nameUser: userUpdateName.name ?? undefined, nickName: userUpdateName.nickName ?? undefined })
        res.status(201).json({ name: userUpdateName.name, nickName: userUpdateName.nickName})
      } else {
          res.status(500).json({error : "Dados invalidos"})
      }
    } else {
      res.status(500).json({error : "Dados invalidos"})
    } 
  } 
  } catch (error) {
    res.status(400).json({error : "Dados invalidos"})
  }
}
export const login = async(req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    schemaLogin.parse({ password, email });
    // Se chegou aqui, é porque os dados são válidos
    // Então você pode continuar com a lógica do seu controller
    const loggedUser = await UserService.login(email, password)
      if(loggedUser) {
        //req.session.userId = loggedUser.id;
        res.cookie('94a08da1fecbb6e8b46990538c7b50b2', loggedUser.token, {httpOnly: true,secure: true, maxAge: 24 * 60 * 60 * 1000 })
            .status(200)
            .json({sucess: true, token: loggedUser.token, id: loggedUser.id})
            //.render('pages/home');
        //res.setHeader('Set-Cookie', `id=${loggedUser.id}; Max-Age=360000`);
        //res.status(200).json({sucess: true, token: loggedUser.token, id: loggedUser.id}).render('pages/home')
        
      } else {
          res.status(500).json({error : "E-mail e/ou senha invalidos"})
      }
  } catch (error) {
    // Se cair aqui, é porque os dados são inválidos
    res.status(400).json({error : "E-mail e/ou senha invalidos"})
  }
  
}
export const loginAdm = async(req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    schemaLogin.parse({ password, email });
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
  } catch(error) {
    res.status(400).json({error : "E-mail e/ou senha invalidos"})
  }
  
}

export const logout = async(req: Request, res: Response) => {
  
}
export const conduta = async(req: Request, res: Response) => {
  const menuHomeMobile = false
  const menuForumMobile = false
  let userId = {}
    if (req.user) {
      
      const user1 = req.user as User
        userId = {
        id: user1.id,
        name: user1.name,
        email: user1.email,
        avatar: user1.avatar ?? '',
        nickName: user1.nickName
      }
    } 
    res.render('pages/codigoConduta', { userId, menuHomeMobile, menuForumMobile})
}
export const privacidade = async(req: Request, res: Response) => {
  const menuHomeMobile = false
  const menuForumMobile = false
  let userId = {}
    if (req.user) {
      
      const user1 = req.user as User
        userId = {
        id: user1.id,
        name: user1.name,
        email: user1.email,
        avatar: user1.avatar ?? '',
        nickName: user1.nickName
      }
    } 
    res.render('pages/privacidade', { userId, menuHomeMobile, menuForumMobile})
}

export const deleteUser = async(req: Request, res: Response) => {
  const { id } = req.params
  try {
    schemaIds.parse({ id });
    const user = await UserService.deleteUser(id)
    if(user) {
      res.json({ success: true})
    } else {
        res.status(500).json({error : "Dados invalidos"})
    }
  } catch (error) {
    res.status(400).json({error : "Dados invalidos"})
  }
}