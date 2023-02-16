const {Device,DeviceInfo} = require("../models/models")
const ApiError = require("../error/ApiError")
const path = require("path")
const uuid = require("uuid")
class deviceController {
    async create(req,res,next){
        try {


            const {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".png" // для создания уникального имения для img файла
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
            }

            return res.json(device)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res){
        let {brandId,typeId,limit,page} =req.query
        page = page || 5
        limit = limit || 10
        let offset = page * limit - limit
        let devices
        if(!brandId && !typeId){
            devices = await Device.findAndCountAll({limit, offset})
        }
        if(brandId && !typeId){
            devices = await Device.findAndCountAll({where:{brandId},limit, offset})
        }
        if(!brandId && typeId){
            devices = await Device.findAndCountAll({where:{typeId},limit, offset})
        }
        if(brandId && typeId){
            devices = await Device.findAndCountAll({where:{brandId, typeId},limit, offset})
        }
        return res.json(devices)
    }
    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            }
        )
        return res.json(device)
    }

    async deleteOne(req, res) {
        const {id} = req.params
        const device = await Device.destroy(
            {
                where: {id},
            }
        )
        return res.json(device)
    }
}
module.exports = new deviceController()