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
