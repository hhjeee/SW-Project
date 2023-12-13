class AddRectangleCommand extends Command {
  constructor(controller, shapeFactory, shapeParams) {
    super();
    this.controller = controller;
    this.shapeFactory = shapeFactory;
    this.shapeParams = shapeParams;
    this.addedShape = null;
  }

  execute() {
    this.addedShape = this.shapeFactory.createRectangle(this.shapeParams);
    this.addedShape.zOrder = this.controller.shapes.length;
    this.controller.shapes.push(this.addedShape);
    this.controller.draw();
  }
}

class AddEllipseCommand extends Command {
  constructor(controller, shapeFactory, shapeParams) {
    super();
    this.controller = controller;
    this.shapeFactory = shapeFactory;
    this.shapeParams = shapeParams;
    this.addedShape = null;
  }

  execute() {
    this.addedShape = this.shapeFactory.createEllipse(this.shapeParams);
    this.addedShape.zOrder = this.controller.shapes.length;
    this.controller.shapes.push(this.addedShape);
    this.controller.draw();
  }
}

class AddLineCommand extends Command {
  constructor(controller, shapeFactory, shapeParams) {
    super();
    this.controller = controller;
    this.shapeFactory = shapeFactory;
    this.shapeParams = shapeParams;
    this.addedShape = null;
  }

  execute() {
    this.addedShape = this.shapeFactory.createLine(this.shapeParams);
    this.addedShape.zOrder = this.controller.shapes.length;
    this.controller.shapes.push(this.addedShape);
    this.controller.draw();
  }
}

class AddTextCommand extends Command {
  constructor(controller, shapeFactory, shapeParams) {
    super();
    this.controller = controller;
    this.shapeFactory = shapeFactory;
    this.shapeParams = shapeParams;
    this.addedShape = null;
  }

  execute() {
    this.addedShape = this.shapeFactory.createText(this.shapeParams);
    this.addedShape.zOrder = this.controller.shapes.length;
    this.controller.shapes.push(this.addedShape);
    this.controller.draw();
  }
}
