const ApiError = require('../error/ApiError')
const bcrypt = require('bcryptjs-react')
const jsonwebtoken = require('jsonwebtoken')
const {User,Basket} = require('../models/models')


const generateJwt = (id, email, role) => {
    return jsonwebtoken.sign(
        {id,email,role},
        process.env.SECRET_KEY, //передаём в jwt Characters.txt-ым параметром secretkey
        {expiresIn:"3h"} // Действует 3 часа
    )
}

class userController {
    async registration(req,res,next){
        const {email, password, role} = req.body
        if(!email || !password){
            return next(ApiError.badRequest('Incorrect password or email'))
        }
        const candidate = await User.findOne({where: {email}})
        if(candidate){
            return next(ApiError.badRequest('user already exists'))
        }
        let salt = bcrypt.genSaltSync(4);
        const hashPassword = await bcrypt.hash(password,salt)
        const user = await User.create({email,role,password:hashPassword,})
        const basket = await Basket.create({userId:user.id})
        const token = generateJwt(user.id, user.email,user.role)
        const id = user.id
        return res.json({token,id})
    }
    async login(req,res,next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.internal("User not found"))
        }
         let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal("Incorrect password"))
        }
        const token = generateJwt(user.id,user.email,user.role)
        const id = user.id
        return res.json({token,id})

    }
    async check(req,res){
        const {email} = req.query
        const user = await User.findOne({where: {email}})
        const token = generateJwt(user.id,user.email,user.role) /// пересоздаем токен если он невалиден
        return res.json({token})

    }
}
module.exports = new userController()