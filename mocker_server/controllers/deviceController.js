const path = require("path")
const fs = require("fs");
const {v4: uuidv4} = require("uuid");

let allDevices = JSON.parse(fs.readFileSync(path.join(__dirname, "./../mocker/devicesApi.json"), "utf-8"));
let allDeviceInfo = JSON.parse(fs.readFileSync(path.join(__dirname, "./../mocker/deviceInfo.json"), "utf-8"));

class deviceController {
    async create(req,res){
        const {name,typeModel, price, brandId, typeId, info} = req.body
        let fileName = uuidv4() + ".png" // для создания уникального имения для img файла
        const img = req.files.img
        await img.mv(path.resolve(__dirname, '..', 'static', fileName))
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
                    "typeModel": typeModel,
                    "price": ~~price,
                    "rating": 0,
                    "img": fileName,
                    "createdAt": new Date().toISOString(),
                    "updatedAt": new Date().toISOString(),
                    "typeId": ~~typeId,
                    "brandId": ~~brandId

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

            fs.writeFileSync(path.join(__dirname, "./../mocker/deviceInfo.json"),
                JSON.stringify(allDeviceInfo, null, 2), "utf-8");

            fs.writeFileSync(path.join(__dirname, "./../mocker/devicesApi.json"),
                JSON.stringify(allDevices, null, 2), "utf-8");

            res.status(200).send({message: "device added"})
        }
        else{
            res.status(409).send({message: "Already exists brand"})
        }
    }
    async getAll(req,res){
        return res.json(allDevices);
    }
    async getOne(req, res) {
        const {id} = req.params
        let dev = allDevices.rows.filter(dev => ~~dev.id === ~~id)[0]
        dev = {...dev, "info": [...allDeviceInfo.filter(info => ~~info.deviceId === ~~id)]}
        return res.json(dev)
    }

    /*async deleteOne(req, res) {
        const {id} = req.params
        const device = await Device.destroy(
            {
                where: {id},
            }
        )
        return res.json(device)
    }*/
}
module.exports = new deviceController()