//3 create player
let Player = function(name){
    let shoot = function(x,y){
        console.log(x,y)
        // game1.receiveAttack(x,y)

    }

    return{ name,shoot}
}

export {Player}