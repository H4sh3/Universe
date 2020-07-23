class Balancer {
    constructor() {
        this.trySettings = false
        this.meanFrameRate = 60
        this.minFrameRate = 35
        this.maxParticles = 1000
        this.waitingTime = 100
    }

    update() {
        if (balancer.trySettings) {
            balancer.draw()
        } else {
            drawParticles()
        }

        if (this.waitingTime > 0) {
            this.waitingTime -= 1
            return;
        }

        const fr = Math.floor(frameRate())
        this.meanFrameRate += fr
        this.meanFrameRate /= 2
    }

    draw() {
        noStroke()
        fill(0)
        rect(20, 0, 100, 20)
        fill(255)
        text(Math.floor(this.meanFrameRate) + ' ' + this.maxParticles, 20, 20)

        stroke(255)
        textSize(24)
        fill(255)
        text('Balancing..', width / 2, height / 2,)
    }
}