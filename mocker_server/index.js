const express = require('express');
const path = require('path');
const router = require('./routes/index.js')
const cors = require('cors')
const app = express()
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser");
let connectLiveReload = require("connect-livereload");
let livereload = require("livereload");

app.use(cors({origin: '*'}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) //парсим json формат
app.use(fileUpload({}))
app.use(cookieParser());
app.use(connectLiveReload());

const liveReloadServer = livereload.createServer();

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

app.use("/api", router)

app.get("/:url.webp", (req, res) => {
    const {url} = req.params;
    res.sendFile(path.resolve(__dirname, `./static/${url}.webp`))
});

app.listen(10000,"localhost", () => console.log(`Server started on port ${10000}`))

module.exports = app;