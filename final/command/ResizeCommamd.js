// ResizeCommand.js
class ResizeCommand extends Command {
  constructor(controller, shapes, handle, dx, dy) {
    super();
    this.controller = controller;
    this.shapes = shapes;
    this.handle = handle;
    this.dx = dx;
    this.dy = dy;
    this.previousStates = [];
  }

  execute() {
    this.shapes.forEach((shape) => {
      switch (this.handle) {
        case "top-left":
          shape.x += this.dx;
          shape.width -= this.dx;
          shape.y += this.dy;
          shape.height -= this.dy;
          break;
        case "top-right":
          shape.width += this.dx;
          shape.y += this.dy;
          shape.height -= this.dy;
          break;
        case "bottom-left":
          shape.x += this.dx;
          shape.width -= this.dx;
          shape.height += this.dy;
          break;
        case "bottom-right":
          shape.width += this.dx;
          shape.height += this.dy;
          break;
      }
    });

    this.controller.draw();
  }
}
