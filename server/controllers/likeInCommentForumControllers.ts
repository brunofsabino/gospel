import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { PostService } from "../services/PostService";
import { CommentService } from "../services/CommentService";
import { LikeInCommentService } from "../services/LikeInCommentService";
import { LikeInCommentForumService } from "../services/LikeInCommentForumService";
import { ForumService } from "../services/ForumService";
import { CommentForumService } from "../services/CommentForumService";
import { schemaCreateLike, schemaIds } from "../dtos/validator";


export const create = async(req: Request, res: Response) => {
  const { userId , postId, commentId  } = req.body
  
  try {
    schemaCreateLike.parse({ userId , postId, commentId });
    const user = await UserService.findOne(userId)
    const forum = await ForumService.findOne(postId)
    const commentForum = await CommentForumService.findOne(commentId)
    const likeCommentForum = await LikeInCommentForumService.findOneByCommentId(userId, commentId)

  if(user && forum && commentForum && !likeCommentForum ) {
    const newLikeInCommentPost = await LikeInCommentForumService.create(user.id, { 
      forum_id: forum.id, 
      commentInForum_id: commentForum.id,
    })
    if(newLikeInCommentPost) {
      const qtLikesInComment = await CommentForumService.updateQtLikes(newLikeInCommentPost.commentInForum_id)
      res.status(201).json({ like: newLikeInCommentPost })
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
  } else if (likeCommentForum){
    const likeCommentForumUpdate = await LikeInCommentForumService.update(likeCommentForum.id, {
      done: !likeCommentForum.done
    })
    if(likeCommentForumUpdate) {
      if(likeCommentForumUpdate.done === true) {
        const qtLikesInComment = await CommentForumService.updateQtLikes(likeCommentForumUpdate.commentInForum_id)
        if(qtLikesInComment) {
          res.status(201).json({ like: likeCommentForumUpdate })
        } else {
          res.status(500).json({error : "Dados invalidos"})
      }
      } 
      if(likeCommentForumUpdate.done === false) {
        const qtLikesInComment = await CommentForumService.updateRemoveQtLikes(likeCommentForumUpdate.commentInForum_id)
        if(qtLikesInComment) {
          res.status(201).json({ like: likeCommentForumUpdate })
        } else {
          res.status(500).json({error : "Dados invalidos"})
      }
      } 
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
  } else {
    res.status(400).json({error : "Dados invalidos"})
  }
  } catch (error) {
    res.status(400).json({error : "Dados invalidos"})
  }
}
export const createResponse = async(req: Request, res: Response) => {
  const { userId, postId, commentId  } = req.body
  try {
    schemaCreateLike.parse({ userId , postId, commentId });
    const user = await UserService.findOne(userId)
    const post = await ForumService.findOne(postId)
    const comment = await CommentForumService.findOneResponseComment(commentId)
    const likeComment = await LikeInCommentForumService.findOneByResponseCommentId(commentId, userId)

  if(user && post && comment && !likeComment ) {
    const newLikeInResponseCommentPost = await LikeInCommentForumService.createResponse(user.id, { 
      post_id: post.id, 
      comment_id: comment.id,
      nameUser: user.name,
      imgUser: user.avatar ?? '',
      userNameCommentReply: comment.userNameCommentReply ?? '',
      userAvatarCommentReply: comment.userAvatarCommentReply ?? '',
      userCommentReply: comment.userNameCommentReply ?? '',
      dateCommentReply: comment.dateCommentReply ?? new Date(),
      qtLikes: comment.qtLikes ?? null,
      comment_response: comment.comment_response  
    })
    if(newLikeInResponseCommentPost) {
      const qtLikesInComment = await CommentForumService.updateQtResponseLikes(newLikeInResponseCommentPost.commentForum_id)
      res.status(201).json({ like: newLikeInResponseCommentPost })
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
  } else if (likeComment){
    const likeCommentPostUpdate = await LikeInCommentForumService.updateResponseComment(likeComment.id, {
      done: !likeComment.done,
      //likeShow: !likeComment.likeShow
    })
    if(likeCommentPostUpdate){
      if(likeCommentPostUpdate.done === true) {
        const qtLikesInComment = await CommentForumService.updateQtResponseLikes(likeCommentPostUpdate.commentForum_id)
        if(qtLikesInComment) {
          res.status(201).json({ like: likeCommentPostUpdate })
        } else {
          res.status(500).json({error : "Dados invalidos"})
      }
      } 
      if(likeCommentPostUpdate.done === false) {
        const qtLikesInComment = await CommentForumService.updateRemoveResponseQtLikes(likeCommentPostUpdate.commentForum_id)
        if(qtLikesInComment) {
          res.status(201).json({ like: likeCommentPostUpdate })
        } else {
          res.status(500).json({error : "Dados invalidos"})
      }
      } 
    } 
  } else {
    res.status(400).json({error : "Dados invalidos"})
  }
  } catch (error) {
    res.status(400).json({error : "Dados invalidos"})
  }
}
export const all = async(req: Request, res: Response) => {
  const all = await LikeInCommentForumService.findAll()
  res.status(200).json({likes: all})
}
export const one = async(req: Request, res: Response) => {
  const { id } = req.params
  try {
    schemaIds.parse({ id });
    const likeComment = await LikeInCommentForumService.findOne(id)
    if(likeComment) {
        res.status(200).json({likeComment })
    } else {
        res.status(400).json({error : "Dados invalidos"})
    }
  } catch (error) {
    res.status(400).json({error : "Dados invalidos"})
  }
}
export const deleteLikeCommentForum = async(req: Request, res: Response) => {
  const { id } = req.params
  try {
    schemaIds.parse({ id });
    const likeCommentForum = await LikeInCommentForumService.deleteLikeCommentForum(id)
    if(likeCommentForum) {
      res.json({ success: true})
    } else {
        res.status(400).json({error : "Dados invalidos"})
    }
  } catch (error) {
    res.status(400).json({error : "Dados invalidos"})
  }
}
export const update = async(req: Request, res: Response) => {
  const { id } = req.params
  try {
    schemaIds.parse({ id });
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
      res.status(400).json({error : "Dados invalidos"})
  }
  } catch (error) {
    res.status(400).json({error : "Dados invalidos"})
  }
}