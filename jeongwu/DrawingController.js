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
    this.getPropertiesInput();
    this.getZorderClick();
    this.setupMouseEvents();
  }

  setupMouseEvents() {
    this.view.canvas.addEventListener("mousedown", (event) => {
      const shape = this.findShape(event);
      this.mouseState.onMouseDown(event, shape);
      this.updateProperties(shape);
    });

    this.view.canvas.addEventListener("mousemove", (event) => {
      this.mouseState.onMouseMove(event);
    });

    this.view.canvas.addEventListener("mouseup", (event) => {
      this.mouseState.onMouseUp(event);
    });
  }

  updateProperties(shape) {
    const widthInput = document.getElementById("width");
    const heightInput = document.getElementById("height");
    const xCoordinateInput = document.getElementById("xCoordinate");
    const yCoordinateInput = document.getElementById("yCoordinate");
    const color = document.getElementById("colorPicker");
    //const zOrder = document.getElementById("Zorder");

    if (!this.selectedShape) {
      widthInput.value = "";
      heightInput.value = "";
      xCoordinateInput.value = "";
      yCoordinateInput.value = "";
      color.value = "#000000";
      //zOrder.value = "";
    } else {
      widthInput.value = Math.round(this.selectedShape.width);
      heightInput.value = Math.round(this.selectedShape.height);

      xCoordinateInput.value = Math.round(this.selectedShape.x);
      yCoordinateInput.value = Math.round(this.selectedShape.y);

      color.value = this.selectedShape.color;
      //zOrder.value = this.selectedShape.zOrder;
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
    const rectangleButton = document.getElementById("drawRectangle");
    const EllipseButton = document.getElementById("drawEllipse");
    const lineButton = document.getElementById("drawLine");
    //const TextButton = document.getElementById("drawText");

    rectangleButton.addEventListener(
      "click",
      this.handleRectangleClick.bind(this)
    );
    EllipseButton.addEventListener("click", this.handleEllipseClick.bind(this));
    lineButton.addEventListener("click", this.handleLineClick.bind(this));
    //TextButton.addEventListener("click", this.handleTextClick.bind(this));
  }

  ////////속성창 변경 추가
  getPropertiesInput() {
    //필요하다면 다 다른 함수로 분리해도 될듯
    document
      .getElementById("width")
      .addEventListener("change", (event) => this.handleWidthInput(event));

    document
      .getElementById("height")
      .addEventListener("change", (event) => this.handleHeightInput(event));

    document
      .getElementById("xCoordinate")
      .addEventListener("change", (event) => this.handleXInput(event));

    document
      .getElementById("yCoordinate")
      .addEventListener("change", (event) => this.handleYInput(event));

    document
      .getElementById("colorPicker")
      .addEventListener("input", (event) => this.handleColorInput(event));
  }

  handleWidthInput(event) {
    const newWidth = parseInt(event.target.value, 10);
    if (this.selectedShape) {
      this.selectedShape.width = newWidth;
      this.draw();
    }
  }
  handleHeightInput(event) {
    const newHeight = parseInt(event.target.value, 10);
    if (this.selectedShape) {
      this.selectedShape.height = newHeight;
      this.draw();
    }
  }
  handleXInput(event) {
    const newXCoordinate = parseInt(event.target.value, 10);

    if (this.selectedShape) {
      this.selectedShape.x = newXCoordinate;
      this.draw();
    }
  }
  handleYInput(event) {
    const newYCoordinate = parseInt(event.target.value, 10);

    if (this.selectedShape) {
      this.selectedShape.y = newYCoordinate;
      this.draw();
    }
  }
  handleColorInput(event) {
    const newColor = event.target.value;

    if (this.selectedShape) {
      this.selectedShape.color = newColor;
      this.draw();
    }
  }
  ////////////////
  ////z-order변경
  getZorderClick() {
    document.getElementById("moveToFront").addEventListener("click", () => {
      this.moveToFront();
    });

    document.getElementById("moveToForward").addEventListener("click", () => {
      this.moveToForward();
    });

    document.getElementById("moveToBack").addEventListener("click", () => {
      this.moveToBack();
    });

    document.getElementById("moveToBackward").addEventListener("click", () => {
      this.moveToBackward();
    });
  }

  moveToFront() {
    if (this.selectedShape) {
      const maxZOrder = this.shapes.reduce(
        (max, shape) => Math.max(max, shape.zOrder),
        0
      );

      this.selectedShape.zOrder = maxZOrder;

      this.shapes.forEach((shape) => {
        if (shape !== this.selectedShape && shape.zOrder > 0) {
          shape.zOrder -= 1;
        }
      });

      this.draw();
    }
  }
  moveToForward() {
    if (this.selectedShape) {
      if (this.selectedShape.zOrder < this.shapes.length - 1) {
        // 선택된 도형이 이미 가장 앞에 있는 것이 아니라면, 한 단계 앞으로 이동
        const currentIndex = this.shapes.indexOf(this.selectedShape);
        const nextIndex = currentIndex + 1;

        // Z-순서 값을 교환
        [this.selectedShape.zOrder, this.shapes[nextIndex].zOrder] = [
          this.shapes[nextIndex].zOrder,
          this.selectedShape.zOrder,
        ];

        this.draw();
      }
    }
  }
  moveToBack() {
    if (this.selectedShape) {
      this.selectedShape.zOrder = 0;

      this.shapes.forEach((shape) => {
        if (shape !== this.selectedShape) {
          shape.zOrder += 1;
        }
      });

      this.draw();
    }
  }
  moveToBackward() {
    if (this.selectedShape) {
      if (this.selectedShape.zOrder > 0) {
        const currentIndex = this.shapes.indexOf(this.selectedShape);
        const previousIndex = currentIndex - 1;

        [this.selectedShape.zOrder, this.shapes[previousIndex].zOrder] = [
          this.shapes[previousIndex].zOrder,
          this.selectedShape.zOrder,
        ];

        this.draw();
      }
    }
  }

  ////////////////

  handleRectangleClick() {
    this.addShape(
      new Rectangle(
        Math.random() * (this.view.canvas.width - 100),
        Math.random() * (this.view.canvas.height - 100),
        100,
        100,
        "#FF0000"
      )
    );
  }

  handleEllipseClick() {
    this.addShape(
      new Ellipse(
        Math.random() * (this.view.canvas.width - 100),
        Math.random() * (this.view.canvas.height - 100),
        100,
        100,
        "#0000FF"
      )
    );
  }

  handleLineClick() {
    this.addShape(
      new Line(
        Math.random() * (this.view.canvas.width - 100),
        Math.random() * (this.view.canvas.height - 100),
        200,
        "#000000"
      )
    );
  }

  /*handleTextClick() {
    this.addShape(
      new Text(
        Math.random() * (this.view.canvas.width - 100),
        Math.random() * (this.view.canvas.height - 100),
        "Text",
        30,
        "#00FF00"
      )
    );
  }*/

  addShape(shape) {
    shape.zOrder = this.shapes.length;
    this.shapes.push(shape);
    this.draw();
  }

  draw() {
    this.view.clearCanvas();
    const sortedShapes = this.shapes.sort((a, b) => a.zOrder - b.zOrder);

    sortedShapes.forEach((shape) => {
      shape.draw(this.view.context);
      if (shape === this.selectedShape) {
        shape.drawResizeHandles(this.view.context);
      }
    });
  }

  drawBoundingBox() {
    this.selectedShape.drawResizeHandles(this.view.context);
  }
}
