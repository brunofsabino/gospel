import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
type PropCreate = {
  idComment?: string,
  postId: string,
  comment: string,
  nameUserInComment: string,
  imgUserInComment: string
}
type UpdateCreate = {
  comment: string
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
  findAll: async() => {
    return await prisma.commentInPost.findMany({})
  },
  findAllPost: async(id: string) => {
    return await prisma.commentInPost.findMany({ where: { post_id: id}})
  },
  findOne: async(id: string) => {
    return await prisma.commentInPost.findUnique({ where: { id }})
  },
  update: async(id: string, data: UpdateCreate) => {
    return await prisma.commentInPost.update({
        where: { id },
        data : {
          comment: data.comment
        }
    })
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