import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
type PropCreate = {
  forum_id  : string,   
  commentInForum_id: string,
  done?: boolean
}
type UpdateCreate = {
  done: boolean
}
export const LikeInCommentForumService = {
  create: async(id: string, data: PropCreate) => {
    const newLikeInCommentPost =  await prisma.likeInForum.create({
      data: {
          user_id: id,
          forum_id: data.forum_id, 
          commentInForum_id: data.commentInForum_id,
          done: !data.done
      }
    })
    return newLikeInCommentPost
  },
  findAll: async() => {
    return await prisma.likeInForum.findMany({})
  },
  findAllLikeForum: async(id: string) => {
    return await prisma.likeInForum.findMany({ where: { id: id}})
  },
  findOne: async(id: string) => {
    return await prisma.likeInForum.findUnique({ where: { id }})
  },
  findOneByCommentId: async( commentInForum_id: string) => {
    return await prisma.likeInForum.findUnique({ where: { commentInForum_id }})
  },
  update: async(id: string, data: UpdateCreate) => {
    return await prisma.likeInForum.update({
        where: { id },
        data : {
          done: data.done
        }
    })
  },
  deleteLikeCommentForum: async(id: string) => {
    return await prisma.likeInForum.delete({ where: { id }})
  }
}