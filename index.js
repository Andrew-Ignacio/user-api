// Biblitecas
require('dotenv-safe').config();
const express = require('express')
const bodyParser = require('body-parser')

// Constantes
const app = express()
const port = 3000 || process.env.PORT
const router = require('./router')

// Configurações
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/', router)

// Servidor
app.listen(3000, () => console.log('Servidor Rodando...'))
