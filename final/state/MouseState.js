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
