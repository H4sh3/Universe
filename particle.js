
class Particle {
    constructor(pos) {
        this.color = getRandomColor()
        this.minZ = 45
        this.maxZ = 100
        this.pos = pos ? pos : createVector(width / 2, height / 3,random(this.maxZ))
        this.counterClockwise = random([true, false])
        this.vel = createVector(0, 10)
        this.maxVel = 35
        this.minVel = 10
        this.velDecreaseRate = 0.5
        this.clockWise = random([true, false])
        this.maxMass = 2
        this.mass = random(1, this.maxMass)
    }

    closeToMouse() {
        return this.pos.dist(createVector(mouseX, mouseY)) < window.innerWidth / 4
    }

    size() {
        return map(this.pos.z, 0, this.maxZ, 1, 10)
    }

    draw() {
        noStroke()
        const colorCenter = createVector(width / 2, 0)
        const xDist = this.pos.x > colorCenter.x ? this.pos.x - colorCenter.x : colorCenter.x - this.pos.x
        const yDist = this.pos.y > colorCenter.y ? this.pos.y - colorCenter.y : colorCenter.y - this.pos.y
        const zDist = this.pos.z > colorCenter.z ? this.pos.z - colorCenter.z : colorCenter.z - this.pos.z
        const b = map(xDist, 0, width, 100, 25)
        const g = 0
        const r = 0//map(yDist, 0, height, 120, 255)
        //const r = map(zDist, 0, 1, 255, 0)

        fill(map(this.pos.y,0,height,255,120),0, map(this.pos.z,0,100,0,255))
        ellipse(+ this.pos.x - this.size() / 2, this.pos.y, this.size(), this.size())
    }

    getColor() {
        return this.color
    }

    updateVelocity() {
        this.maxVel = this.maxVel > this.minVel ? this.maxVel - this.velDecreaseRate : this.maxVel
    }

    update() {
        const rotationOffset = 0
        this.updateVelocity()
        this.clockWise = this.pos.x > width / 2 || this.pos.y > (height / 2)+rotationOffset || this.pos.y < rotationOffset
        const rotOff = 85.5
        const rotation = this.clockWise ? rotOff : 360 - rotOff


        const force = (9, 81 * centerMass * this.mass) / this.pos.dist(center)
        let direction = centerDirection(this.pos).mult(-1)
        let acc = direction.mult(force).rotate(rotation)

        this.vel.add(acc)
        this.vel.limit(map(center.dist(this.pos), 0, width, 0.5, this.maxVel))
        this.pos.add(this.vel)
        this.validPos()

        stroke(255, 0, 0)
    }

    distToCenter() {
        return this.pos.dist(center)
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




