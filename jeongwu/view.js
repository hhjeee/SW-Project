// DrawingView.js
class DrawingView {
    constructor() {
        this.canvas = document.getElementById('drawingCanvas');
        this.context = this.canvas.getContext('2d');
    }

    drawShape(state, shape) {
        state.draw(this.context, shape);
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
