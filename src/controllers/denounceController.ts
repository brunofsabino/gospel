import { Request, Response } from "express";
import { DenounceService } from "../services/DenounceService";
import { UserService } from "../services/UserService";
import { PostService } from "../services/PostService";
import { CommentService } from "../services/CommentService";
import { CommentForumService } from "../services/CommentForumService";
import { ForumService } from "../services/ForumService";


export const createDenounceComment = async(req: Request, res: Response) => {
  const { idUser, idComment, idCommentReponse, describingDenounce, idPost, idForum,idCommentForum, userDenounced_id } = req.body

  const user = await UserService.findOne(idUser)
  const comment = await CommentService.findOne(idComment)
  const post = await PostService.findOne(idPost)

  if(user && post ){
    const nameUser = user.name
    const denounce = await DenounceService.create(user.id, {
      nameUser,
      userDenounced_id: userDenounced_id ?? undefined,
      describingDenounce: describingDenounce ?? undefined,
      post_id:  post.id ?? null,
      id_comment: comment ? comment.id : idComment
    })
    if(denounce) {
      res.status(200).json({denounce})
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
  } else {
    res.status(500).json({error : "Dados invalidos"})
  }
}

export const createDenounceInForumComment = async(req: Request, res: Response) => {
  const { idUser, idComment, idCommentReponse, describingDenounce, idPost, idForum,idCommentForum, userDenounced_id } = req.body

  const user = await UserService.findOne(idUser)
  const comment = await CommentService.findOne(idComment)
  const post = await ForumService.findOne(idPost)

  if(user && post ){
    const nameUser = user.name
    const denounce = await DenounceService.createInForum(user.id, {
      nameUser,
      userDenounced_id: userDenounced_id ?? undefined,
      describingDenounce: describingDenounce ?? undefined,
      forum_id:  post.id ?? null,
      id_comment: comment ? comment.id : idComment
    })
    if(denounce) {
      res.status(200).json({denounce})
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
  } else {
    res.status(500).json({error : "Dados invalidos"})
  }
}
export const all = async(req: Request, res: Response) => {
  const { id } = req.params
  const userADM = await UserService.findADM(id)
    if(userADM) {
      const all = await DenounceService.findAll()
      res.status(200).json({denounce: all})
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
}
export const allInForum = async(req: Request, res: Response) => {
  const { id } = req.params
  const userADM = await UserService.findADM(id)
    if(userADM) {
      const all = await DenounceService.findAllInForum()
      res.status(200).json({denounce: all})
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
}