import * as ShipFile from "./ship.js"
import * as GameboardFile from "./Gameboard.js"
import * as playerFile from "./player.js"

let getRandom = function(min,max){
    return Math.floor(Math.random() *(max-min) +min)
}
///////////////////////////////////////


//      2 Gameboard


let game1 = GameboardFile.Gameboard()
game1.genGrid("boardPlayer",game1)

let gameAI = GameboardFile.Gameboard()
gameAI.genGrid("boardAI",gameAI)



// AI ships
//len , X , Y

let CarrierAI = ShipFile.Ship(5,4,3,'h')
gameAI.placeShip(CarrierAI)

let BattleShipAI  = ShipFile.Ship(4,3,5,'h')
gameAI.placeShip(BattleShipAI)

let CruiserAI = ShipFile.Ship(3,9,6,'v')
gameAI.placeShip(CruiserAI)

let SubmarineAI = ShipFile.Ship(3,1,1,'v')
gameAI.placeShip(SubmarineAI)

let DestroyerAI = ShipFile.Ship(2,2,7,'h')
gameAI.placeShip(DestroyerAI)

// let testAI = ShipFile.Ship(2,2,2,'v')
// gameAI.placeShip(testAI)


// Player ships


let Carrier = ShipFile.Ship(5)
let BattleShip  = ShipFile.Ship(4)
let Cruiser = ShipFile.Ship(3)
let Submarine = ShipFile.Ship(3)
let Destroyer = ShipFile.Ship(1,5,10,'v')

game1.placeShip(Destroyer)
// game1.receiveAttack(1,1)
// game1.receiveAttack(1,2)



// let ai = playerFile.Player('AI')

    
// console.log(ai.shoot(getRandom(1,10),getRandom(1,10)))







//status of your ships
let genShipGrid = function(playerID){
    let boardPlayer = document.getElementById(playerID)
    let shipDiv = document.createElement('div')
    shipDiv.className = 'shipDiv'
    boardPlayer.appendChild(shipDiv)
    for (let a = 0; a<5;a++){
        let shipGrid = document.createElement('div')
        shipGrid.className = 'shipGrid'
        shipDiv.appendChild(shipGrid)

        for(let b = 0 ;b<5;b++){
            let shipPartDiv = document.createElement('div')
            shipPartDiv.className = 'shipPart'
            shipGrid.appendChild(shipPartDiv)
        }
    }
    let shipDivNodes = shipDiv.childNodes
    shipDivNodes[0].id = 'Carrier'
    for (let a = 0; a<5;a++){
        (shipDivNodes[0].childNodes[a].id = 'alive')
    }
    
    shipDivNodes[1].id = 'BattleShip'
    for (let a = 0; a<4;a++){
        (shipDivNodes[1].childNodes[a].id = 'alive')
    }
    shipDivNodes[2].id = 'Cruiser'
    for (let a = 0; a<3;a++){
        (shipDivNodes[2].childNodes[a].id = 'alive')
    }
    shipDivNodes[3].id = 'Submarine'
    for (let a = 0; a<3;a++){
        (shipDivNodes[3].childNodes[a].id = 'alive')
    }
    shipDivNodes[4].id = 'Destroyer'
    for (let a = 0; a<2;a++){
        (shipDivNodes[4].childNodes[a].id = 'alive')
    }

}







// genShipGrid('boardPlayer')
// let game1 = GameboardFile.Gameboard()
// console.log(gameAI.shipList[0].o)
// console.log(gameAI.shipList[0].shipCords)
// console.log('-----------')
// console.log(gameAI.shipList[1].o)
// console.log(gameAI.shipList[1].shipCords)

//colour the ship fields - change the kek name
// let kek = gameAI.shipList
// let colorField = function(ship){

//     for (let a=0;a<ship.length;a++){
//         for(let b=0;b<ship[a].shipCords.length;b++){
//             let roww = ship[a].shipCords[b][0]
//             let coll  = ship[a].shipCords[b][1]
//             let combinee =  `[data--y-x="`+coll+`,`+roww+'"'+']'
//             let shipfieldd = document.querySelector(combinee)
//             shipfieldd.dataset.color = 'red'
//         }
//     }



    
    
// }
// colorField(gameAI.shipList)

