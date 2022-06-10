const { server, upload } = require('../modules/server')
const { notes } = require('../../models')
const fs = require("fs")
const DIR = "uploads/"

async function notesController(url) {
    server.post(url, upload.single('noteImg'), async (req, res) => {
        if(req.file) {
            let filename = DIR + Date.now() + req.file.originalname
            fs.renameSync(DIR + req.file.filename, filename)
            req.body.noteImg = filename
        }

        try{
            let note = await notes.create(req.body)
            res.json(note)
        }
        catch(e){
            console.log(e)
            res.status(500).json({ message: 'Internal server error' })
        }
    })

    server.get(url, async (req, res) => {
        try {
            let note = await notes.findAll()
            res.json(note)
        } catch (e) {
            res.status(404).json({ message: 'Ressource not found' })
        }   
    })

    server.get(url + '/:id', async (req, res) => {
        try {
            let note = await notes.findOne({ where: { id: req.params.id } })
            res.json(note)
        } catch (e) {
            res.status(404).json({ message: 'Ressource not found!' })
        }
    })

    server.get(url + '/use/:id', async (req, res) => {
        try {
            let note = await notes.findAll({ where: { idusers: req.params.id } })
            res.json(note)
        } catch (e) {
            res.status(404).json({message: 'Ressource not found!'})
        }
    })

    server.put(url + '/update/:id', async (req, res) => {
        try {
            let note = await notes.update(req.body, { where: { id: req.params.id } })
            res.json(note)
        } catch (e) {
            res.status(500).json({ message: 'internal server error' })
        }
    })

    server.delete(url + '/delete/:id', async (req, res) => {
        try {
            let note = await notes.findOne({ where: { id: req.params.id } })
            console.log(note)
            if(note.noteImg) fs.unlinkSync(note.noteImg)
            await notes.destroy({ where: { id: req.params.id } })
            res.json({ message: 'Ressource deleted' })
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'internal server error' })
        }
    })

    server.delete(url + '/deleteUse/:id', async (req, res) => {
        try {
            await notes.destroy({ where: { idusers: req.params.id } })
            res.json({ message: 'Ressource deleted' })
        } catch (e) {
           // res.status(500).json({message: 'internal server error'})           
        }
    })
}

module.exports = {notesController}