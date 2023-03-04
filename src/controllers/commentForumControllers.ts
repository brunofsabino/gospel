import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { PostService } from "../services/PostService";
import { CommentService } from "../services/CommentService";
import { CommentForumService } from "../services/CommentForumService";
import { ForumService } from "../services/ForumService";


export const create = async(req: Request, res: Response) => {
  const { userId, forumId   } = req.params
  const { comment, id_comment_forum } = req.body
  
  const user = await UserService.findOne(userId)
  const forum = await ForumService.findOne(forumId)

  if(user && forum && comment ) {
    const newCommentForum = await CommentForumService.create(user.id, { forumId, comment, id_comment_forum: id_comment_forum ?? ''})
    if(newCommentForum) {
      res.status(201).json({ commentForum: newCommentForum })
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const all = async(req: Request, res: Response) => {
  const all = await CommentForumService.findAll()
  if(all) {
    res.status(200).json({forums: all})
  } else {
    res.status(500).json({error : "Dados invalidos"})
}
  
}
export const one = async(req: Request, res: Response) => {
  const { id } = req.params
  const commentForum = await CommentForumService.findOne(id)
  if(commentForum) {
      res.status(200).json({commentForum })
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const update = async(req: Request, res: Response) => {
  const { id } = req.params
  const { comment, id_comment_forum } = req.body
  const commentForumOne = await CommentForumService.findOne(id)
  if(commentForumOne && comment) {
    const commentForumUpdate = await CommentForumService.update(commentForumOne.id, {
      comment,
      id_comment_forum: id_comment_forum ?? commentForumOne.id_comment_forum
    })
    if(commentForumUpdate) {
        res.status(201).json({ commentForum: commentForumUpdate })
    } else {
        res.status(500).json({error : "Dados invalidos"})
    }
      
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const deleteCommentForum = async(req: Request, res: Response) => {
  const { id } = req.params
  const commentForum = await CommentForumService.deleteCommentForum(id)
  if(commentForum) {
     res.json({ success: true})
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}