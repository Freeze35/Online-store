const express = require('express');
const path = require('path');
const apiMocker = require('mocker-api');
//const cors = require('cors')
const app = express()

//app.use(cors())




apiMocker(app, path.resolve('./mocker/api.js'))
app.listen(5001);

module.exports = app;