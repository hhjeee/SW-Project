// MouseState.js
class MouseState {
    constructor(controller) {
        this.controller = controller;
    }

    onMouseDown(event, shape) {
        if (shape) {
            this.controller.selectedShape = shape;
            this.controller.switchToSelectState();
            this.controller.mouseState.onMouseDown(event, shape);
        }
        else{
            this.controller.switchToDefaultState();
        }
    }
    onMouseMove(event) {

    }
    onMouseUp(event) {

    }
}

class SelectState extends MouseState {

    onMouseDown(event, shape) {
        if (shape) {
            this.controller.selectedShape = null;
            this.controller.draw();

            this.controller.selectedShape = shape;
            this.controller.drawBoundingBox();
            this.controller.switchToDragState();
            this.controller.mouseState.onMouseDown(event, shape);
        }
        else{
            this.controller.selectedShape = null;
            this.controller.draw();
            
            this.controller.switchToDefaultState();
        }
    }

    onMouseMove(event) {
        
    }

    onMouseUp(event) {
        this.controller.switchToSelectState();
    }
}

class DragState extends MouseState {
    onMouseDown(event, shape) {
        this.startX = event.clientX;
        this.startY = event.clientY;
    }

    onMouseMove(event) {
        if (this.controller.selectedShape) {
            const dx = event.clientX - this.startX;
            const dy = event.clientY - this.startY;
            this.controller.selectedShape.x += dx;
            this.controller.selectedShape.y += dy;
            this.startX = event.clientX;
            this.startY = event.clientY;
            this.controller.draw();
            this.controller.updateProperties(this.controller.selectedShape);
        }
    }

    onMouseUp(event) {
        this.controller.switchToSelectState();
    }
}

// MouseState.js
class ResizeState extends MouseState {
    constructor(controller) {
        super(controller);
        this.startX = 0;
        this.startY = 0;
        this.resizingShape = null;
    }

    onMouseDown(event, shape) {
        this.startX = event.clientX;
        this.startY = event.clientY;
        this.resizingShape = shape;
    }

    onMouseMove(event) {
        if (!this.resizingShape) return;

        const dx = event.clientX - this.startX;
        const dy = event.clientY - this.startY;

        // 사각형의 크기 조절
        if (this.resizingShape instanceof Rectangle) {
            this.resizingShape.width += dx;
            this.resizingShape.height += dy;
        }

        this.startX = event.clientX;
        this.startY = event.clientY;
        this.controller.draw();
    }

    onMouseUp(event) {
        this.controller.switchToSelectState();
    }
}
