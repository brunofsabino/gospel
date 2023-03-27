import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
type PropCreate = {
  nameUser: string,                  
  userDenounced_id?: string, 
  nameUserDenounced?: string, 
  textDenounce?: string, 
  describingDenounce?: string, 
  post_id?: string, 
  id_comment?: string, 
  id_response_comment?: string, 
  id_forum?: string, 
  id_forum_comment?: string, 
  id_forum_comment_response?: string, 
}


export const DenounceService = {
  create: async(id: string, data: PropCreate) => {
    const denounce =  await prisma.denounce.create({
      data: {
          user_id: id,
          nameUser: data.nameUser,
          userDenounced_id: data.userDenounced_id ?? undefined,
          nameUserDenounced: data.nameUserDenounced ?? undefined,
          textDenounce: data.textDenounce ?? undefined,
          describingDenounce: data.describingDenounce ?? undefined,
          post_id: data.post_id ?? undefined,
          id_comment: data.id_comment ?? undefined,
          id_response_comment: data.id_response_comment ?? undefined,
          id_forum: data.id_forum ?? undefined,
          id_forum_comment: data.id_forum_comment ?? undefined,
          id_forum_comment_response: data.id_forum_comment_response ?? undefined,
          
      }
    })
    return denounce
  },
  findAll: async() => {
    return await prisma.denounce.findMany({})
  },
}