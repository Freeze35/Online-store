const {Basket, BasketDevice, PurchaseHistory} = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController{
    async CreateBasketDevices(req,res,next){
        try {
            const {basketData,basketId,totalAmount} = req.body
            //console.log(totalAmount)
            let purchaseHistory = await PurchaseHistory.create({totalAmount})
            let parseInfo = JSON.parse(basketData)// преобразовываем к JSON объекту
            parseInfo.forEach(i => {
                    BasketDevice.create({
                        name: i.name,
                        price: i.price,
                        numberOfDevices: i.numberOfDevices,
                        deviceId: i.deviceId,
                        basketId: basketId,
                        purchaseHistoryId: purchaseHistory.id
                    })
                }
            )
            return res.json(BasketDevice)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req,res){
        let basket = await Basket.findAndCountAll()
        return res.json(basket)
    }

    async getOne(req, res) {
        const {id} = req.params
        const basket = await Basket.findOne(
            {
                where: {id}
            }
        )
        return res.json(basket)
    }

    async deleteOne(req, res) {
        const {id} = req.params
        const basket = await BasketDevice.destroy(
            {
                where: {id}
            }
        )
        return res.json(basket)
    }

    async updateInfo(req, res, next){
        try {
            const {info,deviceId,infoId} = req.body
            let parseinfo = JSON.parse(info)// преобразовываем к JSON объекту
            parseinfo.forEach(i =>
                BasketDevice.update({
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

module.exports = new BasketController()