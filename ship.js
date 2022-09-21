//      1 Ship
//create list with length of boat
let boatLen = function(len){
    let boatList = []
    for (let a=0; a<len;a++){
        boatList.push(a)
    }
    return boatList
};

//checks whether the list is empty and if its empty it changes the object sunk from false to true.



//factory funciton for Ship it is getting len and hitted
let Ship = function(len,x,y,o){
    let sunk = false
    let hitted = 0
    let lenFields = boatLen(len)
    let shipCords = []
    let hittedCords = []
    
    let hit = function(number){
        hittedCords.push(number)



    }
    let sunky = function(){
        if (shipCords.length == hittedCords.length){
            console.log('DESTROYED!')
            return sunk = true
        }else{
            console.log(shipCords.length - hittedCords.length + ' left.')
            return sunk = false
        }
        
    }


    return {len,hitted,sunk,hit, lenFields,x,y,o,shipCords,hittedCords,sunky}
}

export {boatLen,Ship}
