// Importing the module
const express = require("express")
// Creating express Router
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', userController.check)

module.exports = router
