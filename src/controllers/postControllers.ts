import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { PostService } from "../services/PostService";


export const create = async(req: Request, res: Response) => {
  const { content, contentPreComment, title, img, video } = req.body
  const { userADMId } = req.params
  if(content && contentPreComment &&  title && userADMId) {
      const userADM = await UserService.findADM(userADMId)
      if(userADM) {
          const newPost = await PostService.create({ userADMId, title, content, contentPreComment, img: img ?? null, video: video ?? null  })
          if(newPost) {
              res.status(201).json({ post: newPost })
          }
      } else {
          res.status(500).json({error : "Erro ao usuario logado"})
      }
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const all = async(req: Request, res: Response) => {
  const all = await PostService.findAll()
  res.status(200).json({posts: all})
}
export const one = async(req: Request, res: Response) => {
  const { id } = req.params
  const post = await PostService.findOne(id)
  if(post) {
      res.status(200).json({post })
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const update = async(req: Request, res: Response) => {
  const { id } = req.params
  const { content, contentPreComment, title, img, video } = req.body
  const post = await PostService.findOne(id)
  if(post) {
      if(content || contentPreComment || title || img || video) {
          const postUpdate = await PostService.update(post.id, {
            title: title ?? post.title, 
            content: content ?? post.content, 
            contentPreComment: contentPreComment ?? post.contentPreComment, 
            img: img ?? post.img, 
            video: video ?? post.video
          })
          if(postUpdate) {
              res.status(201).json({ postUpdate })
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
  const post = await PostService.deletePost(id)
  if(post) {
     res.json({ success: true})
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}