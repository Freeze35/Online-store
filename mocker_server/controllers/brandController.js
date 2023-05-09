
const fs = require("fs");
const path = require("path");
let allBrands = JSON.parse(fs.readFileSync(path.join(__dirname, "./../mocker/brandApi.json"), "utf-8"));

class brandController {


    async create(req,res){
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
            res.status(409).send({message: "Already exists brand"})
        }
    }
    async getAll(req,res){
        return res.json(allBrands)
    }
}
module.exports = new brandController()