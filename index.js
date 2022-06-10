const { server } = require('./src/modules/server')
const { userController } = require('./src/router/users.router')
const { notesController } = require('./src/router/notes.router')

server.listen(3500, () => {
    userController('/users')
    notesController('/notes')
    console.log('listening on 3500')
})