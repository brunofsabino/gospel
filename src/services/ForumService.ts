import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
type PropCreate = {
  userLogged: string, 
  title: string,
  description: string
}
type PropUpdate = {
  title?: string,
  description?: string
}
export const ForumService = {
  create: async(data: PropCreate) => {
    const dataNewForum =  await prisma.forum.create({
      data: {
        user_id: data.userLogged,
        title: data.title,
        description: data.description
      }
    })
    return dataNewForum
  },
  findAll: async() => {
    return await prisma.forum.findMany({})
  },
  findOne: async(id: string) => {
    return await prisma.forum.findUnique({ where: { id }})
  },
  update: async(id: string, data: PropUpdate) => {
    return await prisma.forum.update({
        where: { id },
        data : {
          title: data.title,
          description: data.description
        }
    })
  },
  deleteForum: async(id: string) => {
    return await prisma.forum.delete({ where: { id }})
  }
}