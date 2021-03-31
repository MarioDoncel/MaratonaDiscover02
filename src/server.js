const express = require('express')
const server = express()
const routes = require('./routes')

//Template Engine
server.set('view engine', 'ejs')

//habilitando arquivos estaticos na pasta public
server.use(express.static("public"))

//Habilita o req.body
server.use(express.urlencoded({extended:true}))

//Rotas
server.use(routes)


server.listen(3000)