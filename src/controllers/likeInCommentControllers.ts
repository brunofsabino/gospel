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
  const likeComment = await LikeInCommentService.findOneByCommentId(commentId)

  if(user && post && comment && !likeComment ) {
    const newLikeInCommentPost = await LikeInCommentService.create(user.id, { 
      post_id: post.id, 
      comment_id: comment.id,
    })
    if(newLikeInCommentPost) {
      const qtLikesInComment = await CommentService.updateQtLikes(newLikeInCommentPost.comment_id)
      res.status(201).json({ like: newLikeInCommentPost })
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
  } else if (likeComment){
    const likeCommentPostUpdate = await LikeInCommentService.update(likeComment.id, {
      done: !likeComment.done
    })
    if(likeCommentPostUpdate){
      if(likeCommentPostUpdate.done === true) {
        const qtLikesInComment = await CommentService.updateQtLikes(likeCommentPostUpdate.comment_id)
        if(qtLikesInComment) {
          res.status(201).json({ like: likeCommentPostUpdate })
        } else {
          res.status(500).json({error : "Dados invalidos"})
      }
      } 
      if(likeCommentPostUpdate.done === false) {
        const qtLikesInComment = await CommentService.updateRemoveQtLikes(likeCommentPostUpdate.comment_id)
        if(qtLikesInComment) {
          res.status(201).json({ like: likeCommentPostUpdate })
        } else {
          res.status(500).json({error : "Dados invalidos"})
      }
      } 
    } 
  } else {
    res.status(500).json({error : "Dados invalidos"})
  }
}
export const createResponse = async(req: Request, res: Response) => {
  const { userId, postId, commentId  } = req.body
  const user = await UserService.findOne(userId)
  const post = await PostService.findOne(postId)
  const comment = await CommentService.findOne(commentId)
  const likeComment = await LikeInCommentService.findOneByCommentId(commentId)

  if(user && post && comment && !likeComment ) {
    const newLikeInCommentPost = await LikeInCommentService.createResponse(user.id, { 
      post_id: post.id, 
      comment_id: comment.id,
    })
    if(newLikeInCommentPost) {
      const qtLikesInComment = await CommentService.updateQtLikes(newLikeInCommentPost.comment_id)
      res.status(201).json({ like: newLikeInCommentPost })
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
  } else if (likeComment){
    const likeCommentPostUpdate = await LikeInCommentService.update(likeComment.id, {
      done: !likeComment.done
    })
    if(likeCommentPostUpdate){
      if(likeCommentPostUpdate.done === true) {
        const qtLikesInComment = await CommentService.updateQtLikes(likeCommentPostUpdate.comment_id)
        if(qtLikesInComment) {
          res.status(201).json({ like: likeCommentPostUpdate })
        } else {
          res.status(500).json({error : "Dados invalidos"})
      }
      } 
      if(likeCommentPostUpdate.done === false) {
        const qtLikesInComment = await CommentService.updateRemoveQtLikes(likeCommentPostUpdate.comment_id)
        if(qtLikesInComment) {
          res.status(201).json({ like: likeCommentPostUpdate })
        } else {
          res.status(500).json({error : "Dados invalidos"})
      }
      } 
    } 
  } else {
    res.status(500).json({error : "Dados invalidos"})
  }
}
export const all = async(req: Request, res: Response) => {
  const all = await LikeInCommentService.findAll()
  res.status(200).json({likes: all})
}
export const one = async(req: Request, res: Response) => {
  const { id } = req.params
  const likeComment = await LikeInCommentService.findOne(id)
  if(likeComment) {
      res.status(200).json({likeComment })
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const deleteLikeCommentPost = async(req: Request, res: Response) => {
  const { id } = req.params
  const likeCommentPost = await LikeInCommentService.deleteLikeCommentPost(id)
  if(likeCommentPost) {
     res.json({ success: true})
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const update = async(req: Request, res: Response) => {
  const { id } = req.params
  const likeCommentPost = await LikeInCommentService.findOne(id)
  if(likeCommentPost) {
    const likeCommentPostUpdate = await LikeInCommentService.update(likeCommentPost.id, {
      done: !likeCommentPost.done
    })
    if(likeCommentPostUpdate) {
        res.status(201).json({ like: likeCommentPostUpdate })
    } else {
        res.status(500).json({error : "Dados invalidos"})
    }
      
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}