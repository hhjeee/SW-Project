// Command.js
class Command {
  execute() {}
  undo() {}
}

/*// CreateShapeCommand.js
class CreateShapeCommand extends Command {
  constructor(controller, shape) {
    super();
    this.controller = controller;
    this.shape = shape;
  }

  execute() {
    this.controller.addShape(this.shape);
  }

  undo() {
    this.controller.removeShape(this.shape);
  }
}

// DeleteShapeCommand.js
class DeleteShapeCommand extends Command {
  constructor(controller, shape) {
    super();
    this.controller = controller;
    this.shape = shape;
  }

  execute() {
    this.controller.removeShape(this.shape);
  }

  undo() {
    this.controller.addShape(this.shape);
  }
}*/

// MoveToFrontCommand.js
class MoveToFrontCommand extends Command {
  constructor(controller, shape) {
    super();
    this.controller = controller;
    this.shape = shape;
    this.previousZOrder = shape.zOrder;
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

  undo() {
    this.shape.zOrder = this.previousZOrder;
    this.controller.draw();
  }
}

// MoveToForwardCommand.js
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
        // 선택된 도형이 이미 가장 앞에 있는 것이 아니라면, 한 단계 앞으로 이동
        const currentIndex = this.controller.shapes.indexOf(this.shape[0]);
        const nextIndex = currentIndex + 1;

        // Z-순서 값을 교환
        [this.shape[0].zOrder, this.controller.shapes[nextIndex].zOrder] = [
          this.controller.shapes[nextIndex].zOrder,
          this.shape[0].zOrder,
        ];

        this.controller.draw();
      }
    }
  }

  undo() {
    this.shape.zOrder = this.previousZOrder;
    this.controller.draw();
  }
}

// MoveToBackCommand.js
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

  undo() {
    this.shape.zOrder = this.previousZOrder;
    this.controller.draw();
  }
}

// MoveToBackwardCommand.js
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

  undo() {
    this.shape.zOrder = this.previousZOrder;
    this.controller.draw();
  }
}
