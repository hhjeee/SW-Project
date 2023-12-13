class MoveCommand extends Command {
  constructor(controller, shapes, offsetX, offsetY) {
    super();
    this.controller = controller;
    this.shapes = shapes;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  execute() {
    this.shapes.forEach((shape) => {
      shape.x += this.offsetX;
      shape.y += this.offsetY;
    });

    this.controller.draw();
  }
}
