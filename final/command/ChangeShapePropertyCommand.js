class ChangeShapePropertyCommand extends Command {
  constructor(controller, shape, propertyName, newValue) {
    super();
    this.controller = controller;
    this.shape = shape;
    this.propertyName = propertyName;
    this.newValue = newValue;
    this.previousValue = shape[propertyName];
  }

  execute() {
    this.shape[this.propertyName] = this.newValue;
    this.controller.draw();
  }
}
