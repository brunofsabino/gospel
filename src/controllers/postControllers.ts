import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { PostService } from "../services/PostService";
import sharp from 'sharp'
import { unlink } from 'fs/promises'
import path from 'path'


export const create = async(req: Request, res: Response) => {
  const { contentP1, contentP2, contentP3, contentP4, contentP5, contentP6, contentP7, contentPreComment, title, img, video, userADMId } = req.body
  
  if(req.file && contentP1 && contentPreComment &&  title && userADMId) {
    const filename500 = `${req.file.filename}.500.jpg`
    const filename80 = `${req.file.filename}.80.jpg`
    await sharp(req.file.path).resize(500).toFormat('jpg').toFile(`./public/media/${filename500}`)
    await sharp(req.file.path).resize(80).toFormat('jpg').toFile(`./public/media/${filename80}`)
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
        img: filename500 ?? null, 
        video: video ?? null 
      })
      if(newPost) {
        res.render('pages/site.ejs')
      }
    else {
      res.status(500).json({error : "Erro ao usuario logado"})
    }
    // res.json({image1: `${filename500}`, image2: `${filename80}` })
  } else {
    res.status(400).json({error: 'Arquivo invalido ou Dados invalidos'})
  }}
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
    const all = await PostService.findAll()
    res.render('pages/home.ejs', )
  }
export const one = async(req: Request, res: Response) => {
  const { id } = req.params
  const post = await PostService.findOne(id)
  if(post) {
      res.status(200).json({post })
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const update = async(req: Request, res: Response) => {
  const { id } = req.params
  const { contentP1, contentP2, contentP3, contentP4, contentP5, contentP6, contentP7, contentPreComment, title, img, video } = req.body
  const post = await PostService.findOne(id)
  if(post) {
      if(contentP1 || contentP2 || contentP3 || contentP4 || contentP5 || contentP6 || contentP7 || contentPreComment || title || img || video) {
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
            img: img ?? post.img, 
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
      res.status(500).json({error : "Dados invalidos"})
  }
}
export const deletePost = async(req: Request, res: Response) => {
  const { id } = req.params
  const post = await PostService.deletePost(id)
  if(post) {
     res.json({ success: true})
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}