
class Particle {
    constructor(pos) {
        this.color = getRandomColor()
        this.minZ = -1
        this.maxZ = 1
        this.pos = pos ? pos : createVector(width / 2, height / 3,random(this.maxZ))
        this.counterClockwise = random([true, false])
        this.vel = createVector(0, 10)
        this.maxVel = 30
        this.minVel = 10
        this.velDecreaseRate = 0.1
        this.clockWise = random([true, false])
        this.maxMass = 5
        this.mass = random(1, this.maxMass)
    }

    closeToMouse() {
        return this.pos.dist(createVector(mouseX, mouseY)) < window.innerWidth / 4
    }

    size() {
        return map(this.pos.z, 0, this.maxZ, 2, 5)
    }

    draw() {
        noStroke()
        const colorCenter = createVector(width / 2, height/2)
        const xDist = this.pos.x > colorCenter.x ? this.pos.x - colorCenter.x : colorCenter.x - this.pos.x
        fill(0,0, map(xDist,0,width/2,255,120))
        ellipse(+ this.pos.x - this.size() / 2, this.pos.y, this.size(), this.size())
    }

    getColor() {
        return this.color
    }

    updateVelocity() {
        this.maxVel = this.maxVel > this.minVel ? this.maxVel - this.velDecreaseRate : this.maxVel
    }

    update() {
        this.updateVelocity()
        this.clockWise = this.pos.x > width / 2 || this.pos.y > (height / 2)
        const rotOff = 85
        const rotation = this.clockWise ? rotOff : 360 - rotOff

        const force = (9.81 * centerMass * this.mass) / this.pos.dist(center)
        let direction = centerDirection(this.pos).mult(-1)
        const acc = direction.mult(force).rotate(rotation)

        this.vel.add(acc)
        this.vel.limit(map(center.dist(this.pos), 0, width, 0.5, this.maxVel))
        this.pos.add(this.vel)
        this.validPos()

        stroke(255, 0, 0)
    }

    validPos() {
        if (this.pos.z < this.minZ) {
            this.pos.z = this.minZ
        }
        if (this.pos.z > this.maxZ) {
            this.pos.z = this.maxZ
        }
        if (this.pos.x > width) {
            this.pos.x = 0
        }
        if (this.pos.x < 0) {
            this.pos.x = width
        }

        if (this.pos.y > height) {
            this.pos.y = 0
        }
        if (this.pos.y < 0) {
            this.pos.y = height
        }
    }
}




