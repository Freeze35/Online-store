
const path = require("path");
const fs = require("fs");
const ApiError = require("../../server/error/ApiError");
const { v4: uuidv4 } = require('uuid');


let allDevices = JSON.parse(fs.readFileSync(path.join(__dirname, "./devicesApi.json"), "utf-8"));
let allDeviceInfo = JSON.parse(fs.readFileSync(path.join(__dirname, "./deviceInfo.json"), "utf-8"));
let allTypes = JSON.parse(fs.readFileSync(path.join(__dirname, "./typesApi.json"), "utf-8"));
let allBrands = JSON.parse(fs.readFileSync(path.join(__dirname, "./brandApi.json"), "utf-8"));

//import dis from "../client/src/assets/static/062eb0e4-4791-4cb0-bd06-1d7f4022a006.webp"

const proxy = {

    // Priority processing.
    // apiMocker(app, path, option)
    // This is the option parameter setting for apiMocker
    _proxy: {
        proxy: {
            // Turn a path string such as `/user/:name` into a regular expression.
            // https://www.npmjs.com/package/path-to-regexp
            '/repos/(.*)': 'https://api.github.com/',
            /*'/:owner/:repo/raw/:ref/(.*)': 'http://127.0.0.1:2018',
            '/api/repos/(.*)': 'http://127.0.0.1:3721/'*/
        },
        // rewrite target's url path. Object-keys will be used as RegExp to match paths.
        // https://github.com/jaywcjlove/mocker-api/issues/62
        pathRewrite: {
            '^/api/repos/*': '/repos/',
        },
        changeHost: true,
        // modify the http-proxy options
        httpProxy: {
            options: {
                ignorePath: true,
            },
        },
    },


    //Get All allDevices,type,brand,typeBrand
    'GET /api/device': (req, res) => {
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
    },
    'GET /api/device/:id': (req, res) => {
        const {id} = req.params
        let dev = allDevices.rows.filter(dev => ~~dev.id === ~~id)[0]
        dev = {...dev, "info": [...allDeviceInfo.filter(info => ~~info.deviceId === ~~id)]}
        return res.json(dev)
    },
    'GET /api/type': (req, res) => {

        return res.json(allTypes)
    },
    'GET /api/brand': (req, res) => {
        return res.json(allBrands)
    },
    //get our images. If change place mocker folder change this
    'GET /:url.webp': (req, res) => {
        const {url} = req.params;

        res.sendFile(path.resolve(__dirname, `../src/assets/static/${url}.webp`))
    },
    'DELETE /api/device-info/:id': (req, res) => {
        const {id} = req.params
        const newDeviceInfo = allDeviceInfo.filter(devInfo =>
            ~~devInfo.id !== ~~id
        )

        fs.writeFileSync(path.join(__dirname, "./deviceInfo.json"),
            JSON.stringify(newDeviceInfo, null, 2), "utf-8");

        // file written successfully
        res.status(200).json({message: "Info was deleted"});
    },

    'PUT /api/device-info/:id': (req, res) => {
        const {info} = req.body
        let parseInfo = JSON.parse(info)[0]// преобразовываем к JSON объекту

        let idChangeElem = allDeviceInfo.findIndex(devInfo =>
                    ~~devInfo.id === ~~parseInfo.id
        )
        allDeviceInfo[idChangeElem].title = parseInfo.title
        allDeviceInfo[idChangeElem].description = parseInfo.description
        allDeviceInfo[idChangeElem].updatedAt = new Date().toISOString()

        fs.writeFileSync(path.join(__dirname, "./deviceInfo.json"),
            JSON.stringify(allDeviceInfo, null, 2), "utf-8");

        res.status(200).send({message: "Info was overwrite"})
    },

    'POST /api/device-info': (req, res) => {
        const {info,deviceId} = req.body
        let parseInfo = JSON.parse(info)// преобразовываем к JSON объекту

        parseInfo.forEach(infoElem => {
               let newId = 0
               allDeviceInfo.forEach(devInfo => {
                        if (~~devInfo.id+1 > ~~newId) {
                            newId = ~~devInfo.id+1
                        }
                    }
                )
                allDeviceInfo.push(
                    {
                        "id": newId,
                        "title": infoElem.title,
                        "description": infoElem.description,
                        "deviceId": ~~deviceId,
                        "createdAt": new Date().toISOString(),
                        "updatedAt": new Date().toISOString(),

                    }
                )
            }
        )

        fs.writeFileSync(path.join(__dirname, "./deviceInfo.json"),
            JSON.stringify(allDeviceInfo, null, 2), "utf-8");

        res.status(200).send({message: "Info added"})
    },
    'POST /api/brand': (req, res,next) => {
        const {name} = req.body
        if(!allBrands.find(brand=>
            brand.name.toLowerCase() === name.toLowerCase()
        )){
            let newId = 0
            allBrands.forEach(devInfo => {
                    if (~~devInfo.id+1 > ~~newId) {
                        newId = ~~devInfo.id+1
                    }
                }
            )
        allBrands.push(
            {
                "id": newId,
                "name": name,
                "createdAt": new Date().toISOString(),
                "updatedAt": new Date().toISOString(),

            }
        )
            fs.writeFileSync(path.join(__dirname, "./brandApi.json"),
                JSON.stringify(allBrands, null, 2), "utf-8");
            res.status(200).send({message: "Brand added"})
        }
        else{
            next(new ApiError(409,"Already exists brand"))
        }

    },
    'POST /api/type': (req, res,next) => {
        const {name} = req.body
        if(!allTypes.find(type=>
            type.name.toLowerCase() === name.toLowerCase()
        )){
            let newId = 0
            allTypes.forEach(type => {
                    if (~~type.id+1 > ~~newId) {
                        newId = ~~type.id+1
                    }
                }
            )
            allTypes.push(
                {
                    "id": newId,
                    "name": name,
                    "createdAt": new Date().toISOString(),
                    "updatedAt": new Date().toISOString(),

                }
            )
            fs.writeFileSync(path.join(__dirname, "./typesApi.json"),
                JSON.stringify(allTypes, null, 2), "utf-8");
            res.status(200).send({message: "Brand added"})
        }
        else{
            next(new ApiError(409,"Already exists brand"))
        }

    },

    'POST /api/device': async (req, res,next) => {

        const {name, price, brandId, typeId, info} = req.body
        let fileName = uuidv4() + ".webp" // для создания уникального имения для img файла
        const img = req.files.img
        await img.mv(path.resolve(__dirname, '../client/src/assets/', 'static', fileName))
        let newDevId = 0
        if(!allDevices.rows.find(device=>
            device.name.toLowerCase() === name.toLowerCase()
        )){

            allDevices.rows.forEach(dev => {
                    if (~~dev.id+1 > ~~newDevId) {
                        newDevId = ~~dev.id+1
                    }
                }
            )
            allDevices.rows.push(
                {
                    "id": newDevId,
                    "name": name,
                    "price": price,
                    "rating": 0,
                    "img": fileName,
                    "createdAt": new Date().toISOString(),
                    "updatedAt": new Date().toISOString(),
                    "typeId": typeId,
                    "brandId": brandId

                }
            )

            allDevices.count = ~~allDevices.count+1

            if(info){
                let parseInfo = JSON.parse(info)// преобразовываем к JSON объекту
                parseInfo.forEach(infoElem => {
                        let newId = 0
                        allDeviceInfo.forEach(devInfo => {
                                if (~~devInfo.id+1 > ~~newId) {
                                    newId = ~~devInfo.id+1
                                }
                            }
                        )
                        allDeviceInfo.push(
                            {
                                "id": newId,
                                "title": infoElem.title,
                                "description": infoElem.description,
                                "deviceId": ~~newDevId,
                                "createdAt": new Date().toISOString(),
                                "updatedAt": new Date().toISOString(),

                            }
                        )
                    }
                )
            }

            fs.writeFileSync(path.join(__dirname, "./deviceInfo.json"),
                JSON.stringify(allDeviceInfo, null, 2), "utf-8");

            fs.writeFileSync(path.join(__dirname, "./devicesApi.json"),
                JSON.stringify(allDevices, null, 2), "utf-8");

            res.status(200).send({message: "device added"})
        }
        else{
            next(new ApiError(409,"Already exists brand"))
        }

    },

    /*const {name, price, brandId, typeId, info} = req.body
    const {img} = req.files
    let fileName = uuid.v4() + ".webp" // для создания уникального имения для img файла
    await img.mv(path.resolve(__dirname, '..', 'static', fileName)) //Прописываем путь для передачи через браузер пути для файла
    const device = await Device.create({name, price, brandId, typeId, img: fileName})
    if(info){
        let parseInfo = JSON.parse(info) // преобразовываем к JSON объекту
        parseInfo.forEach(i =>
            DeviceInfo.create({
                title:i.title,
                description: i.description,
                deviceId: device.id

            })
        )
    }*/

    /*async create(req,res,next){
        try {
            const {info,deviceId} = req.body
            let parseinfo = JSON.parse(info)// преобразовываем к JSON объекту
            parseinfo.forEach(i =>
                DeviceInfo.create({
                    title:i.title,
                    description: i.description,
                    deviceId: deviceId
                })
            )
            return res.json(parseinfo)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }*/

    'GET /api/:owner/:repo/raw/:ref/(.*)': (req, res) => {
        const {owner, repo, ref} = req.params;
        // http://localhost:8081/api/admin/webpack-mock-api/raw/master/add/ddd.md
        // owner => admin
        // repo => webpack-mock-api
        // ref => master
        // req.params[0] => add/ddd.md
        return res.json({
            id: 1,
            owner, repo, ref,
            path: req.params[0]
        });
    },
    'POST /api/login/account': (req, res) => {
        const {password, username} = req.body;
        if (password === '888888' && username === 'admin') {
            return res.json({
                status: 'ok',
                code: 0,
                token: "sdfsdfsdfdsf",
                data: {
                    id: 1,
                    username: 'kenny',
                    sex: 6
                }
            });
        } else {
            return res.status(403).json({
                status: 'error',
                code: 403
            });
        }
    },
    'DELETE /api/user/:id': (req, res) => {
        res.send({status: 'ok', message: '删除成功！'});
    }
}
module.exports = proxy;