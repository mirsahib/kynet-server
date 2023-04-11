import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import handleError from "./errorHandles";

const validation = (schema:Joi.ObjectSchema)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const {error} = schema.validate(req.body)
        if (error) {
            console.log("error");
            return res.status(400).json(handleError(error))
        }
        next();
    }
}

export default validation