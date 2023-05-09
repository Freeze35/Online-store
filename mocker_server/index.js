const express = require('express');
const path = require('path');
const apiMocker = require('mocker-api');
const cors = require('cors')
const fs = require("fs");
const app = express()

app.use(cors())
let allDevices = JSON.parse(fs.readFileSync(path.join(__dirname, "./devicesApi.json"), "utf-8"));
app.get("/api/device", (req, res) => {
    let {brandId, typeId, limit, page} = req.query
    let newDevices = {"count": 0, "rows": []}
    page = page || 1
    limit = limit || 8
    let offset = page * limit - limit
    //allDevices.count = 15
    //allDevices.rows = [allDevices.rows[2],allDevices.rows[0]]
    //allDevices.rows = allDevices.rows.filter(row => row.id > 2)

    const limitDevs = (i, dev) => {
        dev.count = ~~dev.count
        return i < (dev.count - offset + limit <= ~limit
            ? dev.count - offset + limit
            : dev.count - offset <= limit
                ? dev.count - offset
                : dev.count <= limit
                    ? dev.count
                    : limit)
    }

    if (!brandId && !typeId) {

        for (let i = 0; limitDevs(i, allDevices); i++) {
            let idOffset = offset + i
            newDevices["rows"] = [...newDevices.rows, allDevices.rows[idOffset]]
            newDevices["count"] = allDevices.count
        }
    }

    const newDev = (devRows) => {
        newDevices = {...newDevices, "rows": devRows()}
        newDevices.count = newDevices.rows.length
        let emptyDevs = []
        for (let i = 0;
             limitDevs(i, newDevices); i++) {
            let idOffset = offset + i
            emptyDevs = [...emptyDevs, newDevices.rows[idOffset]]
        }
        newDevices["rows"] = emptyDevs
    }

    if (brandId && !typeId) {
        const devRows = () => allDevices.rows.filter(
            dev => dev.brandId === brandId
        )
        newDev(devRows)

    }

    if (!brandId && typeId) {
        const devRows = () => allDevices.rows.filter(
            dev => dev.typeId === typeId
        )
        newDev(devRows)
    }

    if (brandId && typeId) {
        const devRows = () => allDevices.rows.filter(
            dev => dev.typeId === typeId && dev.brandId === brandId
        )
        newDev(devRows)
    }

    return res.json(allDevices);
});

apiMocker(app, path.resolve('./mocker/api.js'))
//app.listen(5001);

module.exports = app;