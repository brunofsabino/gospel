import { PrismaClient, User } from "@prisma/client"
import bcrypt from "bcrypt"
import { Request, Response } from "express";
import { generateToken } from '../config/passport'
import nodemailer from 'nodemailer'
import { smtp } from "../config/smtp";
import { PostService } from "./PostService";

const prisma = new PrismaClient()
type PropCreate = {
    nickName: string,
    name: string,
    email: string,
    password: string,
    avatar: string
}
type PropCreateADM = {
    name: string,
    email: string,
    password: string,
    avatar: string
}
type PropUpdate = {
    name?: string,
    password?: string,
    avatar?: string,
    nickName?: string
}
export const UserService = {
    findOne: async(id: string) => {
        return await prisma.user.findFirst({ where: { id }})
    },
    findADM: async(id: string) => {
        return await prisma.userADM.findUnique({ where: { id }})
    },
    findOneByNickName: async(name: string) => {
        console.log("NickName"+name)
        const user = await prisma.user.findUnique({ where: { nickName: name }})
        if(user) {
            return {
                id: user.id,
                name: user.name,
                nickName: user.nickName,
                email: user.email,
                avatar: user.avatar,
            }
        }
    },
    findAll: async() => {
        return await prisma.user.findMany({})
    },
    create: async(data: PropCreate) => {
        const dataNewUser =  await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: bcrypt.hashSync(data.password, 10),
                avatar: data.avatar,
                nickName: data.nickName
            }
        })
        if(dataNewUser) {
            const token = generateToken({ id: dataNewUser.id })
            return { dataNewUser, token}
        }
    },
    createAdm: async(data: PropCreateADM) => {
        const dataNewUser =  await prisma.userADM.create({
            data: {
                name: data.name,
                email: data.email,
                password: bcrypt.hashSync(data.password, 10)
            }
        })
        if(dataNewUser) {
            const token = generateToken({ id: dataNewUser.id })
            return { dataNewUser, token}
        }
    },
    sendEmailResponseComment: async(id: string, idPost: string) => {
        const user = await UserService.findOne(id)
        const post = await PostService.findOne(idPost)
        if(user && post) {
            console.log('entrou aqui')
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
                subject: 'Opinião Gospel - Seu comentário foi respondido!',
                from: 'Opinião Gospel <opniaogospel@gmail.com',
                to: [user.email],
                headers: {
                  'importance': 'high'
                },
                html: `
                <html style="width:100%;min-width:100%;box-sizing:border-box;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-weight:normal;padding:0;margin:0;text-align:left;line-height:1.3;background:#e3e4e4">
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
                  <p>Olá, ${user.name}!</p>
                  <p>Seu comentário foi respondido no Opinião Gospel!</p>
                  <a href="http://localhost:4000/news/${post.title.split(' ').join('-')}" style="padding: 10px;
                  border-radius: 10px;
                  text-decoration: none;
                  background-color: #FF6B00;
                  border: none;
                  color: #FFF;
                  margin-top: 15px;">Ver resposta</a>
                  
                </body>
              </html>
                `
              })
              if(mailSend.accepted) {
                //res.status(200).json({message: "e-mail enviado com sucesso"})
              } else {
                //res.status(500).json({error : "Erro ao enviar o e-mail"})
              }
              if(mailSend.rejected) {
                
            }
        }

    },
    findByEmail: async(email: string) => {
        return await prisma.user.findUnique({ where: { email }})
    },
    update: async(id: string, data: PropUpdate) => {
        return await prisma.user.update({
            where: { id },
            data : {
                name : data.name,
                password : bcrypt.hashSync(data.password as string, 10),
                avatar: data.avatar ?? null
            }
        })
    },
    updatePass: async(id: string, data: PropUpdate) => {
        return await prisma.user.update({
            where: { id },
            data : {
                password : bcrypt.hashSync(data.password as string, 10)
            }
        })
    },
    updatePhoto: async(id: string, data: PropUpdate) => {
        console.log(data.avatar)
        return await prisma.user.update({
            where: { id },
            data : {
                avatar : data.avatar
            }
        })
    },
    updateName: async(id: string, data: PropUpdate) => {
        return await prisma.user.update({
            where: { id },
            data : {
                name : data.name
            }
        })
    },
    updateNameAndNickName: async(id: string, data: PropUpdate) => {
        return await prisma.user.update({
            where: { id },
            data : {
                name : data.name,
                nickName: data.nickName
            }
        })
    },
    login: async(email: string, password: string) => {
        const user =  await prisma.user.findUnique({ where: { email }})
        if(user) {
            let hash = bcrypt.compareSync(password as string, user.password)
            if(hash) {
                const token = generateToken({ id: user.id })
                return { hash, token, name: user.name, email: user.email, id: user.id}
            }
        }
    },
    admLogin: async(email: string, password: string) => {
        const user =  await prisma.userADM.findUnique({ where: { email }})
        if(user) {
            let hash = bcrypt.compareSync(password as string, user.password)
            if(hash) {
                const token = generateToken({ id: user.id })
                return { hash, token, name: user.name, email: user.email, id: user.id}
            }
        }
    },
    // logInUser: function (req: Request, res: Response) {
    //     const userId = req.session.userId;
    //     return userId
    // },
    deleteUser: async(id: string) => {
        return await prisma.user.delete({ where: { id }})
    }
}