
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