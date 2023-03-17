import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
type PropCreate = {
  post_id: string,
  comment_id: string,
  done?: boolean
}
type UpdateCreate = {
  done: boolean
}
export const LikeInCommentService = {
  create: async(id: string, data: PropCreate) => {
    const newLikeInCommentPost =  await prisma.likeInComment.create({
      data: {
          user_id: id,
          post_id: data.post_id,
          comment_id: data.comment_id,
          done: !data.done
      }
    })
    return newLikeInCommentPost
  },
  createResponse: async(id: string, data: PropCreate) => {
    const newLikeInCommentResponsePost =  await prisma.likeInResponseComment.create({
      data: {
          user_id: id,
          post_id: data.post_id,
          comment_id: data.comment_id,
          done: !data.done
      }
    })
    return newLikeInCommentResponsePost
  },
  findAll: async() => {
    return await prisma.likeInComment.findMany({})
  },
  findAllLikeComment: async(id: string) => {
    return await prisma.likeInComment.findMany({ where: { post_id: id}})
  },
  findOne: async(id: string) => {
    return await prisma.likeInComment.findUnique({ where: { id }})
  },
  findOneByCommentId: async( comment_id: string) => {
    return await prisma.likeInComment.findUnique({ where: { comment_id }})
  },
  update: async(id: string, data: UpdateCreate) => {
    let aaa = await prisma.likeInComment.update({
        where: { id },
        data : {
          done: data.done
        }
    })
    if(aaa) {
      return await prisma.likeInComment.findFirst({ where: { id }})
    } 
  },
  deleteLikeCommentPost: async(id: string) => {
    return await prisma.likeInComment.delete({ where: { id }})
  }
}