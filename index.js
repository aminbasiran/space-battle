class Spaceship{
    constructor(spaceName){
        this.name = spaceName
        this.hull = 100
        this.firepower = 2
        this.accuracy = 0.7
        this.numMissiles = 3
        this.eachMissileHit = 4
    }

    attackAlien(alien){
        let accuracyHit = Math.random()
        console.log(accuracyHit)
        if (accuracyHit <= this.accuracy) {

            if(alien.firstHull > 0){
                this.initiateAttack(alien,"firstHull")
            }

            else if(alien.secondHull > 0){
                this.initiateAttack(alien,"secondHull")
            }
    
            else if(alien.hull > 0){
                this.initiateAttack(alien,"hull")
            }  
        } 
        
        else {
            console.log(`${this.name} missed the attack on ${alien.name}`);
        }
    }


    initiateAttack(alien,x){
        alien[x] -= this.firepower;
        console.log(`${this.name} attacked ${alien.name}`);
        console.log(`${this.name}'s hull =  ${this.hull}`);
        console.log(`${alien.name}'s ${x} = ${alien[x]}`);
    }
}

class Aliens {
    constructor(alienName,max,min){
        this.name = alienName
        this.hull = this.getHull(max,min)
        this.firepower = this.getFirepower()
        this.accuracy = this.getAccuracy()
    }

    getHull(x,y){
        return Math.floor(Math.random() * (x - y) + y)
    }

    getFirepower(){
        return Math.floor(Math.random() * (4 - 2) + 2)
    }

    getAccuracy(){
        return Math.random() * (0.8 - 0.6) + 0.6
    }

    attackShip(ship){
        let accuracyHit = Math.random()
        console.log(accuracyHit)
        if (accuracyHit <= this.accuracy) {
            ship.hull -= this.firepower;
            console.log(`${this.name} attacked ${ship.name}`);
            console.log(`${this.name}'s hull = ${this.hull}`);
            console.log(`${ship.name}'s hull = ${ship.hull}`);
        } 
        
        else {
            console.log(`${this.name} missed the attack on ${ship.name}`);
        }
    }
}


class MegaAliens extends Aliens{ 
    constructor(alienName,max,min){
        super(alienName,max,min)
        this.firstHull = this.getExtraHull()
        this.secondHull = this.getExtraHull()
    }

    getExtraHull(){
        return Math.floor(Math.random() * (6 - 5) + 5)
    }
}

const checkStatus =(alien,ship,y)=>{
    ship.attackAlien(alien[y]);
    if (alien[y].attackShip > 0) {
        alien[y].attackShip(ship)
        if(ship.hull <= 0){
            console.log("you lost")
        }
    }

}

const loopGame = (ship,alien,callback) =>{

    
    for (let y = 0 ; y < alien.length ; y++){
        if (y !== alien.length - 1){
            while (ship.hull > 0 && alien[y].hull > 0) {
                callback(alien,ship,y)
            }

            if (alien[y].hull <= 0) {
                console.log(`You destroyed ${alien[y].name}`);  // fix so that prompt wont show after all aliens have defeated
                const answer = prompt("Go big or Go home? Y = Go big, X = Go home");
                if (answer.toUpperCase() === "X") {
                    console.log("I'm out")
                    alert("Game over, you lose")
                    break;
                }else{
                    continue
                }
            }  
        }
        
        else{
            console.log("you have awaken The Beast")
            // ---------------------------------------------------------------------------------------------------------------------------
            // fix logic below 
            // factor code below

            while (ship.hull > 0 && alien[y].firstHull > 0) {
                callback(alien,ship,y)
            }

            while (ship.hull > 0 && alien[y].secondHull > 0) {
                callback(alien,ship,y)
            }

            while (ship.hull > 0 && alien[y].hull > 0) {
                callback(alien,ship,y)
            }
            // ---------------------------------------------------------------------------------------------------------------------------

            if (alien[y].hull <= 0) {
                console.log(`You destroyed ${alien[y].name}`);  // fix so that prompt wont show after all aliens have defeated
                const answer = prompt("Go big or Go home? Y = Go big, X = Go home");
                if (answer.toUpperCase() === "X") {
                    console.log("I'm out")
                    alert("Game over, you lose")
                    break;
                }else{
                    continue
                }
            }  
        }
    }

    if (alien.every(alien => alien.hull <= 0)) {
        console.log("You won");
    }
}

// -----------------------------------------------------------------------------------------------------------

const start = (num,callback) => {

    // restart game/ retreat
    // create USS schwarzenegger
    const myShip = new Spaceship("USS Schwarzenegger")


    // create aliens
    const howManyAliens = num
    const arrAliens = []

    console.log(myShip)

    for (let x = 0; x < howManyAliens; x++){
        let alien = new Aliens(`Alien ${x+1}`,10,6)
        arrAliens.push(alien)
    }
    
    const boss = new MegaAliens("The Destroyer",15,12)
    arrAliens.push(boss)

    console.log(boss)
    console.log(arrAliens)

    // start looping of all aliens
    loopGame(myShip,arrAliens,callback)

    

}

start(5,checkStatus)

// -----------------------------------------------------------------------------------------------------------------------




// check if its the last alien(last alien is the Boss)
// if yes, then invoke attackMegaAlien()

// check if firsthull and secondhull exists
// if either one exist, destroy until both equals to 0

// if both equal 0, then invoke attackAlien()