import { Request, Response } from "express";
import { DenounceService } from "../services/DenounceService";
import { UserService } from "../services/UserService";
import { PostService } from "../services/PostService";
import { CommentService } from "../services/CommentService";
import { CommentForumService } from "../services/CommentForumService";
import { ForumService } from "../services/ForumService";
import nodemailer from 'nodemailer'
import jwt, { JwtPayload, verify  } from 'jsonwebtoken';
import { smtp } from "../config/smtp";
import { schemaEmail, schemaToken } from "../dtos/validator";


export const createNotificationForgotPassword = async(req: Request, res: Response) => {
  const { email } = req.body
  try {
    schemaEmail.parse({ email });
    const user = await UserService.findByEmail(email)
  if(user) {
    const token = jwt.sign({ email }, 'seu_@#$segredo_)(*aqui',  { expiresIn: '20m' });
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
        <p>Clique no link abaixo para a recuperação de senha no Opinião gospel. O link tem duração de 20 minutos!</p>
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
    res.status(400).json({error : "Dados invalidos"})
  }
  } catch (error) {
    res.status(400).json({error : "Dados invalidos"})
  }
}

export const redefinir = async (req: Request, res: Response) => {
  const { token } = req.query;
  try {
    schemaToken.parse({ token });
    if (!token) {
      const userId = ''
      res.render('pages/InvalidToken', {
        userId
      })
    }
    try {
      // Verifica se o token é válido
      const decoded: JwtPayload | string | null = verify(token as string, 'seu_@#$segredo_)(*aqui');
      console.log(decoded)
      // Renderiza um formulário para o usuário definir a nova senha
      if(decoded){
        const tokenExpiration = typeof decoded === 'object' && decoded.exp && new Date(decoded.exp * 1000);
        const currentTime = new Date();
        if (tokenExpiration && currentTime > tokenExpiration) {
          const userId = ''
          res.render('pages/redefinir', {
            userId
          })
        }
      }
      const userId = ''
      res.render('pages/redefinir', {
        userId
      })
      
    } catch (error) {
      console.error(error);
      const userId = ''
      res.render('pages/InvalidToken', {
        userId
      })
    }
  } catch (error) {
    console.error('ID inválido:', error);
  }
}
export const redefinirNewPass  = async (req: Request, res: Response) => {
  const { token } = req.params;
  const {input1 , input2 } = req.body;
  try {
    schemaToken.parse({ token, input1 , input2 });
    if (!token) {
      const userId = ''
      res.render('pages/InvalidToken', {
        userId
      })
    } else {
      try {
        // Verifica se o token é válido
        const decoded: JwtPayload | string | null = verify(token as string, 'seu_@#$segredo_)(*aqui');
        
        // Renderiza um formulário para o usuário definir a nova senha
        if(decoded){
          const tokenExpiration = typeof decoded === 'object' && decoded.exp && new Date(decoded.exp * 1000);
          const email = typeof decoded === 'object' && decoded.email ;
          const currentTime = new Date();
          if (tokenExpiration && currentTime > tokenExpiration) {
            const userId = ''
            res.render('pages/InvalidToken', {
              userId
            })
          }
          if(email){
            const user = await UserService.findByEmail(email)
            if(user && input1 === input2) {
              const newPass = await UserService.updatePass(user.id, {password: input1})
              if(newPass) {
                res.status(200).json({message: "Senha atualizada com sucesso!"})
              } else {
                res.status(400).json({error : "Dados invalidos"})
              }
            }
          }
        }
      } catch (error) {
        console.error(error);
        const userId = ''
        res.render('pages/InvalidToken', {
          userId
        })
      }
    }
  } catch (error) {
    res.status(400).json({error : "Dados invalidos"})
  }
}