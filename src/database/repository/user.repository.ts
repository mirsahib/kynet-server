import client from '../database'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'

export interface IUser {
    firstName?:string,
    lastName?:string,
    email:string,
    password:string,
    updated?:Date
    created?:Date
}

const createUser = async (userData:IUser) =>{
    userData.password = await hashedPassword(userData.password)
    userData.created = new Date()
    userData.updated = new Date()
    return await client?.db('kynet').collection('user').insertOne(userData)
}

const findUser = async (userData:IUser) =>{
    return await client?.db('kynet').collection('user').findOne({email:userData.email})
}
const findUserById = async (id:string) =>{
    const userId = new ObjectId(id)
    return await client?.db('kynet').collection<IUser>('user').findOne({_id:userId})
}

const hashedPassword = async (password:string)=>{
    const saltRound = 10
    return await bcrypt.hash(password,saltRound)
}

const verifyPassword = async (password:string,hashedPassword:string)=>{
    return await bcrypt.compare(password,hashedPassword)
}

export {
    createUser,
    findUser,
    findUserById,
    verifyPassword
}