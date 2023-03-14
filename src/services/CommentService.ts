import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
type PropCreate = {
  idComment?: string,
  postId: string,
  comment: string
}
type UpdateCreate = {
  comment: string,
  idComment?: string,
}
export const CommentService = {
  create: async(id: string, data: PropCreate) => {
    const newCommentPost =  await prisma.commentInPost.create({
      data: {
          user_id: id,
          post_id: data.postId,
          comment: data.comment,
          id_comment: data.idComment
      }
    })
    return newCommentPost
  },
  findAll: async() => {
    return await prisma.commentInPost.findMany({})
  },
  findOne: async(id: string) => {
    return await prisma.commentInPost.findUnique({ where: { id }})
  },
  update: async(id: string, data: UpdateCreate) => {
    return await prisma.commentInPost.update({
        where: { id },
        data : {
          comment: data.comment,
          id_comment: data.idComment
        }
    })
  },
  deleteCommentPost: async(id: string) => {
    return await prisma.commentInPost.delete({ where: { id }})
  },
  qtComment: async(id: string) => {
    return await prisma.commentInPost.findMany({ where: { id }})
  }
}