import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { ForumService } from "../services/ForumService";


export const create = async(req: Request, res: Response) => {
  const { title, description } = req.body;
  const { user } = req.params
  const userLogged = await UserService.findOne(user)
  if(title && description &&  userLogged) {
    const newForum = await ForumService.create({ userLogged: userLogged.id, title, description  })
    if(newForum) {
        res.status(201).json({ forum: newForum })
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
     } else {
        res.status(500).json({error : "Dados invalidos"})
    }
}
export const all = async(req: Request, res: Response) => {
  const forums = await ForumService.findAll()
  if(forums) {
    res.status(200).json({forums})
  } else {
    res.status(500).json({error : "Dados invalidos"})
  }
}
export const one = async(req: Request, res: Response) => {
  const { id } = req.params
  const forum = await ForumService.findOne(id)
  if(forum) {
      res.status(200).json({forum })
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const update = async(req: Request, res: Response) => {
  const { id } = req.params
  const { title, description } = req.body;
  const forum = await ForumService.findOne(id)
  if(forum) {
      if(title || description) {
          const forumUpdate = await ForumService.update(forum.id, {
            title: title ?? forum.title, 
            description: description ?? forum.description
          })
          if(forumUpdate) {
              res.status(201).json({ forumUpdate })
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
export const deletePost = async(req: Request, res: Response) => {
  const { id } = req.params
  const forum = await ForumService.deleteForum(id)
  if(forum) {
     res.json({ success: true})
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}