DrawingController.prototype.changeShapeProperty = function (
  propertyName,
  newValue
) {
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
};
