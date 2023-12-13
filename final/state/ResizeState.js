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
    }
    this.controller.switchToSelectState();
  }
}
