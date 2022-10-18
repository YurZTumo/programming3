var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var fs = require("fs")
app.use(express.static("."))

app.get('/', function (req,res){
   res.redirect('index.html')
})

server.listen(3000, ()=> {
    console.log("server run");
})

function matrixGenerate(matLength, gr, grEat, pred, ven, hun) {
    let matrix = []
    for (let i = 0; i < matLength; i++) {
        matrix.push([])
        for (let j = 0; j < matLength; j++) {
            matrix[i].push(0)
        }
    }

    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLength)
        let y = Math.floor(Math.random() * matLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLength)
        let y = Math.floor(Math.random() * matLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matLength)
        let y = Math.floor(Math.random() * matLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }

    for (let i = 0; i < ven; i++) {
        let x = Math.floor(Math.random() * matLength)
        let y = Math.floor(Math.random() * matLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    } 
    for (let i = 0; i < hun; i++) {
        let x = Math.floor(Math.random()*matLength)
        let y = Math.floor(Math.random()*matLength)
        if(matrix[y][x] == 0) {
        matrix[y][x] = 5
        }
        }
    return matrix
}
matrix = matrixGenerate(20, 18, 9, 7, 5, 5)

io.sockets.emit("send matrix", matrix)

let grassArr = []
let grassEaterArr = []
let PredatorArr = []
let VenomArr = []
let HunterArr = []









