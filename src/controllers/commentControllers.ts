import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { PostService } from "../services/PostService";
import { CommentService } from "../services/CommentService";
import validator from 'validator'


export const create = async(req: Request, res: Response) => {
  const { userId, postId   } = req.params
  const { comment, idComment } = req.body

  const user = await UserService.findOne(userId)
  const post = await PostService.findOne(postId)

  if(user && post && comment) {
    const newCommentPost = await CommentService.create(user.id, { postId, idComment: idComment ?? null, comment })
    if(newCommentPost) {
      const updateQtComments = await PostService.updateQtComments(post.id)
      if(updateQtComments) {
        res.status(201).json({ comment: newCommentPost })
      }
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const all = async(req: Request, res: Response) => {
  const all = await CommentService.findAll()
  res.status(200).json({posts: all})
}
export const one = async(req: Request, res: Response) => {
  const { id } = req.params
  const comment = await CommentService.findOne(id)
  if(comment) {
      res.status(200).json({comment })
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const update = async(req: Request, res: Response) => {
  const { id } = req.params
  const { comment, idComment } = req.body
  const commentOne = await CommentService.findOne(id)
  if(commentOne && comment) {
    const commentUpdate = await CommentService.update(commentOne.id, {
      comment,
      idComment: idComment ?? commentOne.id_comment
    })
    if(commentUpdate) {
        res.status(201).json({ comment: commentUpdate })
    } else {
        res.status(500).json({error : "Dados invalidos"})
    }
      
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const deleteCommentPost = async(req: Request, res: Response) => {
  const { id } = req.params
  const commentPost = await CommentService.deleteCommentPost(id)
  if(commentPost) {
     res.json({ success: true})
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}