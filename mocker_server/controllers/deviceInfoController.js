
const fs = require("fs");
const path = require("path");

let allDeviceInfo = JSON.parse(fs.readFileSync(path.join(__dirname, "./../mocker/deviceInfo.json"), "utf-8"));

class deviceInfoController {
    async create(req,res){
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

        fs.writeFileSync(path.join(__dirname, "./../mocker/deviceInfo.json"),
            JSON.stringify(allDeviceInfo, null, 2), "utf-8");

        res.status(200).send({message: "Info added"})
    }
    async getAll(req,res){
        /*let {deviceID,limit,page} =req.query
        page = page || 1
        limit = limit || 8
        let offset = page * limit - limit
        let devices
        if(!deviceID){
            devices = await DeviceInfo.findAndCountAll()
        }
        if(deviceID){
            devices = await DeviceInfo.findAndCountAll({where:{deviceID},limit, offset})
        }
*/
        return res.json(allDeviceInfo)
    }
    async getOne(req, res) {
        const {id} = req.params
        //let dev = devices.rows.filter(dev => ~~dev.id === ~~id)[0]
        let dev = {...devicesInfo.filter(info => ~~info.deviceId === ~~id)}
        return res.json(dev)
    }

    async deleteOne(req, res) {
        const {id} = req.params
        const newDeviceInfo = allDeviceInfo.filter(devInfo =>
            ~~devInfo.id !== ~~id
        )

        fs.writeFileSync(path.join(__dirname, "./../mocker/deviceInfo.json"),
            JSON.stringify(newDeviceInfo, null, 2), "utf-8");

        // file written successfully
        res.status(200).json({message: "Info was deleted"});
    }

    async updateInfo(req, res){
        const {info} = req.body
        let parseInfo = JSON.parse(info)[0]// преобразовываем к JSON объекту

        let idChangeElem = allDeviceInfo.findIndex(devInfo =>
            ~~devInfo.id === ~~parseInfo.id
        )
        allDeviceInfo[idChangeElem].title = parseInfo.title
        allDeviceInfo[idChangeElem].description = parseInfo.description
        allDeviceInfo[idChangeElem].updatedAt = new Date().toISOString()

        fs.writeFileSync(path.join(__dirname, "./../mocker/deviceInfo.json"),
            JSON.stringify(allDeviceInfo, null, 2), "utf-8");

        return res.json(parseInfo)
    }
}
module.exports = new deviceInfoController()