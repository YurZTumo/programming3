var socket = io()



var side = 20;
var weath = "winter";
socket.on("weather", function (data) {
    weath = data;
})

function setup() {
    createCanvas(30 * side,30 * side);
}

function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if(weath == "summer") {
                    fill("green");
                }else if (weath == "autumn") {
                    fill("orange");
                }else if (weath == "winter") {
                    fill("white");
                }else if (weath == "spring") {
                    fill("#4dffa6");
                };
            } else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("black");
            } else if (matrix[y][x] == 5) {
                fill("#964B00")
            } else if (matrix[y][x] == 6) {
                fill("grey")
            };
            rect(x * side, y * side, side, side);
        }
    }
}


socket.on('send matrix', nkarel)

function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addPredator(){
    socket.emit("add predator")
}
function addVenom() {
    socket.emit("add venom")
}
function addHunter() {
    socket.emit("add hunter")
}
function addTrash() {
    socket.emit("add trash")
}