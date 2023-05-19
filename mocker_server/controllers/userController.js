const bcrypt = require('bcryptjs-react')
const jsonwebtoken = require('jsonwebtoken')
const fs = require("fs");
const path = require("path");

let allUsers = JSON.parse(fs.readFileSync(path.join(__dirname, "./../mocker/userApi.json"), "utf-8"));

const generateJwt = (id, email, role) => {
    return jsonwebtoken.sign(
        {id,email,role},
        `${process.env.SECRET_KEY}`, //передаём в jwt Characters.txt-ым параметром secretkey
        {expiresIn:"3h"} // Действует 3 часа
    )
}

class userController {
    async registration(req,res){
        const {email, password, role} = req.body
        if(!email || !password){
            res.status(401).send({message: "Incorrect password or email"})
        }
        const candidate = await allUsers.rows.some(user=>
            user.email === email)
        if(candidate){
            res.status(400).send({message: e.message})
        }
        let salt = bcrypt.genSaltSync(4);
        const hashPassword = await bcrypt.hash(password,salt)
        let newDevId = 0
        allUsers.rows.forEach(user => {
                if (~~user.id+1 > ~~newDevId) {
                    newDevId = ~~user.id+1
                }
            }
        )
        await allUsers.rows.push(
            {
                "id": newDevId,
                "email": email,
                "password": hashPassword,
                "role": role,
                "createdAt": new Date().toISOString(),
                "updatedAt": new Date().toISOString()
            }
        )
        //const basket = await Basket.create({userId:user.id})
        const token = generateJwt(newDevId, email,role)
        const id = newDevId
        return res.json({token,id})
    }
    async login(req,res,next){
        const {email, password} = req.body
        //find user in UsersList
        const user = await allUsers.rows.map(user=> user.email === email)
        if(!user){
            return next(res.status(403).send({message: "User not found"}))
        }
         let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(res.status(403).send({message: "Incorrect password"}))
        }
        const token = generateJwt(user.id,user.email,user.role)
        const id = user.id
        return res.json({token,id})

    }
    async check(req,res){
        const {email} = req.query
        //find user in UsersList
        const user = await allUsers.rows.map(user=> user.email === email)
        const token = generateJwt(user.id,user.email,user.role) /// пересоздаем токен если он невалиден
        return res.json({token})
    }
}
module.exports = new userController()