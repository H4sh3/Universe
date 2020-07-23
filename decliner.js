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
            this.up = false
        }
        if (this.n === 0) {
            this.up = true
        }
    }
}