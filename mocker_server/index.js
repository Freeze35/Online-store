const express = require('express');
const path = require('path');
const router = require('./routes/index.js')
const app = express()
let livereload = require("livereload");
let connectLiveReload = require("connect-livereload");


//Cors controller
app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    const allowedOrigins = ['*','http://localhost:3000',"http://localhost:10000",
        'https://store-petr-elshin-github-freeze35.netlify.app',
        'https://online-store-ybltoxnv3-freeze35.vercel.app'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

app.use(connectLiveReload());

const fileUpload = require("express-fileupload")
//const cors = require('cors')

app.use(express.urlencoded({ extended: true }));
//app.use(cors({origin: '*'}))
app.use(express.json()) //парсим json формат
app.use(fileUpload({}))

app.use("/api", router)

app.get("/:url.png", (req, res) => {
    const {url} = req.params;
    //return all file.png
    res.sendFile(path.resolve(__dirname, `./static/${url}.png`))
});

app.listen(10000,"localhost", () => console.log(`Server started on port ${10000}`))

module.exports = app;