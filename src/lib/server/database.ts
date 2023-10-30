import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()
export default db

export const getSessionUserFromDb = (id:string)=>{
 return db.user.findUnique({
    where: {
        id:id
    }
 })
}