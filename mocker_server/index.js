const express = require('express');
const path = require('path');
const router = require('./routes/index.js')
const cors = require('cors')
const app = express()
const fileUpload = require("express-fileupload")

app.use(cors({origin: '*'}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) //парсим json формат
app.use(fileUpload({}))

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use("/api", router)

app.get("/:url.webp", (req, res) => {
    const {url} = req.params;
    res.sendFile(path.resolve(__dirname, `./static/${url}.webp`))
});

app.listen(5001,"localhost", () => console.log(`Server started on port ${5001}`))

module.exports = app;