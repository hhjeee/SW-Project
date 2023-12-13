DrawingController.prototype.moveToFront = function () {
  this.moveToFrontCommand = new MoveToFrontCommand(this, this.selectedShapes);
  this.moveToFrontCommand.execute();
  this.commandStack.push(this.moveToFrontCommand);
};

DrawingController.prototype.moveToForward = function () {
  this.moveToForwardCommand = new MoveToForwardCommand(
    this,
    this.selectedShapes
  );
  this.moveToForwardCommand.execute();
  this.commandStack.push(this.moveToForwardCommand);
};

DrawingController.prototype.MoveToBack = function () {
  this.moveToBackCommand = new MoveToBackCommand(this, this.selectedShapes);
  this.moveToBackCommand.execute();
  this.commandStack.push(this.moveToBackCommand);
};

DrawingController.prototype.moveToBackward = function () {
  this.moveToBackwardCommand = new MoveToBackwardCommand(
    this,
    this.selectedShapes
  );
  this.moveToBackwardCommand.execute();
  this.commandStack.push(this.moveToBackwardCommand);
};
