const { server, upload } = require('../modules/server')
const { users } = require('../../models')
const fs = require("fs")
const DIR = "uploads/"

async function userController(url){
    server.post(url, upload.single('image'), async (req, res) => {
        let filename = DIR + Date.now() + req.file.originalname
        try {
            fs.renameSync(DIR + req.file.filename, filename)
            req.body.image = filename
            let user = await users.create(req.body)
            res.json(user)
        } catch (e) {
            fs.unlinkSync(filename)
            console.log(e)
            res.status(500).json({ message: 'Internal server error' })
        }
    })

    server.get(url, async (req, res) => {
        try {
            let user = await users.findAll()
            res.json(user)
        } catch (e) {
            console.log(e)
            res.status(404).json({ message: 'Ressource not found' })
        }   
    })

    server.get(url + '/:id', async (req, res) => {
        try {
            let user = await users.findOne({ where: { id: req.params.id } })
            res.json(user)
        } catch (e) {
            res.status(404).json({ message: 'Ressource not found!' })
        }
    })

    server.get(url + '/login/:name', async (req, res) => {
        try {
            let user = await users.findOne({ where: { name: req.params.name } })
            res.json(user)
        } catch (e) {
            res.status(404).json({ message: 'Ressource not found!' })
        }
    })

    server.put(url + '/update/:id', async (req, res) => {
        try {
            let user = await users.update(req.body, { where: { id: req.params.id } })
            res.json(user)
        } catch (e) {
            res.status(500).json({ message: 'internal server error' })
        }
    })
    
    server.delete(url + '/delete/:id', async (req, res) => {
        try {
            await users.destroy({ where: { id: req.params.id } })
            res.json({ message: 'Ressource deleted' })
        } catch (e) {
           // res.status(500).json({message: 'internal server error'})           
        }
    })
}

module.exports = {userController}