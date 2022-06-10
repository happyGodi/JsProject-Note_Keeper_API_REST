const express = require("express")
const cors = require("cors")
const multer = require("multer")
const upload = multer({ dest: 'uploads' })
const server = express()

server.use(cors())
server.use('/uploads', express.static('uploads'))
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

module.exports = { server, upload }