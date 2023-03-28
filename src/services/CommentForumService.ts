import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
type PropCreate = {
  id_comment_forum?: string,
  forumId: string,
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
  comment: string,
  id_comment_forum?: string,
}
type DeleteProp = {
  commentShow: boolean
}
export const CommentForumService = {
  create: async(id: string, data: PropCreate) => {
    const newCommentPost =  await prisma.commentInForum.create({
      data: {
        id_comment_forum: data.id_comment_forum,
        forum_id: data.forumId,
        user_id: id,
        comment: data.comment,
        nameUserInComment: data.nameUserInComment,
        imgUserInComment: data.imgUserInComment
      }
    })
    return newCommentPost
  },
  createResponseComment: async(id: string, data: PropCreateResponse) =>{
    const newResponseCommentPost =  await prisma.responseCommentInForum.create({
      data: {
          user_id: id,
          forum_id: data.post_id, 
          id_commentForum: data.id_comment,
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
    return await prisma.commentInForum.findMany({})
  },
  findOne: async(id: string) => {
    return await prisma.commentInForum.findFirst({ where: { id }})
  },
  findAllPost: async(id: string) => {
    return await prisma.commentInForum.findMany({ where: { forum_id: id}, orderBy: {
      date: 'desc',
    }})
  },
  findOneResponseComment: async(id: string) => {
    return await prisma.commentInForum.findUnique({ where: { id }})
  },
  findAllResponseComments: async(id: string) => {
    return await prisma.commentInForum.findMany({ where: { forum_id: id}})
  },
  update: async(id: string, data: UpdateCreate) => {
    return await prisma.commentInForum.update({
        where: { id },
        data : {
          comment: data.comment,
          id_comment_forum: data.id_comment_forum
        }
    })
  },
  updateResponseComment: async(id: string, data: UpdateCreate) => {
    return await prisma.responseCommentInForum.update({
        where: { id },
        data : {
          comment_response: data.comment
        }
    })
  },
  updateQtResponseLikes: async(id: string) => {
    let comment = await prisma.responseCommentInForum.findUnique({ where: {id}})
    if(comment) {
      const qt = await prisma.responseCommentInForum.update({
        where: {  id },
        data : {
          qtLikes: comment.qtLikes ? ++comment.qtLikes : 1
        }
      })
      return true
    }
  },
  updateRemoveResponseQtLikes: async(id: string) => {
    let comment = await prisma.responseCommentInForum.findUnique({ where: {id}})
    console.log(comment)
    if(comment) {
      const qt = await prisma.responseCommentInForum.update({
        where: {  id },
        data : {
          qtLikes: comment.qtLikes ? --comment.qtLikes : 0
        }
      })
      return true
    }
  },
  updateQtLikes: async(id: string) => {
    let comment = await prisma.commentInForum.findFirst({ where: {id}})
    if(comment) {
      console.log('chegou aqui')
      const qt = await prisma.commentInForum.update({
        where: {  id },
        data : {
          qtLikes: comment.qtLikes ? ++comment.qtLikes : 1
        }
      })
      return true
    }
  },
  updateRemoveQtLikes: async(id: string) => {
    let comment = await prisma.commentInForum.findFirst({ where: {id}})
    console.log(comment)
    if(comment) {
      const qt = await prisma.commentInForum.update({
        where: {  id },
        data : {
          qtLikes: comment.qtLikes ? --comment.qtLikes : 0
        }
      })
      return true
    }
  },
  updateDel: async(id: string, data: DeleteProp) => {
    return await prisma.commentInForum.update({
        where: { id },
        data : {
          commentShow: data.commentShow
        }
    })
  },
  updateDelResponse: async(id: string, data: DeleteProp) => {
    return await prisma.responseCommentInForum.update({
        where: { id },
        data : {
          commentShow: data.commentShow
        }
    })
  },
  deleteCommentForum: async(id: string) => {
    return await prisma.commentInForum.delete({ where: { id }})
  }
}