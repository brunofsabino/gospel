import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
type PropCreate = {
  id_comment_forum?: string,
  forumId: string,
  comment: string
}
type UpdateCreate = {
  comment: string,
  id_comment_forum?: string,
}
export const CommentForumService = {
  create: async(id: string, data: PropCreate) => {
    const newCommentPost =  await prisma.commentInForum.create({
      data: {
        id_comment_forum: data.id_comment_forum,
        forum_id: data.forumId,
        user_id: id,
        comment: data.comment
      }
    })
    return newCommentPost
  },
  findAll: async() => {
    return await prisma.commentInForum.findMany({})
  },
  findOne: async(id: string) => {
    return await prisma.commentInForum.findUnique({ where: { id }})
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
  deleteCommentForum: async(id: string) => {
    return await prisma.commentInForum.delete({ where: { id }})
  }
}