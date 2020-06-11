const express = require('express')
const path = require('path')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get('/', (req,res) => {
    res.render('index.html')
})

app.get('/projetos', (req,res) => {
    res.render('projetos.html')
})

let messages = []

io.on('connect', socket => {
    socket.emit('previousMessage', messages)

    socket.on('sendMessage', data => {
        messages.push(data)
        socket.broadcast.emit('receivedMessage', data)
    })
})

server.listen(3000)