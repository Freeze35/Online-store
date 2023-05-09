const express = require('express');
const path = require('path');
const router = require('./routes/index.js')
const cors = require('cors')
const app = express()
const fileUpload = require("express-fileupload")

app.use(cors())
app.use("/api", router)
app.use(fileUpload({}))

app.get("/:url.webp", (req, res) => {
    const {url} = req.params;
    res.sendFile(path.resolve(__dirname, `./static/${url}.webp`))
});

app.listen(5001,"localhost", () => console.log(`Server started on port ${5001}`))

module.exports = app;