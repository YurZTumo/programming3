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
matrix = matrixGenerate(20, 5, 4, 3, 2, 1)

io.sockets.emit("send matrix", matrix)

grassArr = []
grassEaterArr = []
PredatorArr = []
VenomArr = []
HunterArr = []

Grass = require("./grass");
GrassEater = require("./grassEater");
Predator = require("./predator")
Venom = require("./venom")
Hunter = require("./hunter")



function createObject(){
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            } else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y)
                PredatorArr.push(gr)
            } else if (matrix[y][x] == 4) {
                let gr = new Venom(x, y)
                VenomArr.push(gr)
            } else if (matrix[y][x] == 5) {
                let gr = new Hunter(x, y)
                HunterArr.push(gr)
            }
        }
    }
    io.sockets.emit('send matrix', matrix)

}



function game(){
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul()
    }

    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat()
    }

    for (let i = 0; i < PredatorArr.length; i++) {
        PredatorArr[i].eat()
    }

    for (let i = 0; i < VenomArr.length; i++) {
        VenomArr[i].eat()
    }

    for (let i = 0; i < HunterArr.length; i++) {
        HunterArr[i].eat()
    }

    io.sockets.emit('send matrix', matrix)
}

setInterval(game, 200)

io.on('connection', () => {
    createObject()
  });

  var statistics = {};

  setInterval(function(){
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.Predator = PredatorArr.length;
    statistics.Venom = VenomArr.length;
    statistics.Hunter = HunterArr.length;
  })

  fs.writeFile("statistics.json", JSON.stringify(statistics),function(){
      console.log("send")
  }
  )