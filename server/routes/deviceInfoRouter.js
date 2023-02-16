const express = require("express")
const router = express.Router()
const deviceInfoController = require("../controllers/deviceInfoController")
router.post('/',deviceInfoController.create)
router.get('/',deviceInfoController.getAll)
router.get('/:id',deviceInfoController.getOne)
router.put('/:id',deviceInfoController.updateInfo)
router.delete('/:id',deviceInfoController.deleteOne)
module.exports = router