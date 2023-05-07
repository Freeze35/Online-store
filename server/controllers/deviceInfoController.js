const {DeviceInfo} = require("../models/models")
const ApiError = require("../error/ApiError")
class deviceInfoController {
    async create(req,res,next){
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
    }
    async getAll(req,res){
        let {deviceID,limit,page} =req.query
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

        return res.json(devices)
    }
    async getOne(req, res) {
        const {id} = req.params
        const device = await DeviceInfo.findOne(
            {
                where: {id}
            }
        )
        return res.json(device)
    }

    async deleteOne(req, res) {
        const {id} = req.params
        const device = await DeviceInfo.destroy(
            {
                where: {id}
            }
        )
        return res.json(device)
    }

    async updateInfo(req, res, next){
        try {
            const {info,deviceId,infoId} = req.body
            let parseinfo = JSON.parse(info)// преобразовываем к JSON объекту
            parseinfo.forEach(i =>
                DeviceInfo.update({
                    title:i.title,
                    description: i.description,
                    deviceId: deviceId
                },
                {
                    where: {id:infoId}
                }
                )
            )
            return res.json(parseinfo)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new deviceInfoController()