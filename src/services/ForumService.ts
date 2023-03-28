import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
type PropCreate = {
  userLogged: string, 
  title: string,
  description: string,
  avatar_user?: string,
  name_user?: string
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
        description: data.description,
        avatar_user: data.avatar_user ?? undefined,
        name_user: data.name_user ?? undefined
      }
    })
    return dataNewForum
  },
  findAll: async() => {
    return await prisma.forum.findMany({})
  },
  findOne: async(id: string) => {
    return await prisma.forum.findFirst({ where: { id }})
  },
  findOneByTitle: async(title: string) => {
    return await prisma.forum.findFirst({ where: { title }})
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