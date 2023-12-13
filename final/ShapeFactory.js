// Abstract Factory
class ShapeFactory {
  createRectangle(x, y, width, height, color) {}
  createEllipse(x, y, width, height, color) {}
  createLine(x, y, length, color) {}
  //createText(x, y, text, fontSize, color) {}
}

// Concrete Factory
class ConcreteShapeFactory extends ShapeFactory {
  createRectangle(config) {
    const { x, y, width, height, color } = config;
    return new Rectangle(x, y, width, height, color);
  }

  createEllipse(config) {
    const { x, y, width, height, color } = config;
    return new Ellipse(x, y, width, height, color);
  }

  createLine(config) {
    const { x, y, length, color } = config;
    return new Line(x, y, length, color);
  }

  /*createText(config) {
    const {x, y, text, fontSize, color} = config;
    return new Text(x, y, text, fontSize, color);
  }*/
}
