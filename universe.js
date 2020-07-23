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
    center = createVector(width / 2, height)
    centerMass = 5
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
    background(0)
    addNewParticles()
    updateParticles()
    particles = particles.filter(p => p.pos.dist(center) > 50)
    
    balancer.update()
    decliner.step()
    
    fill(255)
    text(particles.length,10,10)
    ellipse(center.x,center.y,10,10)
    i = i >= maxI ? 0 : i + 1
}

addNewParticles = () => {
    if (particles.length < balancer.maxParticles) {
        for (let i = 0; i < 2; i++) {
            let w = new Particle(getPosition())
            w.vel = createVector(random(-2, 2), random(-2, 5), random(-2, 5))
            particles.push(w)
        }
    }
}

getPosition = () => {
    return createVector(width/2, map(i,0,maxI,0,height/3), 0)
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