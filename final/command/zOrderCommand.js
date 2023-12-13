class MoveToFrontCommand extends Command {
  constructor(controller, shape) {
    super();
    this.controller = controller;
    this.shape = shape;
  }

  execute() {
    if (this.shape.length == 1) {
      const maxZOrder = this.controller.shapes.reduce(
        (max, shape) => Math.max(max, shape.zOrder),
        0
      );

      this.shape[0].zOrder = maxZOrder;

      this.controller.shapes.forEach((shape) => {
        if (shape !== this.shape[0] && shape.zOrder > 0) {
          shape.zOrder -= 1;
        }
      });

      this.controller.draw();
    }
  }
}

class MoveToForwardCommand extends Command {
  constructor(controller, shape) {
    super();
    this.controller = controller;
    this.shape = shape;
    this.previousZOrder = shape.zOrder;
  }

  execute() {
    if (this.shape.length == 1) {
      if (this.shape[0].zOrder < this.controller.shapes.length - 1) {
        const currentIndex = this.controller.shapes.indexOf(this.shape[0]);
        const nextIndex = currentIndex + 1;

        [this.shape[0].zOrder, this.controller.shapes[nextIndex].zOrder] = [
          this.controller.shapes[nextIndex].zOrder,
          this.shape[0].zOrder,
        ];

        this.controller.draw();
      }
    }
  }
}

class MoveToBackCommand extends Command {
  constructor(controller, shape) {
    super();
    this.controller = controller;
    this.shape = shape;
    this.previousZOrder = shape.zOrder;
  }

  execute() {
    if (this.shape.length == 1) {
      this.shape[0].zOrder = 0;

      this.controller.shapes.forEach((shape) => {
        if (shape !== this.shape[0]) {
          shape.zOrder += 1;
        }
      });

      this.controller.draw();
    }
  }
}

class MoveToBackwardCommand extends Command {
  constructor(controller, shape) {
    super();
    this.controller = controller;
    this.shape = shape;
    this.previousZOrder = shape.zOrder;
  }

  execute() {
    if (this.shape.length == 1) {
      if (this.shape[0].zOrder > 0) {
        const currentIndex = this.controller.shapes.indexOf(this.shape[0]);
        const previousIndex = currentIndex - 1;

        [this.shape[0].zOrder, this.controller.shapes[previousIndex].zOrder] = [
          this.controller.shapes[previousIndex].zOrder,
          this.shape[0].zOrder,
        ];

        this.controller.draw();
      }
    }
  }
}
