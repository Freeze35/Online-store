const express = require('express');
const path = require('path');
const router = require('./routes/index.js')
const app = express()

app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    const allowedOrigins = ['*','http://localhost:3000', 'https://store-petr-elshin-github-freeze35.netlify.app'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

const fileUpload = require("express-fileupload")
//const cors = require('cors')

//app.use(cors({origin: '*'}))
app.use(express.urlencoded({ extended: true }));
//app.use(express.json()) //парсим json формат
app.use(fileUpload({}))

app.use("/api", router)

app.get("/:url.webp", (req, res) => {
    const {url} = req.params;
    res.sendFile(path.resolve(__dirname, `./static/${url}.webp`))
});

app.listen(10000,"localhost", () => console.log(`Server started on port ${10000}`))

module.exports = app;