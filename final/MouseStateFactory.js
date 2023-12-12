// MouseStateFactory.js
class MouseStateFactory {
  createDefaultState(controller) {}
  createSelectState(controller) {}
  createDragState(controller) {}
  createResizeState(controller) {}
}

class ConcreteMouseStateFactory extends MouseStateFactory {
  createDefaultState(controller) {
    return new MouseState(controller);
  }

  createSelectState(controller) {
    return new SelectState(controller);
  }

  createDragState(controller) {
    return new DragState(controller);
  }

  createResizeState(controller) {
    return new ResizeState(controller);
  }
}
