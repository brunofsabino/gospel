import { Post, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
type PropCreate = {
  idComment?: string,
  postId: string,
  comment: string,
  nameUserInComment: string,
  imgUserInComment?: string,
  nickName?: string
}
type PropCreateResponse = {
  post_id: string, 
  id_comment: string,
  nameUser: string,
  imgUser: string,
  userNameCommentReply: string,
  userAvatarCommentReply: string,
  dateCommentReply: Date,
  comment_response: string,
  userCommentReply: string,
  nickName?: string
}
type UpdateCreate = {
  comment: string
}
type UpdateAvatar = {
  imgUserInComment?: string
}
type UpdateName = {
  nameUserInComment?: string,
  nameUser?: string,
  nickName?: string
}
type DeleteProp = {
  commentShow: boolean
}
type UpdateShowLike = {
  likeShow: boolean
}
export const CommentService = {
  create: async(id: string, data: PropCreate) => {
    const newCommentPost =  await prisma.commentInPost.create({
      data: {
          user_id: id,
          post_id: data.postId,
          comment: data.comment,
          nameUserInComment: data.nameUserInComment,
          imgUserInComment: data.imgUserInComment ?? '',
          nickName: data.nickName 
      }
    })
    return newCommentPost
  },
  createResponseComment: async(id: string, data: PropCreateResponse) =>{
    const newResponseCommentPost =  await prisma.responseComment.create({
      data: {
          user_id: id,
          post_id: data.post_id, 
          id_comment: data.id_comment,
          nameUser: data.nameUser,
          imgUser: data.imgUser,
          userNameCommentReply: data.userNameCommentReply,
          userAvatarCommentReply: data.userAvatarCommentReply,
          dateCommentReply: data.dateCommentReply,
          comment_response : data.comment_response,
          userCommentReply: data.userCommentReply,
          nickName: data.nickName
      }
    })
    return newResponseCommentPost
  },
  findAll: async() => {
    return await prisma.commentInPost.findMany({})
  },
  findAllPost: async(id: string) => {
    return await prisma.commentInPost.findMany({ where: { post_id: id}, orderBy: {
      date: 'desc',
    }})
  },
  findAllCommentsInPosts: async(id: string) => {
    const postComments =  await prisma.commentInPost.findMany({ where: { user_id: id}, orderBy: { date: 'desc', }})
    const postCommentsResponse =  await prisma.responseComment.findMany({ where: { user_id: id}, orderBy: { date: 'desc', }})
    if(postComments){
      let post: Post[] = []
      for await (const item of postComments) {
        const item2 = await prisma.post.findMany({ where: { id: item.post_id } });
        post.push(item2[0]); 
      }
      const result = post.map((p) => ({
        id: p.id,
        title: p.title,
        qtComments: p.qtComments,
        img: p.img,
        comments: postComments.filter((c) => c.post_id === p.id).map((c) => c.comment),
        responseComments: postCommentsResponse.filter((c) => c.post_id === p.id).map((c) => c.comment_response),
      }))
      return result
    }
  },
  findAllResponseComments: async(id: string) => {
    return await prisma.responseComment.findMany({ where: { post_id: id}, orderBy: { date: 'desc'}})
  },
  findOne: async(id: string) => {
    return await prisma.commentInPost.findUnique({ where: { id }})
  },
  findOneResponseComment: async(id: string) => {
    return await prisma.responseComment.findUnique({ where: { id }})
  },
  update: async(id: string, data: UpdateCreate) => {
    return await prisma.commentInPost.update({
        where: { id },
        data : {
          comment: data.comment
        }
    })
  },
  updateDel: async(id: string, data: DeleteProp) => {
    return await prisma.commentInPost.update({
        where: { id },
        data : {
          commentShow: data.commentShow
        }
    })
  },
  updateDelResponse: async(id: string, data: DeleteProp) => {
    return await prisma.responseComment.update({
        where: { id },
        data : {
          commentShow: data.commentShow
        }
    })
  },
  updateResponseComment: async(id: string, data: UpdateCreate) => {
    return await prisma.responseComment.update({
        where: { id },
        data : {
          comment_response: data.comment
        }
    })
  },
  updateShowLikesTrue: async(id: string) => {
    let comment = await prisma.commentInPost.findUnique({ where: {id}})
    if(comment) {
      const qt = await prisma.commentInPost.update({
        where: {  id },
        data : {
          likeShow: true
        }
      })
      return true
    }
  },
  updateShowLikesFalse: async(id: string) => {
    let comment = await prisma.commentInPost.findUnique({ where: {id}})
    if(comment) {
      const qt = await prisma.commentInPost.update({
        where: {  id },
        data : {
          likeShow: false
        }
      })
      return true
    }
  },
  updateQtLikes: async(id: string) => {
    let comment = await prisma.commentInPost.findUnique({ where: {id}})
    if(comment) {
      console.log('chegou aqui')
      const qt = await prisma.commentInPost.update({
        where: {  id },
        data : {
          qtLikes: comment.qtLikes ? ++comment.qtLikes : 1
        }
      })
      return true
    }
  },
  updateQtResponseLikes: async(id: string) => {
    let comment = await prisma.responseComment.findUnique({ where: {id}})
    if(comment) {
      const qt = await prisma.responseComment.update({
        where: {  id },
        data : {
          qtLikes: comment.qtLikes ? ++comment.qtLikes : 1
        }
      })
      return true
    }
  },
  updateRemoveQtLikes: async(id: string) => {
    let comment = await prisma.commentInPost.findUnique({ where: {id}})
    console.log(comment)
    if(comment) {
      const qt = await prisma.commentInPost.update({
        where: {  id },
        data : {
          qtLikes: comment.qtLikes ? --comment.qtLikes : 0
        }
      })
      return true
    }
  },
  updateRemoveResponseQtLikes: async(id: string) => {
    let comment = await prisma.responseComment.findUnique({ where: {id}})
    console.log(comment)
    if(comment) {
      const qt = await prisma.responseComment.update({
        where: {  id },
        data : {
          qtLikes: comment.qtLikes ? --comment.qtLikes : 0
        }
      })
      return true
    }
  },
  updateAvatar: async(id: string, data: UpdateAvatar) => {
    let comment = await prisma.commentInPost.findMany({ where: {user_id: id}})
    console.log('updateAvatar')
    console.log(comment)
    if(comment) {
      const qt = await prisma.commentInPost.updateMany({
        where: {  user_id: id },
        data : {
          imgUserInComment: data.imgUserInComment 
        }
      })
      return true
    }
  },
  updateAvatarResponse: async(id: string, data: UpdateAvatar) => {
    let comment = await prisma.responseComment.findMany({ where: {user_id :id}})
    if(comment) {
      const qt = await prisma.responseComment.updateMany({
        where: {  user_id: id },
        data : {
          imgUser: data.imgUserInComment 
        }
      })
      return true
    }
  },
  updateName: async(id: string, data: UpdateName) => {
    let comment = await prisma.commentInPost.findMany({ where: {user_id: id}})
    console.log(comment)
    if(comment) {
      const qt = await prisma.commentInPost.updateMany({
        where: {  user_id: id },
        data : {
          nameUserInComment: data.nameUserInComment,
          nickName: data.nickName ?? undefined
        }
      })
      return true
    }
  },
  updateNameResponse: async(id: string, data: UpdateName) => {
    let comment = await prisma.responseComment.findMany({ where: {user_id :id}})
    if(comment) {
      const qt = await prisma.responseComment.updateMany({
        where: {  user_id: id },
        data : {
          nameUser: data.nameUser ?? undefined,
          nickName: data.nickName ?? undefined
        }
      })
      return true
    }
  },
  deleteCommentPost: async(id: string) => {
    return await prisma.commentInPost.delete({ where: { id }})
  },
  qtComment: async(id: string) => {
    let comments = await prisma.commentInPost.findMany({ where: { post_id : id }})
    if(comments) {
      return comments.length
    }
  }
}