class Balancer {
    constructor() {
        this.trySettings = false
        this.meanFrameRate = 60
        this.minFrameRate = 35
        this.maxWalker = 2000
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

        if (false) {
        // if (this.trySettings) {            
            if (this.meanFrameRate < this.minFrameRate) {
                this.trySettings = false
                this.maxWalker = Math.round(this.maxWalker * 0.9)
            } else {
                this.maxWalker += 100
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