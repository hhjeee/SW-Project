class DragState extends MouseState {
  onMouseDown(event, selectedShapes) {
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.selectedShapes = selectedShapes;

    this.moveCommand = new MoveCommand(this.controller, selectedShapes, 0, 0);
    //this.moveCommand.execute();
  }

  onMouseMove(event) {
    if (this.selectedShapes.length == 0) return;

    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;

    this.moveCommand.offsetX = dx;
    this.moveCommand.offsetY = dy;

    this.moveCommand.execute();

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
    if (this.moveCommand) {
      this.controller.commandStack.push(this.moveCommand);
      this.moveCommand = null;
    }
    this.controller.switchToSelectState();
  }
}
