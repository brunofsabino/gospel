import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
type PropCreate = {
  content: string,
  contentPreComment: string,
  title: string,
  img?: string,
  video?: string,
  userADMId: string,
}
type PropUpdate = {
  content?: string,
  contentPreComment?: string,
  title?: string,
  img?: string,
  video?: string,
}
export const PostService = {
  create: async(data: PropCreate) => {
    const dataNewPost =  await prisma.post.create({
      data: {
          userADMId: data.userADMId,
          title: data.title,
          content: data.content,
          contentPreComment: data.contentPreComment,
          img: data.img ?? null,
          video: data.video ?? null
      }
    })
    return dataNewPost
  },
  findAll: async() => {
    return await prisma.post.findMany({})
  },
  findOne: async(id: string) => {
    return await prisma.post.findUnique({ where: { id }})
  },
  update: async(id: string, data: PropUpdate) => {
    return await prisma.post.update({
        where: { id },
        data : {
          title: data.title,
          content: data.content,
          contentPreComment: data.contentPreComment,
          img: data.img,
          video: data.video
        }
    })
  },
  deletePost: async(id: string) => {
    return await prisma.post.delete({ where: { id }})
  }
}