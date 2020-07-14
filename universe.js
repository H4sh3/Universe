let walkers;
let i
let mP
let center
let decliner
let stepValue

let balancer
let offSet
let centerMass
let userClicked

setup = () => {
    createCanvas(window.innerWidth, window.innerHeight)
    center = createVector((width / 2), height )
    offSet = createVector(0, 0)
    centerMass = 2
    walkers = []
    angleMode(DEGREES);
    i = 0
    mP = false
    background(0)
    userClicked = false
    decliner = new Decliner()
    balancer = new Balancer()
}


getRandomColor = () => {
    return createVector(0, random(0, 255), 0)
}

draw = () => {
    if (i % 1000) {
        background(0, 0, 0)
    }

    background(0, 0, 0, 25)
    addNewWalkers()

    if (balancer.trySettings) {
        balancer.draw()
    } else {
        drawWalkers()
    }
    updateWalkers()
    
    limitWalkers()
    i += 5

    i = i >= 100 ? 0 : i

    balancer.update()
    decliner.step()
}

keyPressed = () => {
    console.log(keyCode)
    if (keyCode == 38) {
        print('up')
        offSet.y -= 50
    }
    if (keyCode == 40) {
        print('down')
        offSet.y += 50
    }
    if (keyCode == 37) {
        print('left')
        offSet.x -= 50
    }
    if (keyCode == 39) {
        print('right')
        offSet.x += 50
    }
    print(offSet)
}

mouseVector = () => {
    return createVector(mouseX, mouseY)
}

addNewWalkers = () => {
    
    if (walkers.length < balancer.maxWalker) {
        for (let i = 0; i < 10; i++) {
            let w = new Walker(getPosition())
            w.vel = createVector(random(-2, 2), random(-2, 5),random(-2, 5))
            walkers.push(w)
        }
    }
}


getPosition = () => {
    let pos;
    if(i % 2 == 1){ // left
        pos = createVector(100,height-map(i,0,100,100,height/3),124)
    }
    
    if(i % 2 == 0){ // right
        pos = createVector(width-100,height-map(i,0,100,100,height/3),124)
    }
    return pos

}

updateWalkers = () => {
    for (let w of walkers) {
        w.update()
    }
    // filter walkers that are to close to cente
    //walkers = walkers.filter(w => w.pos.dist(getAttractionPoint()) > 20)
}

drawWalkers = () => {

    for (let w of walkers) {
        w.draw()
    }
    
}

limitWalkers = () => {
    if (walkers.length > balancer.maxWalker) {
        walkers = walkers.slice(Math.max(walkers.length - balancer.maxWalker - 1, 1))
    }
}

getAttractionPoint = () => {
    const boundary = 50
    return createVector(width / 2, height / 2)
    return createVector(mouseX > width - boundary || mouseX < boundary ? width / 2 : mouseX, mouseY > height - boundary || mouseY < boundary ? height / 2 : mouseY)
}