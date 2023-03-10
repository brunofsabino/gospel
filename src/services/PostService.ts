import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
type PropCreate = {
  contentP1: string,
  contentP2?: string,
  contentP3?: string,
  contentP4?: string,
  contentP5?: string,
  contentP6?: string,
  contentP7?: string,
  contentPreComment: string,
  title: string,
  img?: string,
  video?: string,
  userADMId: string,
}
type PropUpdate = {
  contentP1?: string,
  contentP2?: string,
  contentP3?: string,
  contentP4?: string,
  contentP5?: string,
  contentP6?: string,
  contentP7?: string,
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
          contentP1: data.contentP1,
          contentP2: data.contentP2 ?? null,
          contentP3: data.contentP3 ?? null,
          contentP4: data.contentP4 ?? null,
          contentP5: data.contentP5 ?? null,
          contentP6: data.contentP6 ?? null,
          contentP7: data.contentP7 ?? null,
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
          contentP1: data.contentP1,
          contentP2: data.contentP2,
          contentP3: data.contentP3,
          contentP4: data.contentP4,
          contentP5: data.contentP5,
          contentP6: data.contentP6,
          contentP7: data.contentP7,
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