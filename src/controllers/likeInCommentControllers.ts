import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { PostService } from "../services/PostService";
import { CommentService } from "../services/CommentService";
import { LikeInCommentService } from "../services/LikeInCommentService";


export const create = async(req: Request, res: Response) => {
  const { userId, postId, commentId  } = req.body
  const user = await UserService.findOne(userId)
  const post = await PostService.findOne(postId)
  const comment = await CommentService.findOne(commentId)

  if(user && post && comment ) {
    const newLikeInCommentPost = await LikeInCommentService.create(user.id, { post_id: post.id, comment_id: comment.id  })
    if(newLikeInCommentPost) {
      res.status(201).json({ like: newLikeInCommentPost })
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}

export const all = async(req: Request, res: Response) => {
  const all = await LikeInCommentService.findAll()
  res.status(200).json({likes: all})
}