const apiError = require('../error/ApiError')

module.exports = function (err,req,res){
    if(err instanceof apiError){
         return res.status(err.status).json({message:err.message})}
    return res.status(500).json({message:"Необработанная ошибка"})
}