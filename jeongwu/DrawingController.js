// DrawingController.js
class DrawingController {
    constructor(view) {
        this.view = view;
        this.shapes = [];
        this.selectedShape = null;
        
        this.defaultState = new MouseState(this);
        this.selectState = new SelectState(this);
        this.dragState = new DragState(this);
        // 초기 상태 설정
        this.mouseState = this.defaultState;
        
        this.initializeButtons();
        this.setupMouseEvents();
    }
    
    setupMouseEvents() {
        this.view.canvas.addEventListener('mousedown', event => {
            const shape = this.findShape(event);
            this.mouseState.onMouseDown(event, shape);
            this.updateProperties(shape)
        });

        this.view.canvas.addEventListener('mousemove', event => {
            this.mouseState.onMouseMove(event);
        });

        this.view.canvas.addEventListener('mouseup', event => {
            this.mouseState.onMouseUp(event);
        });
    }

    updateProperties(shape) {
        const widthInput = document.getElementById("width");
        const heightInput = document.getElementById("height");
        const xCoordinateInput = document.getElementById("xCoordinate");
        const yCoordinateInput = document.getElementById("yCoordinate");
        const color = document.getElementById("colorPicker");
        const zOrder = document.getElementById("Zorder");
    
        if (!this.selectedShape) {
            widthInput.value = "";
            heightInput.value = "";
            xCoordinateInput.value = "";
            yCoordinateInput.value = "";
            color.value = "#000000";
            zOrder.value = "";
        }
        else{
            widthInput.value = Math.round(this.selectedShape.width);
            heightInput.value = Math.round(this.selectedShape.height);
            
            xCoordinateInput.value = Math.round(this.selectedShape.x);
            yCoordinateInput.value = Math.round(this.selectedShape.y);
            
            color.value = this.selectedShape.color;
            zOrder.value = this.selectedShape.zOrder;
        }
    }

    // DrawingController.js 내 findShape 메소드
    findShape(event) {
        const rect = this.view.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // z-order에 따라 내림차순으로 정렬
        const sortedShapes = this.shapes.sort((a, b) => b.zOrder - a.zOrder);

        for (let shape of sortedShapes) {
            if (shape.containsPoint(mouseX, mouseY)) {
                return shape;
            }
        }
        return null;
    }


    setMouseState(newState) {
        this.mouseState = newState;
    }

    switchToDefaultState() {
        this.setMouseState(this.defaultState);
    }

    switchToSelectState() {
        this.setMouseState(this.selectState);
    }

    switchToDragState() {
        this.setMouseState(this.dragState);
    }


    initializeButtons() {
        const rectangleButton = document.getElementById('drawRectangle');
        const circleButton = document.getElementById('drawCircle');

        // 이벤트 핸들러 등록
        rectangleButton.addEventListener('click', this.handleRectangleClick.bind(this));
        circleButton.addEventListener('click', this.handleCircleClick.bind(this));
    }

    handleRectangleClick() {
        this.addShape(new Rectangle(Math.random() * (this.view.canvas.width - 100), Math.random() * (this.view.canvas.height - 100), 100, 100, "#FF0000"));
    }

    handleCircleClick() {
        this.addShape(new Circle(Math.random() * (this.view.canvas.width - 100), Math.random() * (this.view.canvas.height - 100), 100, 100, "#0000FF"));
    }

    addShape(shape) {
        shape.zOrder = this.shapes.length;
        this.shapes.push(shape);
        this.draw();
    }

    draw() {
        this.view.clearCanvas();
        const sortedShapes = this.shapes.sort((a, b) => a.zOrder - b.zOrder);

        sortedShapes.forEach(shape => {
            shape.draw(this.view.context);
            if (shape === this.selectedShape) {
                shape.drawResizeHandles(this.view.context);
            }
        });
    }

    drawBoundingBox(){
        this.selectedShape.drawResizeHandles(this.view.context);
    }
}

