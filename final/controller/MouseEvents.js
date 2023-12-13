DrawingController.prototype.setMouseState = function (newState) {
  this.mouseState = newState;
};

DrawingController.prototype.switchToDefaultState = function () {
  this.setMouseState(this.defaultState);
};

DrawingController.prototype.switchToSelectState = function () {
  this.setMouseState(this.selectState);
};

DrawingController.prototype.switchToDragState = function () {
  this.setMouseState(this.dragState);
};

DrawingController.prototype.switchToResizeState = function () {
  this.setMouseState(this.resizeState);
};

DrawingController.prototype.setupMouseEvents = function () {
  this.view.canvas.addEventListener("mousedown", (event) => {
    this.observingShape.subscribe(this.propertyPanel);

    const handle = this.findResizeHandle(event);

    if (handle) {
      this.switchToResizeState();
      this.mouseState.onMouseDown(event, this.compositeShape.children, handle);
    } else {
      const shape = this.findShape(event);
      if (shape == null) {
        this.switchToDefaultState();
      }
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
          this.compositeShape.children = shape ? [shape] : [];
        } else {
        }
      }
      this.mouseState.onMouseDown(event, this.compositeShape.children);

      this.observingShape.notify(this.compositeShape.children);
    }
  });

  this.view.canvas.addEventListener("mousemove", (event) => {
    this.mouseState.onMouseMove(event);
    this.observingShape.notify(this.compositeShape.children);
  });
  this.view.canvas.addEventListener("mouseup", (event) => {
    this.mouseState.onMouseUp(event);
  });
};
