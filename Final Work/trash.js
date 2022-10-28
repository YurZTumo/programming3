let LivingCreature = require('./LivingCreature')

module.exports = class Trash extends LivingCreature {
    constructor(x, y) {
       super(x,y)
        setTimeout(()=>{
            this.die()
        },5000);
    }


    mul() {
        this.multiply++
        let emptyCells = this.chooseCell(0)
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (this.multiply >= 8 && newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 6
            let newGr = new Trash(newX, newY)
            trashArr.push(newGr)
            this.multiply = 0
        }
    }

    die() {
        if (typeof this.x == "undefined" || typeof this.y == "undefined"){
            return
        }
        matrix[this.y][this.x] = 0
        for (var i in trashArr) {
       
            if (this.x ==trashArr[i].x && this.y == trashArr[i].y) {
                trashArr.splice(i, 1);
                break;
            }
              

        }
    }

}