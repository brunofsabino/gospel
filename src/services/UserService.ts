import { PrismaClient, User } from "@prisma/client"
import bcrypt from "bcrypt"
import { Request, Response } from "express";
import { generateToken } from '../config/passport'

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