DrawingController.prototype.handleRectangleClick = function (event) {
  const addRectangleCommand = new AddRectangleCommand(this, this.shapeFactory, {
    x: Math.random() * (this.view.canvas.width - 100),
    y: Math.random() * (this.view.canvas.height - 100),
    width: 100,
    height: 100,
    color: "#FF0000",
  });

  addRectangleCommand.execute();
  this.commandStack.push(addRectangleCommand);
};

DrawingController.prototype.handleEllipseClick = function (event) {
  const addEllipseCommand = new AddEllipseCommand(this, this.shapeFactory, {
    x: Math.random() * (this.view.canvas.width - 100),
    y: Math.random() * (this.view.canvas.height - 100),
    width: 100,
    height: 100,
    color: "#0000FF",
  });

  addEllipseCommand.execute();
  this.commandStack.push(addEllipseCommand);
};

DrawingController.prototype.handleLineClick = function (event) {
  const addLineCommand = new AddLineCommand(this, this.shapeFactory, {
    x: Math.random() * (this.view.canvas.width - 100),
    y: Math.random() * (this.view.canvas.height - 100),
    length: 200,
    color: "#000000",
  });

  addLineCommand.execute();
  this.commandStack.push(addLineCommand);
};

DrawingController.prototype.handleTextClick = function (event) {
  const addTextCommand = new AddTextCommand(this, this.shapeFactory, {
    x: Math.random() * (this.view.canvas.width - 100),
    y: Math.random() * (this.view.canvas.height - 100),
    width: 150,
    height: 90,
    text: "text",
    color: "#00FF00",
  });

  addTextCommand.execute();
  this.commandStack.push(addTextCommand);
};
