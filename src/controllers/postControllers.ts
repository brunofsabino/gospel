import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { PostService } from "../services/PostService";
import fs from 'fs'
import path from 'path'


export const create = async(req: Request, res: Response) => {
  const { contentP1, contentP2, contentP3, contentP4, contentP5, contentP6, contentP7, contentPreComment, title, img, video } = req.body
  const { userADMId } = req.params
  console.log(userADMId, req.file, contentP1, contentP2, contentP3, contentP4, contentP5, contentP6, contentP7, contentPreComment, title, img, video)
  // if(contentP1 && contentPreComment &&  title && userADMId) {
  //     const userADM = await UserService.findADM(userADMId)
  //     if(userADM) {
  //         const newPost = await PostService.create({ 
  //           userADMId, 
  //           title, 
  //           contentP1, 
  //           contentP2: contentP2 ?? null, 
  //           contentP3: contentP3 ?? null, 
  //           contentP4: contentP4 ?? null, 
  //           contentP5: contentP5 ?? null, 
  //           contentP6: contentP6 ?? null, 
  //           contentP7: contentP7 ?? null, 
  //           contentPreComment, 
  //           img: img ?? null, 
  //           video: video ?? null  
  //       })
  //         if(newPost) {
  //             res.status(201).json({ post: newPost })
  //         }
  //     } else {
  //         res.status(500).json({error : "Erro ao usuario logado"})
  //     }
  // } else {
  //     res.status(500).json({error : "Dados invalidos"})
  // }
  res.json({})
}
export const createFile = async(req: Request, res: Response) => {
    
    fs.copyFileSync( path.join(__dirname, '../views/pages/news/news.ejs'), path.join(__dirname, '../views/pages/news/news2.ejs'))
    res.status(201)
    // fs.appendFile( path.join(__dirname, '../../public/mynewfile1.html'), 'Hello content!', function (err) {
    //     //path.join(__dirname, '../public/') '/public/mynewfile1.html'
    //     if (err) throw err;
    //     console.log('Saved!');
    //     res.status(201)
    //   });
    // const { content, contentPreComment, title, img, video } = req.body
    // const { userADMId } = req.params
    // if(content && contentPreComment &&  title && userADMId) {
    //     const userADM = await UserService.findADM(userADMId)
    //     if(userADM) {
    //         const newPost = await PostService.create({ userADMId, title, content, contentPreComment, img: img ?? null, video: video ?? null  })
    //         if(newPost) {
    //             res.status(201).json({ post: newPost })
    //         }
    //     } else {
    //         res.status(500).json({error : "Erro ao usuario logado"})
    //     }
    // } else {
    //     res.status(500).json({error : "Dados invalidos"})
    // }
}
export const all = async(req: Request, res: Response) => {
  const all = await PostService.findAll()
  res.status(200).json({posts: all})
}
export const home = async(req: Request, res: Response) => {
    const all = await PostService.findAll()
    console.log(all)
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