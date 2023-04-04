import dotenv from 'dotenv'

dotenv.config()
export const smtp = {
  host: 'smtp.gmail.com',
  port: 465 ,
  //port: 587,
  user: process.env.USEREMAIL as string,
  pass: process.env.PASSEMAIL as string,
}