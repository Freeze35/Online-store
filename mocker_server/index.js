const express = require('express');
const path = require('path');
const apiMocker = require('mocker-api');
const cors = require('cors')
const app = express()

app.use(cors())
let PORT = 5001

app.get("/", (req, res) => {
    res.send("Express on Vercel");
});

apiMocker(app, path.resolve('./mocker/api.js'))
app.listen(PORT,"localhost", () => console.log(`Server started on port ${PORT}`));

module.exports = app;