require('dotenv').config()//Для считывания файла .env импортируем dotenv
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index') //импортируем роутер который связывает все остальные routes
const PORT = process.env.PORT || 5000 // for launch server 5000; PostgerDB started on 5001
const app = express()
const errorMiddlware = require("./middleware/ErrorMiddleware")
const fileUpload = require("express-fileupload")
const path =require('path')

app.use(cors())
app.use(express.json()) //парсим json формат
app.use(fileUpload({}))
app.use("/api", router)
app.use(express.static(path.resolve(__dirname,"static")))

//Обработка ошибки
app.use(errorMiddlware)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,"localhost", () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()