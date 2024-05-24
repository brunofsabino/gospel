import { z } from 'zod';

export const schemaCreateUser = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8),
});
export const schemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const schemaCommentUser = z.object({
  comment: z.string().min(1).max(1000),
  id: z.string().uuid().optional(),
  idUser: z.string().uuid().optional(),
  userId: z.string().uuid().optional(), 
  postId: z.string().uuid().optional(), 
});
export const schemaIds = z.object({
  id: z.string().uuid().optional(),
  idUser: z.string().uuid().optional(),
});
export const schemaEmail = z.object({
  email: z.string().email(),
});
export const schemaResponseCommentUser = z.object({
  comment: z.string().min(1).max(1000),
  comment2: z.string().min(1).max(1000).optional(),
  name2: z.string().min(3).max(50).optional(),
  userId: z.string().uuid().optional(),
  postId: z.string().uuid().optional(), 
  commentId: z.string().uuid().optional()
});
export const schemaUpdateUser = z.object({
  name: z.string().min(3).max(50).optional(),
  password: z.string().min(8).optional(),
  avatar: z.string().optional(),
  id: z.string().uuid()
});
export const schemaNameUser = z.object({
  name: z.string().min(3).max(50),
  id: z.string().uuid().optional()
});

export const schemaCommentForumUser = z.object({
  comment: z.string().min(1).max(1000),
  userId: z.string().uuid().optional(),
  forumId: z.string().uuid().optional(), 
  id_comment_forum: z.string().uuid().optional()
});

export const schemaResponseCommentForumUser = z.object({
  comment: z.string().min(1).max(1000),
  comment2: z.string().min(1).max(1000).optional(),
  name2: z.string().min(3).max(50).optional(),
  userId: z.string().uuid(),
  postId: z.string().uuid(),
  commentId: z.string().uuid(),
});

export const schemaUpdateForumUser = z.object({
  comment: z.string().min(1).max(1000).optional(),
  id: z.string().uuid().optional(),
  idUser: z.string().uuid().optional(),
});

export const schemaCreateDenounce = z.object({
  describingDenounce: z.string().min(1).max(1000).optional(),
  idComment: z.string().uuid().optional(),
  idCommentReponse: z.string().uuid().optional(),
  idUser: z.string().uuid().optional(),
  idPost: z.string().uuid().optional(),
  idForum: z.string().uuid().optional(),
  idCommentForum: z.string().uuid().optional(),
  userDenounced_id: z.string().uuid().optional(),
});
export const schemaCreateForum = z.object({
  title: z.string().min(1).max(200),
  user: z.string().uuid(),
  description: z.string().max(1000)
});

export const schemaFilterForum = z.object({
  filter: z.string().min(3).max(15),
});
export const schemaOneForum = z.object({
  title: z.string().min(3).max(150),
});
export const schemaUpdateForum = z.object({
  title: z.string().min(3).max(150),
  description: z.string().min(3).max(1000),
  id: z.string().uuid().optional(),
});
export const schemaCreateLike = z.object({
  userId: z.string().uuid().optional(),
  postId: z.string().uuid().optional(),
  commentId: z.string().uuid().optional(),
});
export const schemaToken = z.object({
  token: z.string(),
  input1: z.string().optional(),
  input2: z.string().optional(),
});
export const schemaCreatePost = z.object({
  contentP1: z.string(),
  contentP2: z.string().optional(),
  contentP3: z.string().optional(),
  contentP4: z.string().optional(),
  contentP5: z.string().optional(),
  contentP6: z.string().optional(),
  subTitleImg: z.string().optional(),
  contentP7: z.string().optional(),
  contentPreComment: z.string(),
  title: z.string().min(3).max(150),
  subTitle: z.string().min(2).max(30),
  summaryParagraph: z.string().min(2).max(300),
  img: z.string().optional(),
  video: z.string().optional(),
  userADMId: z.string().uuid()
});
export const schemaOnePost = z.object({
  idAdm: z.string().uuid(),
  id: z.string().uuid()
});

export const schemaOneNews = z.object({
  title: z.string().min(3).max(250),
  id: z.string().uuid().optional()
});
export const schemaUpdatePost = z.object({
  contentP1: z.string().optional(),
  contentP2: z.string().optional(),
  contentP3: z.string().optional(),
  contentP4: z.string().optional(),
  contentP5: z.string().optional(),
  contentP6: z.string().optional(),
  contentP7: z.string().optional(),
  subTitleImg: z.string().optional(),
  contentPreComment: z.string().optional(),
  title: z.string().min(3).max(150).optional(),
  subTitle: z.string().min(2).max(30).optional(),
  summaryParagraph: z.string().min(2).max(300).optional(),
  img: z.string().optional().optional(),
  video: z.string().optional().optional(),
  userADMId: z.string().uuid()
});