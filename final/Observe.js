class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(
      (subscriber) => subscriber !== observer
    );
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class Observer {
  // observer는 data로 shape을 받을 것임.
  update(shapes) {}
}

class PropertiesPanel extends Observer {
  update(shapes) {
    this.updateProperties(shapes);
  }

  updateProperties(shapes) {
    const widthInput = document.getElementById("width");
    const heightInput = document.getElementById("height");
    const xCoordinateInput = document.getElementById("xCoordinate");
    const yCoordinateInput = document.getElementById("yCoordinate");
    const colorInput = document.getElementById("colorPicker");

    if (shapes.length !== 1) {
      widthInput.value = "";
      heightInput.value = "";
      xCoordinateInput.value = "";
      yCoordinateInput.value = "";
      colorInput.value = "#000000";
    } else {
      let shape = shapes[0];

      let width = Math.round(shape.width);
      let height = Math.round(shape.height);

      let x = Math.round(shape.x);
      let y = Math.round(shape.y);

      let color = shape.color;

      widthInput.value = width;
      heightInput.value = height;
      xCoordinateInput.value = x;
      yCoordinateInput.value = y;
      colorInput.value = color;
    }
  }
}
