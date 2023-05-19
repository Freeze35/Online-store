const express = require('express')
const router = express.Router()
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const deviceRouter = require('./deviceRouter')
const deviceInfoRouter = require('./deviceInfoRouter')
const userRouter = require('./userRouter')
//const basketRouter = require('./basketRouter')

//router.use('/user', userRouter) //Подключаем к index подроуты
//router.use('/basket', basketRouter)
router.use('/brand', brandRouter)
router.use('/type', typeRouter)
router.use('/device', deviceRouter)
router.use('/device-info', deviceInfoRouter)
router.use('/user', userRouter)

module.exports = router