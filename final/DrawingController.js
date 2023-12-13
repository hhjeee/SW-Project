// DrawingController.js
class DrawingController {
  constructor(view) {
    this.view = view;
    this.shapes = [];
    this.selectedShapes = [];

    this.defaultState = new MouseState(this);
    this.selectState = new SelectState(this);
    this.dragState = new DragState(this);
    this.resizeState = new ResizeState(this);
    this.mouseState = this.defaultState;

    this.initializeButtons();
    this.getPropertiesInput();
    this.getZorderClick();
    this.setupMouseEvents();

    this.shapeFactory = new ConcreteShapeFactory();
    this.compositeShape = new CompositeShape();

    this.commandStack = [];

    this.moveToFrontCommand;
    this.moveToForwardCommand;
    this.moveToBackCommand;
    this.moveToBackwardCommand;
    this.ChangeShapePropertyCommand;
    this.createShapeCommand;

    this.AddRectangleCommand;
    this.AddEllipseCommand;
    this.AddLineCommand;

    this.MoveCommand;
    this.ResizeCommand;

    this.buttonObservers = [];

    const undoButton = document.getElementById("undoButton");
    undoButton.addEventListener("click", () => this.undo());
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

  switchToResizeState() {
    this.setMouseState(this.resizeState);
  }

  //composite
  addSelectedShape(shape) {
    this.compositeShape.addChild(shape);
    this.draw();
  }

  removeSelectedShape(shape) {
    this.compositeShape.removeChild(shape);
    this.draw();
  }

  setupMouseEvents() {
    this.view.canvas.addEventListener("mousedown", (event) => {
      const handle = this.findResizeHandle(event);
      console.log(handle);
      if (handle) {
        this.switchToResizeState();
        this.mouseState.onMouseDown(
          event,
          this.compositeShape.children,
          handle
        );
      } else {
        const shape = this.findShape(event);

        if (event.shiftKey && shape) {
          // Shift 키가 눌려있으면 멀티-셀렉트 수행
          const index = this.compositeShape.children.indexOf(shape);
          if (index === -1) {
            this.compositeShape.addChild(shape);
          } else {
            this.compositeShape.removeChild(shape);
          }
        } else {
          const index = this.compositeShape.children.indexOf(shape);

          if (index === -1) {
            // Shift 키가 눌려있지 않으면 단일 선택
            this.compositeShape.children = shape ? [shape] : [];
          } else {
          }
        }
        this.mouseState.onMouseDown(event, this.compositeShape.children);
      }
    });

    this.view.canvas.addEventListener("mousemove", (event) => {
      this.mouseState.onMouseMove(event);
    });

    this.view.canvas.addEventListener("mouseup", (event) => {
      this.mouseState.onMouseUp(event);

      console.log(this.mouseState);
    });
  }

  findResizeHandle(event) {
    const rect = this.view.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let handle_output = null;
    const handleSize = 8;
    let selectedShapes = this.selectedShapes;

    if (selectedShapes.length == 0) return null;
    let handles = {};

    selectedShapes.forEach((selectedShape) => {
      // 조절점 위치 계산

      if (selectedShape instanceof Ellipse) {
        // 원의 경우, 각 사분면의 중간 지점에 조절점 표시
        const middleX = selectedShape.x;
        const middleY = selectedShape.y;

        handles = {
          "top-left": {
            x: middleX - selectedShape.width / 2,
            y: middleY - selectedShape.height / 2,
          },
          "top-right": {
            x: middleX + selectedShape.width / 2,
            y: middleY - selectedShape.height / 2,
          },
          "bottom-left": {
            x: middleX - selectedShape.width / 2,
            y: middleY + selectedShape.height / 2,
          },
          "bottom-right": {
            x: middleX + selectedShape.width / 2,
            y: middleY + selectedShape.height / 2,
          },
        };
      } else {
        handles = {
          "top-left": { x: selectedShape.x, y: selectedShape.y },
          "top-right": {
            x: selectedShape.x + selectedShape.width,
            y: selectedShape.y,
          },
          "bottom-left": {
            x: selectedShape.x,
            y: selectedShape.y + selectedShape.height,
          },
          "bottom-right": {
            x: selectedShape.x + selectedShape.width,
            y: selectedShape.y + selectedShape.height,
          },
        };
      }
      // 각 조절점에 대해 클릭된 지점이 조절점 영역 내에 있는지 확인
      for (const handle in handles) {
        const hx = handles[handle].x;
        const hy = handles[handle].y;
        if (
          x >= hx - handleSize / 2 &&
          x <= hx + handleSize / 2 &&
          y >= hy - handleSize / 2 &&
          y <= hy + handleSize / 2
        ) {
          handle_output = handle; // 해당 조절점 식별자 반환
        }
      }
    });

    return handle_output;
  }

  updateProperties() {
    const widthInput = document.getElementById("width");
    const heightInput = document.getElementById("height");
    const xCoordinateInput = document.getElementById("xCoordinate");
    const yCoordinateInput = document.getElementById("yCoordinate");
    const color = document.getElementById("colorPicker");

    const selectedShapes = this.compositeShape.children;

    if (selectedShapes.length == 1) {
      const selectedShape = selectedShapes[0];

      widthInput.value = Math.round(selectedShape.width);
      heightInput.value = Math.round(selectedShape.height);

      xCoordinateInput.value = Math.round(selectedShape.x);
      yCoordinateInput.value = Math.round(selectedShape.y);

      color.value = selectedShape.color;
      //zOrder.value = this.selectedShape.zOrder;
    } else {
      widthInput.value = "";
      heightInput.value = "";
      xCoordinateInput.value = "";
      yCoordinateInput.value = "";
      color.value = "#000000";
    }
  }

  // DrawingController.js 내 findShape 메소드
  findShape(event) {
    const rect = this.view.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const sortedShapes = this.shapes.sort((a, b) => b.zOrder - a.zOrder);

    for (let shape of sortedShapes) {
      if (shape.containsPoint(mouseX, mouseY)) {
        return shape;
      }
    }

    return null;
  }

  ////////속성창 변경 추가
  getPropertiesInput() {
    document
      .getElementById("width")
      .addEventListener("change", (event) =>
        this.changeShapeProperty("width", parseInt(event.target.value, 10))
      );

    document
      .getElementById("height")
      .addEventListener("change", (event) =>
        this.changeShapeProperty("height", parseInt(event.target.value, 10))
      );

    document
      .getElementById("xCoordinate")
      .addEventListener("change", (event) =>
        this.changeShapeProperty("x", parseInt(event.target.value, 10))
      );

    document
      .getElementById("yCoordinate")
      .addEventListener("change", (event) =>
        this.changeShapeProperty("y", parseInt(event.target.value, 10))
      );

    document
      .getElementById("colorPicker")
      .addEventListener("input", (event) =>
        this.changeShapeProperty("color", event.target.value)
      );
  }

  changeShapeProperty(propertyName, newValue) {
    if (this.selectedShapes.length === 1) {
      const changePropertyCommand = new ChangeShapePropertyCommand(
        this,
        this.selectedShapes[0],
        propertyName,
        newValue
      );
      changePropertyCommand.execute();
      this.commandStack.push(changePropertyCommand);
    }
  }

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
    this.moveToFrontCommand = new MoveToFrontCommand(this, this.selectedShapes);
    this.moveToFrontCommand.execute();
    this.commandStack.push(this.moveToFrontCommand);
  }
  moveToForward() {
    this.moveToForwardCommand = new MoveToForwardCommand(
      this,
      this.selectedShapes
    );
    this.moveToForwardCommand.execute();
    this.commandStack.push(this.moveToForwardCommand);
  }
  moveToBack() {
    this.moveToBackCommand = new MoveToBackCommand(this, this.selectedShapes);
    this.moveToBackCommand.execute();
    this.commandStack.push(this.moveToBackCommand);
  }
  moveToBackward() {
    this.moveToBackwardCommand = new MoveToBackwardCommand(
      this,
      this.selectedShapes
    );
    this.moveToBackwardCommand.execute();
    this.commandStack.push(this.moveToBackwardCommand);
  }

