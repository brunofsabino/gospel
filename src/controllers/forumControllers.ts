import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { ForumService } from "../services/ForumService";
import { User } from "@prisma/client";
import { CommentForumService } from "../services/CommentForumService";
import { LikeInCommentForumService } from "../services/LikeInCommentForumService";


export const create = async(req: Request, res: Response) => {
  const { title, description } = req.body;
  const { user } = req.params
  // if(req.user =) {
  //   if(req.user.id === user) {

  //   }
  // }
  
  const userLogged = await UserService.findOne(user)
  if(title && description &&  userLogged) {
    const newForum = await ForumService.create({ 
      userLogged: userLogged.id, 
      title, 
      description, 
      avatar_user: userLogged.avatar ?? undefined, 
      name_user: userLogged.name ?? undefined
    })
    if(newForum) {
        res.status(201).json({ forum: newForum })
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
     } else {
        res.status(500).json({error : "Dados invalidos"})
    }
}
export const home = async(req: Request, res: Response) => {
  const forums = await ForumService.findAll()

  let userId = {}
    if (req.user) {
      const user1 = req.user as User
        userId = {
        id: user1.id,
        name: user1.name,
        email: user1.email,
        avatar: user1.avatar ?? ''
      }
    } 
    console.log(userId)
  
    res.render('pages/forum.ejs', {
      forums,
      // slideShow,
      // newsShow,
      userId: req.user ? userId : ''
    })
  // if(forums) {
  //   res.status(200).json({forums})
  // } else {
  //   res.status(500).json({error : "Dados invalidos"})
  // }
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

export const oneForum = async(req: Request, res: Response) => {
  const { title } = req.params
  const newTitle = title.split('-').join(' ')
  const one = await ForumService.findOneByTitle(newTitle)
  //const forum = await ForumService.findOne(id)
  if(one) {
    let userId = {}
    if (req.user) {
      console.log(req.user)
      const user1 = req.user as User
        userId = {
        id: user1.id,
        name: user1.name,
        email: user1.email,
        avatar: user1.avatar ?? ''
      }
    } 
    const comments = await CommentForumService.findAllPost(one.id)
    const responseComments = await CommentForumService.findAllResponseComments(one.id)
    const likes = await LikeInCommentForumService.findAllLikeComment(one.id)
    const responseLikes = await LikeInCommentForumService.findAllLikeResponseComment(one.id)

    console.log(userId)
    console.log(one)
    console.log(comments)
    console.log(likes)

    res.render('pages/oneforum', {
      foruns: one,
      userId,
      comments,
      responseComments,
      likes,
      responseLikes,
    })
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