import * as ShipFile from "./ship.js"


// console.log(trojka.hit(0))
// console.log(trojka.hit(1))
// // console.log(trojka.hlet trojka = Ship(3,0)
// console.log(trojka.hit(0))
// console.log(trojka.hit(1))
// // console.log(trojka.hit(2))
// isSunk(trojka)

// console.log(trojka)

//      2 Gameboard

let Gameboard = function(ships){

    let gridCol = [
        {
            A:'1',
            grids: [1,2,3,4,5,6,7,8,9,10]
        },
        {
            B:'2',
            grids: [1,2,3,4,5,6,7,8,9,10]
        },
        {
            C:'3',
            grids: [1,2,3,4,5,6,7,8,9,10]
        },
        {
            D:'4',
            grids: [1,2,3,4,5,6,7,8,9,10]
            
        },
        {
            E:'5',
            grids: [1,2,3,4,5,6,7,8,9,10]
        },
        {
            F:'6',
            grids: [1,2,3,4,5,6,7,8,9,10]
        },
        {
            G:'7',
            grids: [1,2,3,4,5,6,7,8,9,10]
        },
        {
            H:'8',
            grids: [1,2,3,4,5,6,7,8,9,10]
        },
        {
            I:'9',
            grids: [1,2,3,4,5,6,7,8,9,10]
        },
        {
            J:'10',
            grids: [1,2,3,4,5,6,7,8,9,10]
        },
    
    
    ]

    let cordsadd = function(x,y,ar){
        let arr = [];
        arr.push(x,y)
        ar.push(arr)
        return ar
    }


    let shipList = []
    let missedHits = []
    let destroyedShips = []

    //2.2
    let placeShip = function(ship){
        let shipLen = ship.len
        let yPos = ship.y
        let xPos = ship.x
        let shipO = ship.o
        let checkIndexY = gridCol[yPos-1].grids.indexOf(xPos)
        let cords = ship.shipCords
        shipList.push(ship)
    
        // y= column
        // x = item in a column

        //add logic that check if u have enough fields
        if (shipO == 'v'){
            if (checkIndexY==-1 || (xPos +shipLen)>11){
                console.log("taken or too long")
            }else{
                for (let a = 0; a<shipLen; a++){
                    let xPosa = xPos+a
                    let checkIndexYToCut = gridCol[yPos-1].grids.indexOf(xPosa)
                    gridCol[yPos-1].grids.splice(checkIndexYToCut,1)
                    cordsadd(xPosa,yPos,cords)


                    //populate left
                    if(yPos==1){
                        console.log("cant go to the left")
                    }else{
                    let rowleft = gridCol[yPos-2].grids.indexOf(xPosa)
                    gridCol[yPos-2].grids.splice(rowleft,1)
                    }

                    //populate right
                    if (yPos==10){
                        console.log('cant go to the right')
                    } else{
                        let rowright = gridCol[yPos].grids.indexOf(xPosa)
                        gridCol[yPos].grids.splice(rowright,1)
                    }
                }
                //-1 in same row
                if (xPos ==1 ){
                    console.log('cant go higher')
                }
                else{
                    let checkIndexY1sub = gridCol[yPos-1].grids.indexOf(xPos-1)
                    gridCol[yPos-1].grids.splice(checkIndexY1sub,1)
                }
                //+1 in the same row
                if (xPos + shipLen>10){
                    console.log("cant go any lower")
                }else{
                    let checkIndexY1add = gridCol[yPos-1].grids.indexOf(xPos+shipLen)
                    gridCol[yPos-1].grids.splice(checkIndexY1add,1)
                }
                // to the left -1 +1
                if (yPos==1){
                    console.log('cant go to the left')
                }else{
                    let checkIndexY1subL = gridCol[yPos-2].grids.indexOf(xPos-1)
                    gridCol[yPos-2].grids.splice(checkIndexY1subL,1)

                    let checkIndexY1addL = gridCol[yPos-2].grids.indexOf(xPos+shipLen)
                    gridCol[yPos-2].grids.splice(checkIndexY1addL,1)
                }
                //to the right 1- +1
                if(yPos==10){
                    console.log("cant go to the right")
                }else{
                    let checkIndexY1addR = gridCol[yPos].grids.indexOf(xPos+shipLen)
                    gridCol[yPos].grids.splice(checkIndexY1addR,1)

                    let checkIndexY1subr = gridCol[yPos].grids.indexOf(xPos-1)
                    gridCol[yPos].grids.splice(checkIndexY1subr,1)
                }
            }
        } else{
            if (checkIndexY==-1 || (yPos +shipLen)>11){
                console.log('too long or taken')

            } else{
                //take the length of a ship in horz
                for (let a = 0; a<shipLen; a++){
                    let yPosa = yPos+a
                    let checkIndexXToCut = gridCol[yPosa-1].grids.indexOf(xPos)
                    gridCol[yPosa-1].grids.splice(checkIndexXToCut,1)
                    cordsadd(yPosa,xPos,cords)

                    //populate row above in same length
                    if (xPos == 1){
                        console.log('cant go higher')
                    } else{
                        let checkIndexXToCutUp = gridCol[yPosa-1].grids.indexOf(xPos-1)
                        gridCol[yPosa-1].grids.splice(checkIndexXToCutUp,1)
                    }

                    //populate row below in same length
                    if(xPos==10){
                        console.log("cant go any lower")
                    } else{
                        let checkIndextoCutDown = gridCol[yPosa-1].grids.indexOf(xPos+1)
                        gridCol[yPosa-1].grids.splice(checkIndextoCutDown,1)
                    }
                }

                //populate left in same row + 1 -1
                if(yPos==1){
                    console.log("cant go to the left")
                }else{

                let ColLeft = gridCol[yPos-2].grids.indexOf(xPos)
                gridCol[yPos-2].grids.splice(ColLeft,1)

                let ColLeftadd = gridCol[yPos-2].grids.indexOf(xPos-1)
                gridCol[yPos-2].grids.splice(ColLeftadd,1)

                let ColLeftsub = gridCol[yPos-2].grids.indexOf(xPos+1)
                gridCol[yPos-2].grids.splice(ColLeftsub,1)
 
                }

                //populate right in the same row +1 -1 
                if (yPos==10){
                    console.log('cant go to the right')
                } else{
                    let colRight = gridCol[yPos+shipLen-1].grids.indexOf(xPos)
                    gridCol[yPos+shipLen-1].grids.splice(colRight,1)

                    let colRightadd = gridCol[yPos+shipLen-1].grids.indexOf(xPos-1)
                    gridCol[yPos+shipLen-1].grids.splice(colRightadd,1)

                    let ColRightsub = gridCol[yPos+shipLen-1].grids.indexOf(xPos+1)
                    gridCol[yPos+shipLen-1].grids.splice(ColRightsub,1)
                }    
            }
        }

    }

    function isArrayInArray(arr,item){
        let item_as_string = JSON.stringify(item)

        var contains = arr.some(function(ele){
            return JSON.stringify(ele) === item_as_string
        });
        return contains;
    }

    let receiveAttack = function(x,y){
        let checkY = gridCol[y-1]
        let checkX = gridCol[y-1].grids.indexOf(x)
        let finalX = gridCol[y-1].grids[checkX]
        let refList = [y,x]

        if (finalX ==undefined){
            console.log('ship or space arround ship')
            for (let a=0; a<shipList.length;a++){

                if (isArrayInArray(shipList[a].shipCords,refList) ==true){
                    console.log('u hit the ship!')
                    shipList[a].hit(refList)
                    if (shipList[a].sunky(refList)==true){
                        shipList[a].sunk = true
                        destroyedShips.push(shipList[a])
                        countDestroyedShips()
                    }                  
                }
            }
        } else{
            console.log('miss!')
            cordsadd(x,y,missedHits)
        }
    }

    let countDestroyedShips = function(){
        if (destroyedShips.length == 5){
            console.log('all ships has been destroyed')
        }
    };

    return {shipList,placeShip,gridCol,receiveAttack, missedHits,destroyedShips}
}
// ship len y x o
let game1 = Gameboard()




// ships

let Carrier = ShipFile.Ship(5)
let BattleShip  = ShipFile.Ship(4)
let Cruiser = ShipFile.Ship(3)
let Submarine = ShipFile.Ship(3)
let Destroyer = ShipFile.Ship(2,1,1,'v')

game1.placeShip(Destroyer)
game1.receiveAttack(1,1)
// game1.receiveAttack(1,2)


