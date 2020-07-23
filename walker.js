
class Walker {
    constructor(pos) {
        this.color = getRandomColor()
        this.pos = createVector(width/2,height/3)//pos
        this.counterClockwise = random([true, false])
        this.vel = createVector(0, 10)
        this.maxVel = 150
        this.minVel = 10
        this.velDecreaseRate = 1.5
        this.clockWise = random([true,false])
        this.maxMass = 1
        this.mass = random(1, this.maxMass)
    }

    closeToMouse() {
        return this.pos.dist(createVector(mouseX, mouseY)) < window.innerWidth / 4
    }

    size() {
        return map(this.pos.z,0,100,1,10)
        return map(this.mass,0,this.maxMass,0,10)*(this.pos.z/20)
    }

    draw() {
        const colorCenter = createVector(width/2,0)
        const xDist =  this.pos.x > colorCenter.x? this.pos.x-colorCenter.x:colorCenter.x-this.pos.x
        const yDist =  this.pos.y > colorCenter.y? this.pos.y-colorCenter.y:colorCenter.y-this.pos.y
        const zDist =  this.pos.z > colorCenter.z? this.pos.z-colorCenter.z:colorCenter.z-this.pos.z
        const b = map(xDist, 0, width, 255, 0)
        //const g = map(yDist, 0, height, 255, 0)
        //const r = map(zDist, 0, 1, 255, 0)
        const g = 0
        const r = 0
        fill(r,g,b)
        noStroke()
        ellipse( + this.pos.x - this.size() / 2, offSet.y + this.pos.y, this.size(), this.size())
    }

    getColor() {
        return this.color
    }

    updateVelocity() {
        this.maxVel = this.maxVel > this.minVel ? this.maxVel - this.velDecreaseRate : this.maxVel
    }

    update() {
        this.updateVelocity()
        this.clockWise = this.pos.x > width/2 || this.pos.y > height/2
        const rotation = this.clockWise ? 85:360-85


        const force = (9, 81 * centerMass * this.mass) / this.pos.dist(center)
        let direction = centerDirection(this.pos).mult(-1)
        let acc = direction.mult(force).rotate(rotation)

        this.vel.add(acc)
        this.vel.limit(map(center.dist(this.pos), 0, width, 0.5, this.maxVel))
        this.pos.add(this.vel)
        this.validPos()

        stroke(255, 0, 0)
    }

    distToCenter(){
        return this.pos.dist(center)
    }


    validPos() {
        if (this.pos.z < 20) {
            this.pos.z = 20
        }
        if (this.pos.z > 100) {
            fill(255,0,0)
            this.pos.z = 100
        }
        if (this.pos.x > width) {
            this.pos.x = 0
        }
        if (this.pos.x < 0) {
            this.pos.x = width
        }

        if (this.pos.y > height) {
            this.pos.y = offSet.y
        }
        if (this.pos.y < 0 ) {
            this.pos.y = height
        }
    }
}