  ////////////////
  /*addButtonObserver(observer) {
    this.buttonObservers.push(observer);
  }

  notifyButtonObservers(event) {
    this.buttonObservers.forEach((observer) => {
      observer.update(event);
    });
  }*/

  initializeButtons() {
    const rectangleButton = document.getElementById("drawRectangle");
    const EllipseButton = document.getElementById("drawEllipse");
    const lineButton = document.getElementById("drawLine");
    const TextButton = document.getElementById("drawText");

    rectangleButton.addEventListener(
      "click",
      this.handleRectangleClick.bind(this)
    );
    EllipseButton.addEventListener("click", this.handleEllipseClick.bind(this));
    lineButton.addEventListener("click", this.handleLineClick.bind(this));
    TextButton.addEventListener("click", this.handleTextClick.bind(this));
  }

  handleRectangleClick(event) {
    const addRectangleCommand = new AddRectangleCommand(
      this,
      this.shapeFactory,
      {
        x: Math.random() * (this.view.canvas.width - 100),
        y: Math.random() * (this.view.canvas.height - 100),
        width: 100,
        height: 100,
        color: "#FF0000",
      }
    );

    addRectangleCommand.execute();
    this.commandStack.push(addRectangleCommand);
    console.log(this.commandStack);
  }

  handleEllipseClick(event) {
    const addEllipseCommand = new AddEllipseCommand(this, this.shapeFactory, {
      x: Math.random() * (this.view.canvas.width - 100),
      y: Math.random() * (this.view.canvas.height - 100),
      width: 100,
      height: 100,
      color: "#0000FF",
    });

    addEllipseCommand.execute();
    this.commandStack.push(addEllipseCommand);
  }

  handleLineClick(event) {
    const addLineCommand = new AddLineCommand(this, this.shapeFactory, {
      x: Math.random() * (this.view.canvas.width - 100),
      y: Math.random() * (this.view.canvas.height - 100),
      length: 200,
      color: "#000000",
    });

    addLineCommand.execute();
    this.commandStack.push(addLineCommand);
  }

  handleTextClick(event) {
    const addTextCommand = new AddTextCommand(this, this.shapeFactory, {
      x: Math.random() * (this.view.canvas.width - 100),
      y: Math.random() * (this.view.canvas.height - 100),
      text: "text",
      fontSize: 30,
      color: "#00FF00",
    });

    addTextCommand.execute();
    this.commandStack.push(addTextCommand);
  }

  draw() {
    this.view.clearCanvas();
    const sortedShapes = this.shapes.sort((a, b) => a.zOrder - b.zOrder);

    sortedShapes.forEach((shape) => {
      shape.draw(this.view.context);
      if (this.selectedShapes.includes(shape)) {
        shape.drawResizeHandles(this.view.context); // 선택된 도형에 조절점 그리기
      }
      // if (shape === this.selectedShapes[0]) {
      //   shape.drawResizeHandles(this.view.context);
      // }
    });
  }

  //command
  undo() {
    if (this.commandStack.length > 0) {
      const lastCommand = this.commandStack.pop();
      lastCommand.undo();
      console.log(this.commandStack);
      this.draw();
    }
  }
}
