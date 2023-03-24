import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { PostService } from "../services/PostService";
import { CommentService } from "../services/CommentService";
import validator from 'validator'


export const create = async(req: Request, res: Response) => {
  const { userId, postId    } = req.params
  const { comment } = req.body

  const user = await UserService.findOne(userId)
  const post = await PostService.findOne(postId)

  if(user && post && comment) {
    const nameUserInComment = user.name
    const imgUserInComment = user.avatar ?? ''
    
    const newCommentPost = await CommentService.create(user.id, { 
      postId, 
      comment, 
      nameUserInComment,
      imgUserInComment
    })
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
export const createResponseComment = async(req: Request, res: Response) => {
  const { userId, postId, commentId    } = req.params
  const { comment, comment2, name2 } = req.body

  const user = await UserService.findOne(userId)
  const post = await PostService.findOne(postId)
  const commentPost = await CommentService.findOne(commentId)

  if(user && post && comment && commentPost) {
    const nameUser = user.name
    const imgUser = user.avatar
    const userNameCommentReply = name2 ?? commentPost.nameUserInComment
    const userAvatarCommentReply = commentPost.imgUserInComment
    const dateCommentReply = commentPost.date
    console.log(name2)
    console.log(userNameCommentReply)
    
    const newCommentResponsePost = await CommentService.createResponseComment(user.id, { 
      post_id: post.id, 
      id_comment: commentPost.id,
      nameUser,
      imgUser: imgUser ?? '',
      userNameCommentReply,
      userAvatarCommentReply,
      dateCommentReply,
      comment_response: comment,
      userCommentReply: comment2 ?? commentPost.comment
    })
    if(newCommentResponsePost) {
      //const updateQtComments = await PostService.updateQtComments(post.id)
      // if(updateQtComments) {
        
      // }
      res.status(201).json({ commentResponse: newCommentResponsePost })
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
  const { comment } = req.body
  const commentOne = await CommentService.findOne(id)
  if(commentOne && comment) {
    const commentUpdate = await CommentService.update(commentOne.id, {
      comment
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