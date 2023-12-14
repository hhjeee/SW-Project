DrawingController.prototype.changeShapeProperty = function (
  propertyName,
  newValue
) {
  for (let i = 0; i < this.selectedShapes.length; i++) {
    const changePropertyCommand = new ChangeShapePropertyCommand(
      this,
      this.selectedShapes[i],
      propertyName,
      newValue
    );
    changePropertyCommand.execute();
    this.commandStack.push(changePropertyCommand);
  }
};