// color the takenfields of gameboard func
let colorTakenFields = function(inputBoard){

    if (inputBoard==gameAI){

        for (let a=0; a<inputBoard.takenFields.length;a++){

            let x = inputBoard.takenFields[a][0]
            let y = inputBoard.takenFields[a][1]
            let combinee =  `[data--y-x="`+y+`,`+x+'"'+']'
            let shipfieldd = document.querySelectorAll(combinee)
            shipfieldd[1].dataset.color = 'taken'


        }

        for (let a=0; a<inputBoard.missedHits.length;a++){
            let x = inputBoard.missedHits[a][0]
            let y = inputBoard.missedHits[a][1]
            let combinee =  `[data--y-x="`+y+`,`+x+'"'+']'
            let shipfieldd = document.querySelectorAll(combinee)
            shipfieldd[1].dataset.color = 'missed'
            
        } 

        for (let a=0;a<inputBoard.shipList.length;a++){
            for(let b=0;b<inputBoard.shipList[a].shipCords.length;b++){
                let roww = inputBoard.shipList[a].shipCords[b][0]
                let coll  = inputBoard.shipList[a].shipCords[b][1]
                let combinee =  `[data--y-x="`+coll+`,`+roww+'"'+']'
                let shipfieldd = document.querySelectorAll(combinee)
                shipfieldd[1].dataset.color = 'ship'
            }
        }
        for (let a=0; a<inputBoard.hittedCords.length;a++){

            let x = inputBoard.hittedCords[a][0]
            let y = inputBoard.hittedCords[a][1]
            let combinee =  `[data--y-x="`+y+`,`+x+'"'+']'
            let shipfieldd = document.querySelectorAll(combinee)
            shipfieldd[1].dataset.color = 'hitted'
        }
 
    } else if(inputBoard=game1){

        for (let a=0; a<inputBoard.takenFields.length;a++){

            let x = inputBoard.takenFields[a][0]
            let y = inputBoard.takenFields[a][1]
            let combinee =  `[data--y-x="`+y+`,`+x+'"'+']'
            let shipfieldd = document.querySelectorAll(combinee)
            shipfieldd[0].dataset.color = 'taken'


        }

        for (let a=0; a<inputBoard.missedHits.length;a++){
            let x = inputBoard.missedHits[a][0]
            let y = inputBoard.missedHits[a][1]
            let combinee =  `[data--y-x="`+y+`,`+x+'"'+']'
            let shipfieldd = document.querySelectorAll(combinee)
            shipfieldd[0].dataset.color = 'missed'
            
        } 

        for (let a=0;a<inputBoard.shipList.length;a++){
            for(let b=0;b<inputBoard.shipList[a].shipCords.length;b++){
                let roww = inputBoard.shipList[a].shipCords[b][0]
                let coll  = inputBoard.shipList[a].shipCords[b][1]
                let combinee =  `[data--y-x="`+coll+`,`+roww+'"'+']'
                let shipfieldd = document.querySelectorAll(combinee)
                shipfieldd[0].dataset.color = 'ship'
            }
        }
        for (let a=0; a<inputBoard.hittedCords.length;a++){

            let x = inputBoard.hittedCords[a][0]
            let y = inputBoard.hittedCords[a][1]
            let combinee =  `[data--y-x="`+y+`,`+x+'"'+']'
            let shipfieldd = document.querySelectorAll(combinee)
            shipfieldd[0].dataset.color = 'hitted'
        }
    }

}

// let colorMissedHits = function(inputBoard){

//     for (let a=0; a<inputBoard.missedHits.length;a++){
//         let x = inputBoard.missedHits[a][0]
//         let y = inputBoard.missedHits[a][1]
//         let combinee =  `[data--y-x="`+y+`,`+x+'"'+']'
//         let shipfieldd = document.querySelector(combinee)
//         shipfieldd.dataset.color = 'missed'
        
//     } 

// }

let colorHittedCords = function(inputBoard){

}


let effe = (function(){
    colorTakenFields(game1)
    colorTakenFields(gameAI)
    console.log(gameAI)
    // console.log(game1.takenFields)
    // console.log(gameAI.takenFields)
    // colorMissedHits(gameAI)
})();



let getCords = function(grid,value){
    let cords = value
    console.log(cords)
    return cords
}

let counter = {counter:0}
// let countingSteps = function(counter,action){
//     if (action == 'add'){
//         counter.counter = 1
//     } else if(action =='sub'){
//         counter.counter = 0
//     }
// }



let hover = (function(e){
    let test = document.querySelectorAll('.board')
    console.log(test[0])
    //distingush for highlight for left and right (players AI)
    let gridRHL = document.querySelectorAll('.gridR')


    gridRHL.forEach(function(e){

        e.addEventListener('mouseenter',function(event){
            if (e.classList!='selected'){
           e.classList = 'high'
        }
        })
        e.addEventListener('mouseleave',function(event){
            if (e.classList!='selected'){
            e.classList = "gridR"
            }
        })

        e.addEventListener("click",function(event){

            if(counter.counter==0){
            e.classList = 'selected'
            counter.counter++
            let cords2shoot = e.dataset["YX"]
// if grid of AI than update AI grid with values and trigger shoot with shoot function

            let x = e.dataset['X']
            let y = e.dataset['Y']

            gameAI.targetShoot(x,y)
            console.log(gameAI.tempShoot) 
            
        }else{
        }
        })
    })

})();


let shootButton = document.getElementById('shoot')
shootButton.addEventListener('click',function(){

    // setup the way that the users can switch the shooting stuff

    let x = gameAI.tempShoot[0]
    let y = gameAI.tempShoot[1]
    console.log(gameAI.tempShoot) 
    gameAI.tempShoot.pop()
    gameAI.tempShoot.pop()
    console.log(gameAI.tempShoot) 
    gameAI.receiveAttack(x,y)

    let selectedErease = document.querySelector('.selected').classList = 'gridR'
    counter.counter=0
    colorTakenFields(gameAI)

    // console.log(gameAI)

})


let upButton = document.getElementById('up')
upButton.addEventListener('click',function(){
    // console.log(gameAI.shipList[0].shipCords)
    // console.log(gameAI.shipList[0].hittedCords)
    // console.log(gameAI.missedHits)
})



// let eff = (function(){
//     console.log(gameAI.shipList[0].shipCords)
//     console.log(gameAI.shipList[0].hittedCords)
// })();
