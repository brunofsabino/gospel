import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
type PropCreate = {
  idComment?: string,
  postId: string,
  comment: string,
  nameUserInComment: string,
  imgUserInComment: string
}
type PropCreateResponse = {
  post_id: string, 
  id_comment: string,
  nameUser: string,
  imgUser: string,
  userNameCommentReply: string,
  userAvatarCommentReply: string,
  dateCommentReply: Date,
  comment_response: string,
  userCommentReply: string
}
type UpdateCreate = {
  comment: string
}
type DeleteProp = {
  commentShow: boolean
}
type UpdateShowLike = {
  likeShow: boolean
}
export const CommentService = {
  create: async(id: string, data: PropCreate) => {
    const newCommentPost =  await prisma.commentInPost.create({
      data: {
          user_id: id,
          post_id: data.postId,
          comment: data.comment,
          nameUserInComment: data.nameUserInComment,
          imgUserInComment: data.imgUserInComment ?? ''
      }
    })
    return newCommentPost
  },
  createResponseComment: async(id: string, data: PropCreateResponse) =>{
    const newResponseCommentPost =  await prisma.responseComment.create({
      data: {
          user_id: id,
          post_id: data.post_id, 
          id_comment: data.id_comment,
          nameUser: data.nameUser,
          imgUser: data.imgUser,
          userNameCommentReply: data.userNameCommentReply,
          userAvatarCommentReply: data.userAvatarCommentReply,
          dateCommentReply: data.dateCommentReply,
          comment_response : data.comment_response,
          userCommentReply: data.userCommentReply
      }
    })
    return newResponseCommentPost
  },
  findAll: async() => {
    return await prisma.commentInPost.findMany({})
  },
  findAllPost: async(id: string) => {
    return await prisma.commentInPost.findMany({ where: { post_id: id}, orderBy: {
      date: 'desc',
    }})
  },
  findAllResponseComments: async(id: string) => {
    return await prisma.responseComment.findMany({ where: { post_id: id}})
  },
  findOne: async(id: string) => {
    return await prisma.commentInPost.findUnique({ where: { id }})
  },
  findOneResponseComment: async(id: string) => {
    return await prisma.responseComment.findUnique({ where: { id }})
  },
  update: async(id: string, data: UpdateCreate) => {
    return await prisma.commentInPost.update({
        where: { id },
        data : {
          comment: data.comment
        }
    })
  },
  updateDel: async(id: string, data: DeleteProp) => {
    return await prisma.commentInPost.update({
        where: { id },
        data : {
          commentShow: data.commentShow
        }
    })
  },
  updateDelResponse: async(id: string, data: DeleteProp) => {
    return await prisma.responseComment.update({
        where: { id },
        data : {
          commentShow: data.commentShow
        }
    })
  },
  updateResponseComment: async(id: string, data: UpdateCreate) => {
    return await prisma.responseComment.update({
        where: { id },
        data : {
          comment_response: data.comment
        }
    })
  },
  updateShowLikesTrue: async(id: string) => {
    let comment = await prisma.commentInPost.findUnique({ where: {id}})
    if(comment) {
      const qt = await prisma.commentInPost.update({
        where: {  id },
        data : {
          likeShow: true
        }
      })
      return true
    }
  },
  updateShowLikesFalse: async(id: string) => {
    let comment = await prisma.commentInPost.findUnique({ where: {id}})
    if(comment) {
      const qt = await prisma.commentInPost.update({
        where: {  id },
        data : {
          likeShow: false
        }
      })
      return true
    }
  },
  updateQtLikes: async(id: string) => {
    let comment = await prisma.commentInPost.findUnique({ where: {id}})
    if(comment) {
      console.log('chegou aqui')
      const qt = await prisma.commentInPost.update({
        where: {  id },
        data : {
          qtLikes: comment.qtLikes ? ++comment.qtLikes : 1
        }
      })
      return true
    }
  },
  updateQtResponseLikes: async(id: string) => {
    let comment = await prisma.responseComment.findUnique({ where: {id}})
    if(comment) {
      const qt = await prisma.responseComment.update({
        where: {  id },
        data : {
          qtLikes: comment.qtLikes ? ++comment.qtLikes : 1
        }
      })
      return true
    }
  },
  updateRemoveQtLikes: async(id: string) => {
    let comment = await prisma.commentInPost.findUnique({ where: {id}})
    console.log(comment)
    if(comment) {
      const qt = await prisma.commentInPost.update({
        where: {  id },
        data : {
          qtLikes: comment.qtLikes ? --comment.qtLikes : 0
        }
      })
      return true
    }
  },
  updateRemoveResponseQtLikes: async(id: string) => {
    let comment = await prisma.responseComment.findUnique({ where: {id}})
    console.log(comment)
    if(comment) {
      const qt = await prisma.responseComment.update({
        where: {  id },
        data : {
          qtLikes: comment.qtLikes ? --comment.qtLikes : 0
        }
      })
      return true
    }
  },
  deleteCommentPost: async(id: string) => {
    return await prisma.commentInPost.delete({ where: { id }})
  },
  qtComment: async(id: string) => {
    let comments = await prisma.commentInPost.findMany({ where: { post_id : id }})
    if(comments) {
      return comments.length
    }
  }
}