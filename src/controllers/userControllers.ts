import { Request, Response } from "express";
import { UserService } from "../services/UserService";


export const create = async(req: Request, res: Response) => {
  const { name, password, email } = req.body
  if(name && password && email) {
      const emailExists = await UserService.findByEmail(email)
      if(!emailExists) {
          const newUser = await UserService.create({name, password, email})
          if(newUser) {
              res.status(201).json({ id: newUser.dataNewUser.id, token: newUser.token })
          }
      } else {
          res.status(500).json({error : "E-mail já cadastrado. Faça o login!"})
      }
  } else {
      res.status(500).json({error : "Dados invalidos"})
  }
}