import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { PostService } from "../services/PostService";
import sharp from 'sharp'
import { unlink } from 'fs/promises'
import path from 'path'
import { CommentService } from "../services/CommentService";
import { LikeInCommentService } from "../services/LikeInCommentService";


export const create = async(req: Request, res: Response) => {
  const { 
    contentP1, 
    contentP2, 
    contentP3, 
    contentP4, 
    contentP5, 
    contentP6, 
    contentP7, 
    contentPreComment, 
    title,
    subTitle, 
    summaryParagraph,
    img, 
    video, 
    userADMId 
  } = req.body
  
  if(req.file && contentP1 && contentPreComment &&  title && userADMId && subTitle && summaryParagraph) {
    const filename600 = `${req.file.filename}.600.jpg`
    const filename150 = `${req.file.filename}.150.jpg`
    await sharp(req.file.path).resize(500).toFormat('jpg').toFile(`./public/media/${filename600}`)
    await sharp(req.file.path).resize(150).toFormat('jpg').toFile(`./public/media/${filename150}`)
    await unlink(req.file.path)
    const userADM = await UserService.findADM(userADMId)
    
    if(userADM) {
      const newPost = await PostService.create({ 
        userADMId, 
        title, 
        contentP1, 
        contentP2: contentP2 ?? null, 
        contentP3: contentP3 ?? null, 
        contentP4: contentP4 ?? null, 
        contentP5: contentP5 ?? null, 
        contentP6: contentP6 ?? null, 
        contentP7: contentP7 ?? null, 
        contentPreComment, 
        summaryParagraph,
        subTitle,
        img: filename600 ?? null, 
        video: video ?? null 
      })
      if(newPost) {
        res.status(200).json({post: newPost})
      } else {
        res.status(500).json({error: 'Arquivo invalido ou Dados invalidos'})
      }
    } else {
      res.status(500).json({error : "Erro ao usuario logado"})
    }
  }
}
export const all = async(req: Request, res: Response) => {
  const { id } = req.params
  const userADM = await UserService.findADM(id)
    if(userADM) {
      const all = await PostService.findAll()
      res.status(200).json({posts: all})
    } else {
      res.status(500).json({error : "Dados invalidos"})
    }
}
export const home = async(req: Request, res: Response) => {
    const mainNews = await PostService.findMainNews()
    const slideShow = await PostService.findSlideShow()
    const newsShow = await PostService.findNewsShow()

  
    res.render('pages/home.ejs', {
      mainNews,
      slideShow,
      newsShow
    })
}
export const home2 = async(req: Request, res: Response) => {
  //console.log(req.cookies.token)
  if(req.cookies) {
    console.log(req.cookies.token)
  }
  const all = await PostService.findAll()
  res.render('pages/home.ejs', {
    all
  } )
}
export const one = async(req: Request, res: Response) => {
  const { idAdm, id } = req.params
  const post = await PostService.findOne(id)
  const adm = await UserService.findADM(idAdm)
  if(post && adm) {
      res.status(200).json({post })
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const oneNews = async(req: Request, res: Response) => {
  const { title } = req.params
  const { id } = req.body
  console.log(title)
  const newTitle = title.split('-').join(' ')
  const one = await PostService.findOneByTitle(newTitle)
  
  if(one) {
    const comments = await CommentService.findAllPost(one.id)
    //const updateLikesFalse = CommentService.updateShowLikesFalse(one.id)
    const responseComments = await CommentService.findAllResponseComments(one.id)
    const likes = await LikeInCommentService.findAllLikeComment(one.id)
    // if(id){
    //   likes.forEach(item => {
    //     if(item.user_id === id) {
    //       const updateLikes = CommentService.updateShowLikesTrue(item.comment_id)
    //     }
    //   })
    //   console.log(likes)
    // }
    
    console.log(comments)
    console.log(likes)
    if(comments) {
      res.render('pages/news', {
        news: one,
        comments,
        responseComments,
        likes
      })
    }
    
  } else {
    res.status(500).json({error: 'Post não localizado'})
  }
  
}
export const update = async(req: Request, res: Response) => {
  const { id } = req.params
  const { 
    contentP1, 
    contentP2, 
    contentP3, 
    contentP4, 
    contentP5, 
    contentP6, 
    contentP7, 
    contentPreComment, 
    title,
    subTitle, 
    img,
    summaryParagraph, 
    video, 
    userADMId 
  } = req.body
  let imgName = ''
  const post = await PostService.findOne(id)
  if(req.file) {
    const filename600 = `${req.file.filename}.600.jpg`
    const filename150 = `${req.file.filename}.150.jpg`
    await sharp(req.file.path).resize(500).toFormat('jpg').toFile(`./public/media/${filename600}`)
    await sharp(req.file.path).resize(150).toFormat('jpg').toFile(`./public/media/${filename150}`)
    await unlink(req.file.path)
    imgName = filename600
  }
  if(post) {
    const userADM = await UserService.findADM(userADMId)
    if(userADM) {
      if(contentP1 || contentP2 || contentP3 || contentP4 || contentP5 || contentP6 || contentP7 || contentPreComment || title || imgName || video || subTitle || summaryParagraph) {
          const postUpdate = await PostService.update(post.id, {
            title: title ?? post.title, 
            contentP1: contentP1 ?? post.contentP1, 
            contentP2: contentP2 ?? post.contentP2, 
            contentP3: contentP3 ?? post.contentP3, 
            contentP4: contentP4 ?? post.contentP4, 
            contentP5: contentP5 ?? post.contentP5, 
            contentP6: contentP6 ?? post.contentP6, 
            contentP7: contentP7 ?? post.contentP7, 
            contentPreComment: contentPreComment ?? post.contentPreComment, 
            subTitle: subTitle ?? post.subTitle, 
            summaryParagraph: summaryParagraph ?? post.summaryParagraph, 
            img: imgName ?? post.img, 
            video: video ?? post.video
          })
          if(postUpdate) {
              res.status(201).json({ postUpdate })
          } else {
              res.status(500).json({error : "Dados invalidos"})
          }
      } else {
          res.status(500).json({error : "Dados invalidos"})
      }
    } else {
      res.status(500).json({error : "usuario logado não localizado"})
    }
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const updateMainNews = async(req: Request, res: Response) => {
  const { id } = req.params
  const { idAdm } = req.body
  const userADM = await UserService.findADM(idAdm)
  const post = await PostService.findOne(id)
  if(userADM && post) {
    const mainNewshow = await PostService.updateShow(post.id, {
      mainNewsShow: !post.mainNewsShow
    })
    if(mainNewshow) {
      res.json({ post: mainNewshow})
    }
  }
}
export const updateSlide = async(req: Request, res: Response) => {
  const { id } = req.params
  const { idAdm } = req.body
  const userADM = await UserService.findADM(idAdm)
  const post = await PostService.findOne(id)
  if(userADM && post) {
    const slideShow = await PostService.updateShow(post.id, {
      slideShow: !post.slideShow
    })
    if(slideShow) {
      res.json({ post: slideShow})
    }
  }
}
export const updateNewsShow = async(req: Request, res: Response) => {
  const { id } = req.params
  const { idAdm } = req.body
  const userADM = await UserService.findADM(idAdm)
  const post = await PostService.findOne(id)
  if(userADM && post) {
    const Newshow = await PostService.updateShow(post.id, {
      newsShow: !post.newsShow
    })
    if(Newshow) {
      res.json({ post: Newshow})
    }
  }
}
export const deletePost = async(req: Request, res: Response) => {
  const { idAdm, id } = req.params
  const userADM = await UserService.findADM(idAdm)
  if(userADM) {
    console.log('aqui')
    const post = await PostService.deletePost(id)
    if(post) {
      res.json({ success: true})
    } else {
        res.status(500).json({error : "Dados invalidos"})
    }
  } else {
    res.status(500).json({error : "usuario logado não localizado"})
  }
}