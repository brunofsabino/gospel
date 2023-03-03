import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
type PropCreate = {
  post_id: string,
  comment_id: string,
}
type UpdateCreate = {
  post_id: string,
  comment_id: string,
}
export const LikeInCommentService = {
  create: async(id: string, data: PropCreate) => {
    const newLikeInCommentPost =  await prisma.likeInComment.create({
      data: {
          user_id: id,
          post_id: data.post_id,
          comment_id: data.comment_id
      }
    })
    return newLikeInCommentPost
  },
  findAll: async() => {
    return await prisma.likeInComment.findMany({})
  },
  findOne: async(id: string) => {
    return await prisma.likeInComment.findUnique({ where: { id }})
  },
  // update: async(id: string, data: UpdateCreate) => {
  //   return await prisma.commentInPost.update({
  //       where: { id },
  //       data : {
  //         comment: data.comment,
  //         id_comment: data.idComment
  //       }
  //   })
  // },
  // deleteCommentPost: async(id: string) => {
  //   return await prisma.commentInPost.delete({ where: { id }})
  // }
}