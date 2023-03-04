import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { PostService } from "../services/PostService";
import { CommentService } from "../services/CommentService";
import { LikeInCommentService } from "../services/LikeInCommentService";
import { LikeInCommentForumService } from "../services/LikeInCommentForumService";
import { ForumService } from "../services/ForumService";
import { CommentForumService } from "../services/CommentForumService";


export const create = async(req: Request, res: Response) => {
  const { user_id , forum_id, commentInForum_id  } = req.body
  const user = await UserService.findOne(user_id)
  const forum = await ForumService.findOne(forum_id)
  const commentForum = await CommentForumService.findOne(commentInForum_id)
  const likeCommentForum = await LikeInCommentForumService.findOneByCommentId(commentInForum_id)

  if(user && forum && commentForum && !likeCommentForum ) {
    const newLikeInCommentPost = await LikeInCommentForumService.create(user.id, { 
      forum_id: forum.id, 
      commentInForum_id: commentForum.id,
    })
    if(newLikeInCommentPost) {
      res.status(201).json({ like: newLikeInCommentPost })
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
  } else if (likeCommentForum){
    const likeCommentForumUpdate = await LikeInCommentForumService.update(likeCommentForum.id, {
      done: !likeCommentForum.done
    })
    if(likeCommentForumUpdate) {
      res.status(201).json({ like: likeCommentForumUpdate })
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
  } else {
    res.status(500).json({error : "Dados invalidos"})
}
}

export const all = async(req: Request, res: Response) => {
  const all = await LikeInCommentForumService.findAll()
  res.status(200).json({likes: all})
}
export const one = async(req: Request, res: Response) => {
  const { id } = req.params
  const likeComment = await LikeInCommentForumService.findOne(id)
  if(likeComment) {
      res.status(200).json({likeComment })
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const deleteLikeCommentForum = async(req: Request, res: Response) => {
  const { id } = req.params
  const likeCommentForum = await LikeInCommentForumService.deleteLikeCommentForum(id)
  if(likeCommentForum) {
     res.json({ success: true})
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const update = async(req: Request, res: Response) => {
  const { id } = req.params
  const likeCommentForum = await LikeInCommentForumService.findOne(id)
  if(likeCommentForum) {
    const likeCommentForumUpdate = await LikeInCommentForumService.update(likeCommentForum.id, {
      done: !likeCommentForum.done
    })
    if(likeCommentForumUpdate) {
        res.status(201).json({ likeForum: likeCommentForumUpdate })
    } else {
        res.status(500).json({error : "Dados invalidos"})
    }
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}