const express = require('express')
const server = express()
const routes = require('./routes')
const path = require('path')

//Template Engine
server.set('view engine', 'ejs')

// Mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

//habilitando arquivos estaticos na pasta public
server.use(express.static("public"))

//Habilita o req.body
server.use(express.urlencoded({extended:true}))

//Rotas
server.use(routes)


server.listen(3000)