import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
type PropCreate = {
  userLogged: string, 
  title: string,
  description: string,
  avatar_user?: string,
  name_user?: string
  qtComments?: number,
  nickName?: string
}
type PropUpdate = {
  title?: string,
  description?: string,
  avatar_user?: string,
  name_user?: string,
  nickName?: string
}
export const ForumService = {
  create: async(data: PropCreate) => {
    const dataNewForum =  await prisma.forum.create({
      data: {
        user_id: data.userLogged,
        title: data.title,
        description: data.description,
        avatar_user: data.avatar_user ?? undefined,
        name_user: data.name_user ?? undefined,
        qtComments: data.qtComments,
        nickName: data.nickName ?? undefined
      }
    })
    return dataNewForum
  },
  findAll: async() => {
    return await prisma.forum.findMany({ orderBy: { qtComments: 'desc'}})
  },
  findAllAside: async() => {
    return await prisma.forum.findMany({ orderBy: { qtComments: 'desc'}, take: 5})
  },
  findAllRecents: async() => {
    return await prisma.forum.findMany({orderBy: { date: 'desc'}})
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
  updateAvatar: async(id: string, data2: PropUpdate ) => {
    const count = await prisma.forum.updateMany({
      where: { user_id: id },
      data: { avatar_user: data2.avatar_user }
      })
      return true
  },
  updateName: async(id: string, data2: PropUpdate ) => {
    const count = await prisma.forum.updateMany({
      where: { user_id: id },
      data: { name_user: data2.name_user ?? undefined, nickName: data2.nickName ?? undefined}
      })
      return true
  },
  updateQtComments: async(id: string, nameUser: string) => {
    let forum = await prisma.forum.findUnique({ where: {id}})
    if(forum) {
      console.log('aqui')
      const qt = await prisma.forum.update({
        where: {  id },
        data : {
          qtComments: forum.qtComments ? ++forum.qtComments : 1,
          nameLastComment: nameUser
        }
      })
      return true
    }
  },
  
  deleteForum: async(id: string) => {
    return await prisma.forum.delete({ where: { id }})
  }
}