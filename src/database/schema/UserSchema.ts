import Joi from "joi"

const userSchema = Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    email:Joi.string().email().required(),
    phone:Joi.string().pattern(/^[0-9\s]+$/).required(),
    password:Joi.string().required()
}).meta({className:'IUser'})



export default userSchema