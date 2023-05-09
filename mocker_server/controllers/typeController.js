
const fs = require("fs");
const path = require("path");

let allTypes = JSON.parse(fs.readFileSync(path.join(__dirname, "./../mocker/typesApi.json"), "utf-8"));

class TypeController {
    async create(req, res) {
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
            fs.writeFileSync(path.join(__dirname, "./../mocker/typesApi.json"),
                JSON.stringify(allTypes, null, 2), "utf-8");
            res.status(200).send({message: "Brand added"})
        }
        else{
            res.status(409).send({message: "Already exists type"})
        }
    }

    async getAll(req, res) {
        return res.json(allTypes)
    }

}

module.exports = new TypeController()