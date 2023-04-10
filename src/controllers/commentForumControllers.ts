import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { PostService } from "../services/PostService";
import { CommentService } from "../services/CommentService";
import { CommentForumService } from "../services/CommentForumService";
import { ForumService } from "../services/ForumService";
import { User } from "@prisma/client";
import { schemaCommentForumUser, schemaIds, schemaResponseCommentForumUser, schemaUpdateForumUser } from "../dtos/validator";


export const create = async(req: Request, res: Response) => {
  const { userId, forumId   } = req.params
  const { comment, id_comment_forum } = req.body

  try {
    schemaCommentForumUser.parse({ userId, forumId, comment, id_comment_forum });
    const user = await UserService.findOne(userId)
    const forum = await ForumService.findOne(forumId)

  if(user && forum && comment ) {
    const nameUserInComment = user.name
    const imgUserInComment = user.avatar ?? ''
    const nickNameUser = user.nickName 
    
    const newCommentForum = await CommentForumService.create(user.id, { 
      forumId, 
      comment, 
      id_comment_forum: id_comment_forum ?? '',
      nameUserInComment,
      imgUserInComment,
      nickName: nickNameUser ??  undefined
    })
    if(newCommentForum) {
      const updateQtComments = await ForumService.updateQtComments(forum.id, nameUserInComment)
      
      if(updateQtComments) {
        res.status(201).json({ commentForum: newCommentForum })
      }
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
  } catch (error) {
    res.status(400).json({error : "Dados invalidos"})
  }
}
export const createResponseComment = async(req: Request, res: Response) => {
  const { userId, postId, commentId    } = req.params
  const { comment, comment2, name2 } = req.body

  try {
    schemaResponseCommentForumUser.parse({ userId, postId, commentId, comment, comment2, name2 });
    const user = await UserService.findOne(userId)
  const post = await ForumService.findOne(postId)
  const commentPost = await CommentForumService.findOne(commentId)

  if(user && post && comment && commentPost) {
    const nameUser = user.name
    const imgUser = user.avatar
    const nickNameUser = user.nickName 
    const userNameCommentReply = name2 ?? commentPost.nameUserInComment
    const userAvatarCommentReply = commentPost.imgUserInComment
    const dateCommentReply = commentPost.date
    
    
    const newCommentResponsePost = await CommentForumService.createResponseComment(user.id, { 
      post_id: post.id, 
      id_comment: commentPost.id,
      nameUser,
      imgUser: imgUser ?? '',
      userNameCommentReply,
      userAvatarCommentReply: userAvatarCommentReply ?? '',
      dateCommentReply,
      comment_response: comment,
      userCommentReply: comment2 ?? commentPost.comment,
      nickName: nickNameUser ??  undefined
    })
    if(newCommentResponsePost) {
      const updateQtComments = await ForumService.updateQtComments(post.id, nameUser)
      if(updateQtComments) {
        res.status(201).json({ commentResponse: newCommentResponsePost })
      }
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
    
  } catch (error) {
    res.status(400).json({error : "Dados invalidos"})
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
  try {
    schemaIds.parse({ id });
    const commentForum = await CommentForumService.findOne(id)
  if(commentForum) {
      res.status(200).json({commentForum })
  } else {
      res.status(400).json({error : "Dados invalidos"})
  }
  } catch (error) {
    res.status(500).json({error : "Dados invalidos"})
  }
}
export const oneResponse = async(req: Request, res: Response) => {
  const { id } = req.params
  try {
    schemaIds.parse({ id });
    const comment = await CommentForumService.findOneResponseComment(id)
    if(comment) {
        res.status(200).json({comment })
    } else {
        res.status(400).json({error : "Dados invalidos"})
    }
  } catch (error) {
    res.status(400).json({error : "Dados invalidos"})
  }
  
}
export const update = async(req: Request, res: Response) => {
  const { id } = req.params
  const { comment, idUser } = req.body
  try {
    schemaUpdateForumUser.parse({ id, comment, idUser });
    const commentOne = await CommentForumService.findOne(id)
  if(req.user) {
    const user = req.user as User
    if(user.id  === idUser) {
      if(commentOne && comment) {
        const commentUpdate = await CommentForumService.update(commentOne.id, {
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
export const updateResponse = async(req: Request, res: Response) => {
  const { id } = req.params
  const { comment, idUser } = req.body

  try {
    schemaUpdateForumUser.parse({ id, comment, idUser });
    const commentOne = await CommentForumService.findOneResponseComment(id)
  
  if(req.user ) {
    const user = req.user as User
    if(user.id  === idUser) {
      if(commentOne && comment) {
        const commentUpdate = await CommentForumService.updateResponseComment(commentOne.id, {
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
export const updateDel = async(req: Request, res: Response) => {
  const { id } = req.params
  const {  idUser } = req.body

  try {
    schemaUpdateForumUser.parse({ id, idUser });
    const commentOne = await CommentForumService.findOne(id)
  
  if(req.user ) {
    const user = req.user as User
    if(user.id  === idUser) {
      if(commentOne ) {
        const commentUpdateDel = await CommentForumService.updateDel(commentOne.id, {
          commentShow: !commentOne.commentShow
        })
        if(commentUpdateDel) {
            res.status(201).json({ comment: commentUpdateDel })
        } else {
            res.status(500).json({error : "Dados invalidos"})
        }
      } else {
          res.status(500).json({error : "Dados invalidos"})
      }
    } else {
      res.status(400).json({error : "Dados invalidos"})
    }
  } else {
    res.status(400).json({error : "Dados invalidos"})
  }
  } catch (error) {
    res.status(400).json({error : "Dados invalidos"})
  }
}
export const updateDelResponse = async(req: Request, res: Response) => {
  const { id } = req.params
  const {  idUser } = req.body
  try {
    schemaUpdateForumUser.parse({ id, idUser });
    const commentOne = await CommentForumService.findOneResponseComment(id)
  
  if(req.user ) {
    const user = req.user as User
    if(user.id  === idUser) {
      if(commentOne ) {
        const commentUpdateDel = await CommentForumService.updateDelResponse(commentOne.id, {
          commentShow: !commentOne.commentShow
        })
        if(commentUpdateDel) {
            res.status(201).json({ comment: commentUpdateDel })
        } else {
            res.status(500).json({error : "Dados invalidos"})
        }
      } else {
          res.status(500).json({error : "Dados invalidos"})
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
export const deleteCommentForum = async(req: Request, res: Response) => {
  const { id } = req.params
  try {
    schemaIds.parse({ id });
    const commentForum = await CommentForumService.deleteCommentForum(id)
  if(commentForum) {
     res.json({ success: true})
  } else {
    res.status(400).json({error : "Dados invalidos"})
  }
  } catch (error) {
    res.status(400).json({error : "Dados invalidos"})
  }
}