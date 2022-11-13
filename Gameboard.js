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
    let tempShoot = []
    let takenFields = []
    let hittedCords = []

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
        if (shipO == 'h'){
            if (checkIndexY==-1 || (xPos +shipLen)>11){
                console.log("taken or too long")
            }else{
                //populate the length of ship
                for (let a = 0; a<shipLen; a++){
                    let xPosa = xPos+a
                    let checkIndexYToCut = gridCol[yPos-1].grids.indexOf(xPosa)
                    if (checkIndexYToCut == -1){
                        return
                    } else{
                    gridCol[yPos-1].grids.splice(checkIndexYToCut,1)
                    cordsadd(xPosa,yPos,cords)
                }

                    //populate above in the same spot
                    if(yPos==1){
                        // console.log(" cant go higher on Y")
                    }else{
                    let rowleft = gridCol[yPos-2].grids.indexOf(xPosa)
                    gridCol[yPos-2].grids.splice(rowleft,1)
                    cordsadd(xPosa,yPos-1,takenFields)
                    }

                    //populate below in the same spot
                    if (yPos==10){
                        // console.log('v cant go lower on Y')
                    } else{
                        let rowright = gridCol[yPos].grids.indexOf(xPosa)
                        let b = gridCol[yPos].grids.splice(rowright,1)
                        cordsadd(xPosa,yPos+1,takenFields)

                    }
                }


            // SAME SPOTS
                // -1 on x in the same spot Y
                if (xPos ==1 ){
                    // console.log('<- cant go further to the left on X to -1')
                }
                else{
                    let checkIndexY1sub = gridCol[yPos-1].grids.indexOf(xPos-1)
                    gridCol[yPos-1].grids.splice(checkIndexY1sub,1)
                    cordsadd(xPos-1,yPos,takenFields)
                }

                // +1 on x in the same spot Y
                if (xPos + shipLen>10){
                    // console.log("-> cant go further to the right on X to +1")
                }else{
                    let checkIndexY1add = gridCol[yPos-1].grids.indexOf(xPos+shipLen)
                    gridCol[yPos-1].grids.splice(checkIndexY1add,1)
                    cordsadd(xPos+shipLen,yPos,takenFields)
                }

            // ABOVE AND BELOW 
            
                // above Y -1 of x and  +1
                if (yPos==1){
                    // console.log('^ cant go higher on Y to -1')
                }else{
                    if (xPos ==1){
                        // console.log('Y-1 and X-1 is not possible')
                    } else{

                    if(xPos==10){
                        // console.log('Y-1 and X+1 is not possible')
                    }else{  
                    let checkIndexY1subL = gridCol[yPos-2].grids.indexOf(xPos-1)
                    gridCol[yPos-2].grids.splice(checkIndexY1subL,1)

                    cordsadd(xPos-1,yPos-1,takenFields)
                    }
                    }
                    //takin len of the ship
                    let checkIndexY1addL = gridCol[yPos-2].grids.indexOf(xPos+shipLen)
                    gridCol[yPos-2].grids.splice(checkIndexY1addL,1)
                    cordsadd(xPos+shipLen,yPos-1,takenFields)
                }
                
                //below Y -1 of x and  +1
                if(yPos==10){
                    // console.log("v cant go lower on Y to +1")
                }else{
                    if (xPos ==1){
                        // console.log('Y-1 and X-1 is not possible')
                    } else{
                    let checkIndexY1subr = gridCol[yPos].grids.indexOf(xPos-1)
                    gridCol[yPos].grids.splice(checkIndexY1subr,1)

                    cordsadd(xPos-1,yPos+1,takenFields)
                    }
                    if(xPos==10){
                        // console.log('Y-1 and X+1 is not possible')
                    }else{

                    let checkIndexY1addR = gridCol[yPos].grids.indexOf(xPos+shipLen)
                    gridCol[yPos].grids.splice(checkIndexY1addR,1)

                    cordsadd(xPos+shipLen,yPos+1,takenFields)
                }

                }
            }
        } else{
            if (checkIndexY==-1 || (yPos +shipLen)>11){
                // console.log('too long or taken')

            } else{
                //take the length of a ship in vert
                for (let a = 0; a<shipLen; a++){
                    let yPosa = yPos+a
                    let checkIndexXToCut = gridCol[yPosa-1].grids.indexOf(xPos)

                    if (checkIndexXToCut ==-1){
                        return
                    }else{
                    gridCol[yPosa-1].grids.splice(checkIndexXToCut,1)
                    cordsadd(xPos,yPosa,cords)
                    }   

                    //populate the column on the left -1
                    if (xPos == 1){
                        // console.log('<- cant go further to the left on x')
                    } else{
                        let checkIndexXToCutUp = gridCol[yPosa-1].grids.indexOf(xPos-1)
                        gridCol[yPosa-1].grids.splice(checkIndexXToCutUp,1)

                        cordsadd(xPos-1,yPosa,takenFields)
                    }

                    //populate the column on the right +1
                    if(xPos==10){
                        // console.log("-> cant go further to the right on x'")
                    } else{
                        let checkIndextoCutDown = gridCol[yPosa-1].grids.indexOf(xPos+1)
                        gridCol[yPosa-1].grids.splice(checkIndextoCutDown,1)
                        cordsadd(xPos+1,yPosa,takenFields)
                    }
                }

                //populate above in same X spot
                if(yPos==1){
                    // console.log("^ cant go higher  on Y - 1")
                }else{

                let ColLeft = gridCol[yPos-2].grids.indexOf(xPos)
                gridCol[yPos-2].grids.splice(ColLeft,1)
                
                
                cordsadd(xPos,yPos-1,takenFields)

                if(xPos==1){
                    // console.log('Y-1 and X-1 is not possible')
                }else{

                let ColLeftadd = gridCol[yPos-2].grids.indexOf(xPos-1)
                gridCol[yPos-2].grids.splice(ColLeftadd,1)

                cordsadd(xPos-1,yPos-1,takenFields)
                }

                if(xPos==10){
                    // console.log('Y-1 and X+1 is not possible')
                }else{
                let ColLeftsub = gridCol[yPos-2].grids.indexOf(xPos+1)
                gridCol[yPos-2].grids.splice(ColLeftsub,1)
                cordsadd(xPos+1,yPos-1,takenFields)
                }
                }

                //populate below in the same row +1 -1 
                if (yPos==10){
                    // console.log('v cant go lower to the right on Y + 1"')
                } else{
                    let colRight = gridCol[yPos+shipLen-1].grids.indexOf(xPos)
                    gridCol[yPos+shipLen-1].grids.splice(colRight,1)
                    cordsadd(xPos,yPos+shipLen,takenFields)

                    if(xPos==1){
                        // console.log('Y+1 and X-1 is not possible')
                    }else{
                    let colRightadd = gridCol[yPos+shipLen-1].grids.indexOf(xPos-1)
                    gridCol[yPos+shipLen-1].grids.splice(colRightadd,1)
                    cordsadd(xPos-1,yPos+shipLen,takenFields)
                    }

                    if(xPos==10){
                        // console.log('Y+1 and X+1 is not possible')
                    }else{
                    let ColRightsub = gridCol[yPos+shipLen-1].grids.indexOf(xPos+1)
                    gridCol[yPos+shipLen-1].grids.splice(ColRightsub,1)
                    cordsadd(xPos+1,yPos+shipLen,takenFields)
                    }
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


    let targetShoot = function(x,y){
        tempShoot.push(x,y)
    }

    let receiveAttack = function(x,y){
        let checkY = gridCol[y-1]
        let xox = Number(x)
        let yoy = Number(y)

        let finalX = gridCol[y-1].grids.includes(xox)
        let refList = [xox,yoy]

        if (finalX ==false){
            console.log('ship or space arround ship')
            for (let a=0; a<shipList.length;a++){

                if (isArrayInArray(shipList[a].shipCords,refList) ==true){
                    console.log('u hit the ship!')
                    shipList[a].hit(refList)
                    cordsadd(xox,yoy,hittedCords)

                    if (shipList[a].sunky(refList)==true){
                        shipList[a].sunk = true
                        destroyedShips.push(shipList[a])
                        countDestroyedShips()
                    }                  
                } else{
                    console.log('miss!')
                    cordsadd(x,y,missedHits)
                }
            }
        } else{
            console.log('miss!')
            cordsadd(x,y,missedHits)
        }
 
    }

    let countDestroyedShips = function(){
        if (destroyedShips.length == 1){
            console.log('all ships has been destroyed')
            alert('you Won!')
        }
    };

    let genGrid = (function(playerID,game){

        let boardPlayer = document.getElementById(playerID)
    
        let game1Grid =  game.gridCol
        let board = document.createElement('div')
        let boardTop = document.createElement('div')
        let boardLeft = document.createElement('div')
        
        board.id =  playerID+'HL'
        board.className = 'board'
    
        boardTop.className = 'boardTop'
        boardLeft.className = 'boardLeft'
    
    
        for (let a = 0; a < 10;a++ ){
            let game1DivC = document.createElement('div')
            game1DivC.id = 'gridC'+(a+1)
            game1DivC.className = 'gridC_'+playerID
            
            // game1DivC.innerHTML = a+1
            board.appendChild(game1DivC)
            boardPlayer.appendChild(board)
            for (let b=0; b<10 ; b++){
                let game1DivR = document.createElement('div')
                game1DivR.id = b+1
                game1DivR.className = 'gridR_'+playerID
                // game1DivR.innerHTML = ' _' 
                game1DivC.appendChild(game1DivR) 
                game1DivR.dataset.Y = a+1
                game1DivR.dataset.X = b+1
                game1DivR.dataset.YX = [a+1,b+1]
    
            }
        }
    
        for (let a = 0; a < 10;a++ ){
            let legendTop = document.createElement('div')
            legendTop.id = 'top'
            legendTop.className = 'legend'
            legendTop.innerHTML = a+1
            boardTop.appendChild(legendTop)
            boardPlayer.appendChild(boardTop)
            for (let b=0; b<1 ; b++){
                let legendLeft = document.createElement('div')
                legendLeft.id = a+1
                legendLeft.className = 'legend'
                legendLeft.innerHTML = a+1
                boardLeft.appendChild(legendLeft)
                boardPlayer.appendChild(boardLeft)
                
                
            }
        }
    })

    //status of your ships
    let genShipGrid = function(playerID){
    let boardPlayer = document.getElementById(playerID)
    let shipDiv = document.createElement('div')
    shipDiv.className = 'shipDiv'
    boardPlayer.appendChild(shipDiv)

    for (let a = 0; a<5;a++){
        let shipGrid = document.createElement('div')
        shipGrid.className = 'shipGrid'
        let cordsDiv = document.createElement('div')
        cordsDiv.className = 'cordsDiv'

        shipDiv.appendChild(shipGrid)


        let topShip = document.createElement('div')
        topShip.className = 'topShip'
        let bottomNav = document.createElement('div')
        bottomNav.className = 'bottomNav'
        shipGrid.appendChild(topShip)
        shipGrid.appendChild(bottomNav)



        let xSet = document.createElement('select')
        let xSetLabel = document.createElement('label')
        xSet.setAttribute('type','number')
        xSet.setAttribute('min','1')
        xSet.setAttribute('max','10')
        xSet.setAttribute('placeholder','1')
        xSetLabel.textContent='X'

        let ySet = document.createElement('select')
        let ySetLabel = document.createElement('label')
        ySet.setAttribute('type','number')
        ySet.setAttribute('min','1')
        ySet.setAttribute('max','10')
        ySet.setAttribute('placeholder','1')
        ySetLabel.textContent='Y'

        let oSet = document.createElement('select')
        let oSetLabel = document.createElement('label')
        oSet.setAttribute('type','number')
        
        oSet.setAttribute('placeholder','Vertical')
        oSetLabel.textContent='Orientation'

        bottomNav.appendChild(xSetLabel)
        bottomNav.appendChild(xSet)

        bottomNav.appendChild(ySetLabel)
        bottomNav.appendChild(ySet)

        bottomNav.appendChild(oSetLabel)
        bottomNav.appendChild(oSet)

        let placeButton = document.createElement('button')
        placeButton.textContent = 'Place Ship'

        placeButton.id ='place--button'+a
        placeButton.className ='place--button'
        bottomNav.appendChild(placeButton)

        for (let numb = 1;numb<11;numb++){
        let xSetOption = document.createElement('option')
        let ySetOption = document.createElement('option')

        xSetOption.setAttribute('value',numb)
        ySetOption.setAttribute('value',numb)

        xSetOption.text=numb
        ySetOption.text=numb

        xSet.appendChild(xSetOption)
        ySet.appendChild(ySetOption)
        }
        
        let oSetOptionV = document.createElement('option')
        let oSetOptionH = document.createElement('option')
        oSetOptionV.setAttribute('value','v')
        oSetOptionH.setAttribute('value','h')
        oSetOptionV.text='v'
        oSetOptionH.text='h'
        oSet.appendChild(oSetOptionH)
        oSet.appendChild(oSetOptionV)

        for(let b = 0 ;b<5;b++){
            let shipPartDiv = document.createElement('div')
            shipPartDiv.className = 'shipPart'
            topShip.appendChild(shipPartDiv)
        }


    }
    let shipDivNodes = document.querySelectorAll('.topShip')
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



    return {shipList,placeShip,gridCol,receiveAttack, missedHits,destroyedShips,
        targetShoot,tempShoot,takenFields,cordsadd,hittedCords,genGrid,genShipGrid}
}

export {Gameboard}



