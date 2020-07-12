let walkers;
let i
let mP
let center
let decliner
let stepValue
let depth
let balancer
let offSet
let centerMass

setup = () => {
    createCanvas(window.innerWidth, window.innerHeight)
    center = createVector((width / 2), (height / 2))
    offSet = createVector(0, 0)
    centerMass = 2
    walkers = []
    angleMode(DEGREES);
    i = 0
    mP = false
    background(0)

    depth = 140

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
    }
    handleWalkers()

    limitWalkers()
    i += 1

    i = i >= 10000 ? 0 : i

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
            let w = new Walker()
            w.vel = createVector(random(-2, 2), random(-2, 5))
            walkers.push(w)
        }
    }
}

handleWalkers = () => {
    for (let w of walkers) {
        w.update()
        w.draw()
    }
    // filter walkers that are to close to center
    walkers = walkers.filter(w => w.pos.dist(getAttractionPoint()) > 80)
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


class Walker {
    constructor() {
        this.color = getRandomColor()
        this.pos = createVector(random(width), random(height), depth)
        this.counterClockwise = random([true, false])
        this.vel = createVector(0, 5)
        this.mass = random(0.5, 3)
    }

    closeToMouse() {
        return this.pos.dist(createVector(mouseX, mouseY)) < window.innerWidth / 4
    }

    size() {
        return this.mass * 2
        return map(this.pos.z, 0, depth, 0, 10)
    }

    draw() {
        fill(map(this.pos.dist(center), 0, width, 255, 0), 0, map(this.pos.dist(center), 0, width / 2, 0, 255))
        noStroke()
        ellipse(offSet.x + this.pos.x - this.size() / 2, offSet.y + this.pos.y, this.size(), this.size())
    }

    getColor() {
        return this.color
    }

    update() {
        const rotation = 50
        const force = (9, 81 * centerMass * this.mass) / this.pos.dist(center)
        let direction = centerDirection(this.pos).mult(-1)
        let acc = direction.mult(force).rotate(rotation)

        this.vel.add(acc)
        this.vel.limit(map(center.dist(this.pos), 0, width, 10, 0.5))
        this.pos.add(this.vel)
        this.validPos()

        stroke(255, 0, 0)
        // Uncomment to visualize acceleration direction
        // line(this.pos.x,this.pos.y,this.pos.x+acc.x*10,this.pos.y+acc.y*10)
    }

    validPos() {
        return;
        if (this.pos.x > width + offSet.x) {
            this.pos.x = 0 + offSet.x
        }
        if (this.pos.x < 0 + offSet.x) {
            this.pos.x = width + offSet.x
        }

        if (this.pos.y > height + offSet.y) {
            this.pos.y = offSet.y
        }
        if (this.pos.y < 0 + offSet.y) {
            this.pos.y = height + offSet.y
        }

        if (this.pos.z > 255) {
            this.pos.z = 0
        }
    }
}


class Decliner {
    constructor() {
        this.n = 120
        this.up = false
    }

    step() {
        if (this.up) {
            this.n += 1
        } else {
            this.n -= 1
        }

        if (this.n === 255) {
            this.up = true
        }
        if (this.n === 0) {
            this.up = true
        }
    }
}

class Balancer {
    constructor() {
        this.trySettings = true
        this.meanFrameRate = 60
        this.minFrameRate = 35
        this.maxWalker = 50
        this.waitingTime = 100
    }

    update() {
        if (this.waitingTime > 0) {
            this.waitingTime -= 1
            return;
        }

        const fr = Math.floor(frameRate())

        this.meanFrameRate += fr
        this.meanFrameRate /= 2

        if (this.trySettings) {
            if (this.meanFrameRate < this.minFrameRate) {
                this.trySettings = false
                this.maxWalker = Math.round(this.maxWalker * 0.9)
            } else {
                this.maxWalker += 10
            }
        }

    }

    draw() {
        noStroke()
        fill(0)
        rect(20, 0, 100, 20)
        fill(255)
        text(Math.floor(this.meanFrameRate) + ' ' + this.maxWalker, 20, 20)

        stroke(255)
        textSize(24)
        fill(255)
        text('Balancing..', width / 2, height / 2,)
    }
}

centerDirection = (wPos) => {
    return wPos.copy().sub(center).normalize()
}

distToMouse = (pos) => {
    return pos.dist(createVector(mouseX, mouseY))
}

distToCenter = (pos) => {
    return pos.dist(createVector(width / 2, height / 2))
}

mousePressed = () => {
    mP = true
}

mouseReleased = () => {
    mP = false
}