var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()

var server = app.listen(3001, () => {
    console.log('server is listening on port', server.address().port)
})

var io = require('socket.io').listen(server)

var messages = []

app.use(cors())
app.use(bodyParser.json());
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "http://localhost:3000");
    response.header("Access-Control-Allow-Credentials", "true");
    next();
  });

app.get('/messages', (req, res) => {
    res.send(messages)
})

app.post('/messages', (req, res) =>{
    var message = req.body
    message.id = messages.length
    messages.push(message)
    io.emit('message', message)
    res.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

