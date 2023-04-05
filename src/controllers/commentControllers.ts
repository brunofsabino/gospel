import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { PostService } from "../services/PostService";
import { CommentService } from "../services/CommentService";
import {  schemaCommentUser, schemaIds, schemaResponseCommentUser } from "../dtos/validator";
import { User } from "@prisma/client";


export const create = async(req: Request, res: Response) => {
  const { userId, postId    } = req.params
  const { comment } = req.body

  try {
    schemaCommentUser.parse({ comment, userId, postId });
    // Se chegou aqui, é porque os dados são válidos
    // Então você pode continuar com a lógica do seu controller
    const user = await UserService.findOne(userId)
    const post = await PostService.findOne(postId)

  if(user && post && comment) {
    const nameUserInComment = user.name
    const imgUserInComment = user.avatar 
    const nickNameUser = user.nickName 
    
    const newCommentPost = await CommentService.create(user.id, { 
      postId, 
      comment, 
      nameUserInComment,
      imgUserInComment: imgUserInComment ?? '',
      nickName: nickNameUser ?? undefined
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
  } catch (error) {
    // Se cair aqui, é porque os dados são inválidos
    res.status(400).json({error : "Dados invalidos"})
  }
}
export const createResponseComment = async(req: Request, res: Response) => {
  const { userId, postId, commentId    } = req.params
  const { comment, comment2, name2 } = req.body

  try {
    schemaResponseCommentUser.parse({ comment, comment2, name2, userId, postId, commentId });
    // Se chegou aqui, é porque os dados são válidos
    // Então você pode continuar com a lógica do seu controller
    const user = await UserService.findOne(userId)
    const post = await PostService.findOne(postId)
    const commentPost = await CommentService.findOne(commentId)

  if(user && post && comment && commentPost) {
    const nameUser = user.name
    const imgUser = user.avatar
    const nickNameUser = user.nickName 
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
      userCommentReply: comment2 ?? commentPost.comment,
      nickName: nickNameUser ?? undefined
    })
    if(newCommentResponsePost) {
      const updateQtComments = await PostService.updateQtComments(post.id)
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
    // Se cair aqui, é porque os dados são inválidos
    res.status(400).json({error : "Dados invalidos"})
  }
}
export const all = async(req: Request, res: Response) => {
  const all = await CommentService.findAll()
  res.status(200).json({posts: all})
}
export const one = async(req: Request, res: Response) => {
  const { id } = req.params
  try {
    schemaIds.parse({ id });
    const comment = await CommentService.findOne(id)
    if(comment) {
      res.status(200).json({comment })
    } else {
      res.status(400).json({error : "Dados invalidos"})
    }
  } catch (error) {
    res.status(400).json({error : "Dados invalidos"})
  }
  
}
export const oneResponse = async(req: Request, res: Response) => {
  const { id } = req.params
  try {
    schemaIds.parse({ id });
    const comment = await CommentService.findOneResponseComment(id)
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
  const commentOne = await CommentService.findOne(id)

  try {
    schemaCommentUser.parse({ comment, idUser, id });
    if(req.user ) {
      const user = req.user as User
      if(user.id  === idUser) {
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
      } else {
        res.status(500).json({error : "Dados invalidos"})
      }
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
  } catch (error) {
    // Se cair aqui, é porque os dados são inválidos
    res.status(400).json({error : "Dados invalidos"})
  }
}
export const updateDel = async(req: Request, res: Response) => {
  const { id } = req.params
  const {  idUser } = req.body

  try {
    schemaIds.parse({ id, idUser });
    const commentOne = await CommentService.findOne(id)
  
  if(req.user ) {
    const user = req.user as User
    if(user.id  === idUser) {
      if(commentOne ) {
        const commentUpdateDel = await CommentService.updateDel(commentOne.id, {
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
  } catch(error) {
    res.status(400).json({error : "Dados invalidos"})
  }
}

export const updateDelResponse = async(req: Request, res: Response) => {
  const { id } = req.params
  const {  idUser } = req.body

  try {
    schemaIds.parse({ id, idUser });
    const commentOne = await CommentService.findOneResponseComment(id)
  
  if(req.user ) {
    const user = req.user as User
    if(user.id  === idUser) {
      if(commentOne ) {
        const commentUpdateDel = await CommentService.updateDelResponse(commentOne.id, {
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
    res.status(500).json({error : "Dados invalidos"})
  }
  } catch (error) {
    console.error('ID inválido:', error);
  }
}
export const updateResponse = async(req: Request, res: Response) => {
  const { id } = req.params
  const { comment, idUser } = req.body
  const commentOne = await CommentService.findOneResponseComment(id)

  try {
    schemaCommentUser.parse({ comment, id });
    // Se chegou aqui, é porque os dados são válidos
    // Então você pode continuar com a lógica do seu controller
    if(req.user ) {
      const user = req.user as User
      if(user.id  === idUser) {
        if(commentOne && comment) {
          const commentUpdate = await CommentService.updateResponseComment(commentOne.id, {
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
      res.status(500).json({error : "Dados invalidos"})
    }
  } catch (error) {
    // Se cair aqui, é porque os dados são inválidos
    res.status(400).json({error : "Dados invalidos"})
  }
}
export const deleteCommentPost = async(req: Request, res: Response) => {
  const { id } = req.params
  try {
    schemaIds.parse({ id });
    const commentPost = await CommentService.deleteCommentPost(id)
    if(commentPost) {
      res.json({ success: true})
    } else {
        res.status(500).json({error : "Dados invalidos"})
    }
  } catch (error) {
    res.status(500).json({error : "Dados invalidos"})
  }
}