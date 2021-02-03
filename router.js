// Bibliotecas
const express = require('express')
const router = express.Router()

// Controllers
const UsersController = require('./controllers/UsersController')

// Middlewares
const adminAuth = require('./middlewares/adminAuth')

// Rotas
router.get('/users', adminAuth, UsersController.findAll)
router.post('/user', UsersController.create)
router.get('/user/:id', UsersController.findById)
router.delete('/user/:id', UsersController.delete)
router.put('/user/:id', UsersController.update)
router.post('/login', UsersController.login)

module.exports = router
