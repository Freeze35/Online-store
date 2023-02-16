const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const deviceRouter = require('./deviceRouter')
const deviceInfoRouter = require('./deviceInfoRouter')

router.use('/user', userRouter) //Подключаем к index подроуты
router.use('/brand', brandRouter)
router.use('/type', typeRouter)
router.use('/device', deviceRouter)
router.use('/device-info', deviceInfoRouter)


module.exports = router