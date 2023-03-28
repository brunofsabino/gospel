import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
type PropCreate = {
  forum_id  : string,   
  commentInForum_id: string,
  done?: boolean
}
type PropCreate2 = {
  post_id: string,
  comment_id: string,
  done?: boolean
  nameUser: string,
  imgUser: string,
  userNameCommentReply: string,
  userAvatarCommentReply: string,
  userCommentReply?: string,
  dateCommentReply: Date,
  qtLikes?: number | null,
  comment_response: string
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
  createResponse: async(id: string, data: PropCreate2) => {
    const newLikeInCommentResponsePost =  await prisma.likeInResponseCommentForum.create({
      data: {
          user_id: id,
          forum_id: data.post_id,
          commentForum_id: data.comment_id,
          done: !data.done
      }
    })
    return newLikeInCommentResponsePost
  },
  findAll: async() => {
    return await prisma.likeInForum.findMany({})
  },
  findAllLikeForum: async(id: string) => {
    return await prisma.likeInForum.findMany({ where: { id: id}})
  },
  findAllLikeComment: async(id: string) => {
    return await prisma.likeInForum.findMany({ where: { forum_id: id, done: true}})
  },
  findAllLikeResponseComment: async(id: string) => {
    return await prisma.likeInForum.findMany({ where: { forum_id: id, done: true}})
  },
  findOneByResponseCommentId: async( comment_id: string, user_id: string) => {
    return await prisma.likeInForum.findFirst({ where: { commentInForum_id: comment_id, user_id }})
  },
  findOne: async(id: string) => {
    return await prisma.likeInForum.findUnique({ where: { id }})
  },
  findOneByCommentId: async( commentInForum_id: string) => {
    return await prisma.likeInForum.findFirst({ where: { commentInForum_id }})
  },
  update: async(id: string, data: UpdateCreate) => {
    return await prisma.likeInForum.update({
        where: { id },
        data : {
          done: data.done
        }
    })
  },
  updateResponseComment: async(id: string, data: UpdateCreate) => {
    let aaa = await prisma.likeInResponseCommentForum.update({
        where: { id },
        data : {
          done: data.done,
          //likeShow: data.likeShow,
        }
    })
    if(aaa) {
      return await prisma.likeInResponseCommentForum.findFirst({ where: { id }})
    } 
  },
  deleteLikeCommentForum: async(id: string) => {
    return await prisma.likeInForum.delete({ where: { id }})
  }
}