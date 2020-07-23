let particles;
let i
let center
let decliner
let stepValue

let balancer
let centerMass
let userClicked
let maxI

setup = () => {
    createCanvas(window.innerWidth, window.innerHeight)
    angleMode(DEGREES);
    center = createVector((width / 2), height)
    centerMass = 2
    particles = []
    maxI = 1000
    i = random(maxI)
    userClicked = false
    decliner = new Decliner()
    balancer = new Balancer()
}


getRandomColor = () => {
    return createVector(0, random(0, 255), 0)
}

draw = () => {
    if (i % 100) {
        //background(0, 0, 0, 50)
    }
    background(255)

    addNewParticles()
    updateParticles()
    limitParticles()
    balancer.update()
    decliner.step()

    i = i >= maxI ? 0 : i + 5
}

keyPressed = () => {
    return;
    if (keyCode == 38) {
        print('up')
    }
    if (keyCode == 40) {
        print('down')
    }
    if (keyCode == 37) {
        print('left')
    }
    if (keyCode == 39) {
        print('right')
    }
}

mouseVector = () => {
    return createVector(mouseX, mouseY)
}

addNewParticles = () => {
    if (particles.length < balancer.maxParticles) {
        for (let i = 0; i < 10; i++) {
            let w = new Particle(getPosition())
            w.vel = createVector(random(-2, 2), random(-2, 5), random(-2, 5))
            particles.push(w)
        }
    }
}


getPosition = () => {
    return createVector(width/2, height/2, 124)
}

updateParticles = () => {
    for (let w of particles) {
        w.update()
    }
}

drawParticles = () => {
    for (let w of particles) {
        w.draw()
    }
}

limitParticles = () => {
    if (particles.length > balancer.maxParticles) {
        particles = particles.slice(Math.max(particles.length - balancer.maxParticles - 1, 1))
    }
}