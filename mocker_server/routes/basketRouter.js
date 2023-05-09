const express = require("express")
const router = express.Router()
const basketController = require("../controllers/basketController")

router.post('/',basketController.CreateBasketDevices)
router.get('/',basketController.getAll)
router.get('/:id',basketController.getOne)
router.put('/:id',basketController.updateInfo)
router.delete('/:id',basketController.deleteOne)
module.exports = router