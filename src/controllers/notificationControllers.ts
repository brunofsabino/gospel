import { Request, Response } from "express";
import { DenounceService } from "../services/DenounceService";
import { UserService } from "../services/UserService";
import { PostService } from "../services/PostService";
import { CommentService } from "../services/CommentService";
import { CommentForumService } from "../services/CommentForumService";
import { ForumService } from "../services/ForumService";
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken';
import { smtp } from "../config/smtp";


export const createNotificationForgotPassword = async(req: Request, res: Response) => {
  const { email } = req.body
  
  const user = await UserService.findByEmail(email)
  if(user) {

    const token = jwt.sign({ email }, 'seu_@#$segredo_)(*aqui');
    const link = `http://localhost:4000/redefinir-senha/?token=${token}`;
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: true,
      auth: {
        user: smtp.user,
        pass: smtp.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    })
  
    const mailSend = await transporter.sendMail({
      //text: 'Recuperação de senha',
      subject: 'Opinião Gospel - Recuperação de senha',
      from: 'Opinião Gospel <opniaogospel@gmail.com',
      to: [user.email],
      headers: {
        'importance': 'high'
      },
      html: `
      <html>
      <head>
        <style>
          /* Estilos CSS do e-mail */
          body {
            background-color: #f1f1f1;
            font-family: Arial, sans-serif;
            font-size: 16px;
            color: #333;
          }
          h1 {
            color: #008000;
          }
        </style>
      </head>
      <body>
        <h1>Opinião Gospel - Recuperação de senha</h1>
        <p>Olá, ${user.name}!</p>
        ${user.email}
        <p>Clique no link abaixo para a recuperação de senha no Opinião gospel.</p>
        ${link}
      </body>
    </html>
      `
    })

    if(mailSend.accepted) {
      res.status(200).json({message: "e-mail enviado com sucesso"})
    } else {
      res.status(500).json({error : "Erro ao enviar o e-mail"})
    }
    if(mailSend.rejected) {
      
    }
  } else {
    res.status(500).json({error : "Dados invalidos"})
  }
  

  

  // const user = await UserService.findOne(idUser)
  // const comment = await CommentService.findOne(idComment)
  // const post = await PostService.findOne(idPost)

  // if(user && post ){
  //   const nameUser = user.name
  //   const denounce = await DenounceService.create(user.id, {
  //     nameUser,
  //     userDenounced_id: userDenounced_id ?? undefined,
  //     describingDenounce: describingDenounce ?? undefined,
  //     post_id:  post.id ?? null,
  //     id_comment: comment ? comment.id : idComment
  //   })
  //   if(denounce) {
  //     res.status(200).json({denounce})
  //   } else {
  //     res.status(500).json({error : "Dados invalidos"})
  //   }
  // } else {
  //   res.status(500).json({error : "Dados invalidos"})
  // }
}

export const redefinir = async (req: Request, res: Response) => {
  const { token } = req.query;
  console.log(token)
  // Verifica se o token está presente na URL
  if (!token) {
    return res.status(400).send('Token não encontrado');
  }
  try {
    // Verifica se o token é válido
    const decoded = jwt.verify(token as string, 'seu_@#$segredo_)(*aqui');
    console.log(decoded)
    // Renderiza um formulário para o usuário definir a nova senha
    const userId = ''
    res.render('pages/redefinir', {
      userId
    })
    //res.render('form-de-nova-senha', { email: decoded.email, token });
  } catch (error) {
    console.error(error);
    res.status(400).send('Token inválido');
  }
  
}