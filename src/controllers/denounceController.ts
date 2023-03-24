import { Request, Response } from "express";
import { DenounceService } from "../services/DenounceService";
import { UserService } from "../services/UserService";
import { PostService } from "../services/PostService";
import { CommentService } from "../services/CommentService";
import { CommentForumService } from "../services/CommentForumService";
import { ForumService } from "../services/ForumService";


export const create = async(req: Request, res: Response) => {
  const { idUser, idComment, idCommentReponse, describingDenounce, idPost, idForum,idCommentForum, userDenounced_id } = req.body

  const user = await UserService.findOne(idUser)
  const comment = await CommentService.findOne(idComment)
  if(idCommentReponse){
    const commentResponse = await CommentService.findOneResponseComment(idCommentReponse)
  }
  if(idPost){
    const post = await PostService.findOne(idPost)
  }
  if(idForum) {
    const forum = await ForumService.findOne(idForum)
  }
  if(idCommentForum) {
    const commentForum = await CommentForumService.findOne(idCommentForum)
  }
  //const commentResponseForuum = await CommentForumService.findOne(idCommentForum)

  if(user){
    const nameUser = user.name
    const denounce = await DenounceService.create(user.id, {
      nameUser,
      userDenounced_id: userDenounced_id ?? undefined,
      describingDenounce: describingDenounce ?? undefined,
      post_id: idPost ? idPost : undefined,
      id_comment: comment ? comment.id : undefined,
      //id_response_comment: commentResponse ? commentResponse.id : undefined,
      id_forum: idForum ? idForum : undefined,
      id_forum_comment: idCommentForum ? idCommentForum : undefined
      //id_forum_comment_response: commentResponseForuum ? commentResponseForuum.id : null
    })
    if(denounce) {
      res.status(200).json({denounce})
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
  } else {
    res.status(500).json({error : "Dados invalidos"})
}
  // user_id                   String
  // nameUser                  String
  // userDenounced_id          String
  // nameUserDenounced         String
  // textDenounce              String?
  // describingDenounce        String?
  // post_id                   String?
  // id_comment                String?
  // id_response_comment       String?
  // id_forum                  String?
  // id_forum_comment          String?
  // id_forum_comment_response String?

}