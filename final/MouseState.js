// MouseState.js
class MouseState {
  constructor(controller) {
    this.controller = controller;
  }

  onMouseDown(event, selectedShapes) {
    if (selectedShapes) {
      this.controller.selectedShapes = selectedShapes;
      this.controller.switchToSelectState();
      this.controller.mouseState.onMouseDown(event, selectedShapes);
    } else {
      this.controller.switchToDefaultState();
    }
  }
  onMouseMove(event) {}
  onMouseUp(event) {}
}

class SelectState extends MouseState {
  onMouseDown(event, selectedShapes) {
    if (this.controller.selectedShapes.length > 0) {
      // this.controller.selectedShape = null;
      // this.controller.draw();

      console.log(selectedShapes);
      this.controller.selectedShapes = selectedShapes;
      this.controller.draw();

      this.controller.switchToDragState();
      this.controller.mouseState.onMouseDown(event, selectedShapes);
    } else {
      this.controller.selectedShape = null;
      this.controller.draw();

      this.controller.switchToDefaultState();
    }
  }

  onMouseMove(event) {}

  onMouseUp(event) {
    this.controller.switchToSelectState();
  }
}

class DragState extends MouseState {
  onMouseDown(event, selectedShapes) {
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.selectedShapes = selectedShapes;
  }

  onMouseMove(event) {
    if (this.selectedShapes.length == 0) return;

    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;

    // 선택된 모든 도형을 이동시킵니다.
    this.selectedShapes.forEach((shape) => {
      shape.move(dx, dy);
    });

    this.startX = event.clientX;
    this.startY = event.clientY;
    this.controller.draw();
    // if (this.controller.selectedShape) {
    //   const dx = event.clientX - this.startX;
    //   const dy = event.clientY - this.startY;
    //   this.controller.selectedShape.x += dx;
    //   this.controller.selectedShape.y += dy;
    //   this.startX = event.clientX;
    //   this.startY = event.clientY;
    //   this.controller.draw();
    //   this.controller.updateProperties(this.controller.selectedShape);
    // }
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
    this.resizingShapes = null;
    this.handle = null;
  }

  onMouseDown(event, selectedShapes, handle) {
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.resizingShapes = selectedShapes;
    this.handle = handle;
  }

  onMouseMove(event) {
    if (this.resizingShapes.length < 1) return;

    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;

    switch (this.handle) {
      case "top-left":
        this.resizingShapes.forEach((resizingShape) => {
          resizingShape.x += dx;
          resizingShape.width -= dx;
          resizingShape.y += dy;
          resizingShape.height -= dy;
        });
        break; // 각 case 끝에 break 추가
      case "top-right":
        this.resizingShapes.forEach((resizingShape) => {
          resizingShape.width += dx;
          resizingShape.y += dy;
          resizingShape.height -= dy;
        });
        break;
      case "bottom-left":
        this.resizingShapes.forEach((resizingShape) => {
          resizingShape.x += dx;
          resizingShape.width -= dx;
          resizingShape.height += dy;
        });
        break;
      case "bottom-right":
        this.resizingShapes.forEach((resizingShape) => {
          resizingShape.width += dx;
          resizingShape.height += dy;
        });
        break;
    }

    // // 사각형의 크기 조절
    // if (this.resizingShape instanceof Rectangle) {
    //     this.resizingShape.width += dx;
    //     this.resizingShape.height += dy;
    // }

    this.startX = event.clientX;
    this.startY = event.clientY;
    this.controller.draw();
  }

  onMouseUp(event) {
    this.controller.switchToSelectState();
  }
}
