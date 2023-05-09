const express = require('express');
const path = require('path');

const cors = require('cors')
const apiMocker = require('mocker-api')
const fs = require("fs");
const app = express()

app.use(cors())
let allDevices = JSON.parse(fs.readFileSync(path.join(__dirname, "./mocker/devicesApi.json"), "utf-8"));
/*app.get("/api/device", (req, res) => {
    return res.json(allDevices);
});*/

apiMocker(app, path.resolve('./mocker/api.js'))
app.listen(5001);

module.exports = app;