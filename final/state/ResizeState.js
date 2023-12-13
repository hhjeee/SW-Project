class ResizeState extends MouseState {
  constructor(controller) {
    super(controller);
    this.startX = 0;
    this.startY = 0;
    this.resizingShapes = null;
    this.handle = null;
    this.resizeCommand = new ResizeCommand();
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

    /*switch (this.handle) {
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
      }*/

    // // 사각형의 크기 조절
    // if (this.resizingShape instanceof Rectangle) {
    //     this.resizingShape.width += dx;
    //     this.resizingShape.height += dy;
    // }

    this.resizeCommand = new ResizeCommand(
      this.controller,
      this.resizingShapes,
      this.handle,
      dx,
      dy
    );
    this.resizeCommand.execute();

    this.startX = event.clientX;
    this.startY = event.clientY;
    this.controller.draw();
  }

  onMouseUp(event) {
    if (this.resizeCommand) {
      this.controller.commandStack.push(this.resizeCommand);
      console.log(this.controller.commandStack);
    }
    this.controller.switchToSelectState();
  }
}
