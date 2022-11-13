import * as ShipFile from "./ship.js"
import * as GameboardFile from "./Gameboard.js"
import * as playerFile from "./player.js"

let getRandom = function(min,max){
    return Math.floor(Math.random() *(max-min) +min)
}
///////////////////////////////////////


//      2 Gameboard
let gameAI 
let start_button = document.getElementById('start--button')

let startGame = {start:false}
let setStartGameTrue = function(obj,val){
    return obj.start = val
}

let counterGrid = {counter:0}
start_button.addEventListener('click',function(){
    let counter = {counter:0}
    let game1 = GameboardFile.Gameboard()
    if (counterGrid.counter==0){

        game1.genGrid("boardPlayer",game1)
        game1.genShipGrid('ships--containter')

    }
    counterGrid.counter++
    let placeButton = document.querySelectorAll('.place--button')
    placeButton.forEach(function(e){
    e.addEventListener('click',function(){
        let xVal = Number(e.parentElement.childNodes[1].value)
        let yVal = Number(e.parentElement.childNodes[3].value)
        let oVal = e.parentElement.childNodes[5].value
        let idVal = e.parentElement.parentElement.childNodes[0].id
       
        if(idVal=='Carrier'){
            // console.log(xVal,yVal,oVal)
            let Carrier = ShipFile.Ship(5,xVal,yVal,oVal)
            game1.placeShip(Carrier)
            colorTakenFields(game1,"game1") 
            counter.counter++
            e.parentElement.classList.add('hidden')
   

        } else if (idVal =='BattleShip'){
            let BattleShip = ShipFile.Ship(4,xVal,yVal,oVal)
            game1.placeShip(BattleShip)
            colorTakenFields(game1,"game1")  
            counter.counter++
            e.parentElement.classList.add('hidden')
            console.log(e.parentElement)

        } else if (idVal =='Cruiser'){
            let Cruiser = ShipFile.Ship(3,xVal,yVal,oVal)
            game1.placeShip(Cruiser)
            colorTakenFields(game1,"game1") 
            counter.counter++
            e.parentElement.classList.add('hidden')

        } else if (idVal =='Submarine'){
            let Submarine = ShipFile.Ship(3,xVal,yVal,oVal)
            game1.placeShip(Submarine)
            colorTakenFields(game1,"game1")
            counter.counter++
            e.parentElement.classList.add('hidden')

        } else if (idVal =='Destroyer'){
            let Destroyer = ShipFile.Ship(2,xVal,yVal,oVal)
            game1.placeShip(Destroyer)
            colorTakenFields(game1,"game1")  
            counter.counter++
            e.parentElement.classList.add('hidden')

        }

        if (counter.counter==5){
            gameAI = GameboardFile.Gameboard()
            gameAI.genGrid("boardAI",gameAI)
            
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
            colorTakenFields(gameAI,"gameAI")  
            hoverAI(gameAI)
 

        }

        })
    })



})


let hoverAI = function(){

    let gridRHL = document.querySelectorAll('.gridR_boardAI')


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

            
        }else{
        }
        })
    })

};

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
    colorTakenFields(gameAI,'gameAI')

    // console.log(gameAI)

})

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
let colorTakenFields = function(inputBoard,name){

    if (name=="gameAI"){

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
 
    } else if(name=="game1"){

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










// let upButton = document.getElementById('up')
// upButton.addEventListener('click',function(){
//     // console.log(gameAI.shipList[0].shipCords)
//     // console.log(gameAI.shipList[0].hittedCords)
//     // console.log(gameAI.missedHits)
// })



// let eff = (function(){
//     console.log(gameAI.shipList[0].shipCords)
//     console.log(gameAI.shipList[0].hittedCords)
// })();


// 1st step of your game placeships on your grid 
// create start button 





// u shoot first 
// than ai turn to shoot

// let effe = (function(){
//     if (startGame.start=true){

//     } else {
//     colorTakenFields(game1,"game1")
//     colorTakenFields(gameAI,"gameAI")
// }

// })();





