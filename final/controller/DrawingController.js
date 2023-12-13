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

    this.createButtons();
    this.getPropertiesInput();
    this.getZorderClick();
    this.setupMouseEvents();

    this.shapeFactory = new ConcreteShapeFactory();
    this.compositeShape = new CompositeShape();
    this.propertyPanel = new PropertiesPanel();
    this.observingShape = new Observable();

    this.commandStack = [];
  }

  draw() {
    this.view.clearCanvas();
    const sortedShapes = this.shapes.sort((a, b) => a.zOrder - b.zOrder);

    sortedShapes.forEach((shape) => {
      shape.draw(this.view.context);
      if (this.selectedShapes.includes(shape)) {
        shape.drawResizeHandles(this.view.context); // 선택된 도형에 조절점 그리기
      }
    });
  }

  //도형 생성 버튼
  createButtons() {
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

  //속성창 변경 값 받기
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

  //z-order 변경 버튼 클릭
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
}
