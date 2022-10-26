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


function matrixGenerate(matLength, gr, grEat, pred, ven, hun, tr) {
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
    for (let i = 0; i < tr; i++) {
        let x = Math.floor(Math.random()*matLength)
        let y = Math.floor(Math.random()*matLength)
        if(matrix[y][x] == 0) {
        matrix[y][x] = 6
        }
        }
    return matrix
      }
    }
matrix = matrixGenerate(20, 10, 10, 10, 10, 10, 5)

io.sockets.emit("send matrix", matrix)

grassArr = []
grassEaterArr = []
predatorArr = []
venomArr = []
hunterArr = []
trashArr = []

weath = "winter";
Grass = require("./grass");
GrassEater = require("./grassEater");
Predator = require("./predator")
Venom = require("./venom")
Hunter = require("./hunter")
Trash = require("./trash")



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
                predatorArr.push(gr)
            } else if (matrix[y][x] == 4) {
                let gr = new Venom(x, y)
                venomArr.push(gr)
            } else if (matrix[y][x] == 5) {
                let gr = new Hunter(x, y)
                hunterArr.push(gr)
            }
            else if (matrix[y][x] == 6) {
                let gr = new Trash(x, y)
                trashArr.push(gr)
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

    for (let i = 0; i <predatorArr.length; i++) {
        predatorArr[i].eat()
    }

    for (let i = 0; i < venomArr.length; i++) {
        venomArr[i].eat()
    }

    for (let i = 0; i < hunterArr.length; i++) {
        hunterArr[i].eat()
    }
    for (let i = 0; i < trashArr.length; i++) {
       setInterval(()=>{
        trashArr[i].die()
       },5000)
    }
    io.sockets.emit('send matrix', matrix)
}

setInterval(game, 200)

///
function kill() {
    grassArr = [];
    grassEaterArr = []
    predatorArr = []
    venomArr = []
    hunterArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrass() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrassEater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addPredator() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            predatorArr.push(new Predator(x, y, 3))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addVenom() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            venomArr.push(new Venom(x, y, 4))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addHunter() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            hunterArr.push(new Hunter(x, y, 5))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addTrash() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6
            trashArr.push(new Trash(x, y, 6))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);
///
///
io.on('connection', (socket) => {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add predator", addPredator);
    socket.on("add venom", addVenom);
    socket.on("add hunter", addHunter);
    socket.on("add trash", addTrash);
  });

  var statistics = {};

  setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.Predator = predatorArr.length;
    statistics.Venom = venomArr.length;
    statistics.Hunter = hunterArr.length;
    statistics.Trash = trashArr.length
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)