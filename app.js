const canvas = new fabric.Canvas("canvas");
let selectedShape = "text";

// create part
document
  .getElementById("shapeDropdown")
  .addEventListener("change", function (event) {
    selectedShape = event.target.value;
  });

function createObject() {
  const e = canvas.getPointer(canvas.upperCanvasEl);
  switch (selectedShape) {
    case "image":
      createImage(e);
      break;
    case "text":
      createText();
      break;
    case "line":
      createLine();
      break;
    case "rectangle":
      createRectangle();
      break;
    case "circle":
      createCircle();
      break;
    default:
      break;
  }
}

function createText() {
  const text = new fabric.IText("text", {
    left: Math.random() * (canvas.width - 100),
    top: Math.random() * (canvas.height - 100),
    fill: "#000000",
  });
  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.renderAll();
}

function createLine() {
  const line = new fabric.Line([0, 0, 100, 0], {
    //default -> 가로길이기 100인 직선
    left: Math.random() * (canvas.width - 100),
    top: Math.random() * (canvas.height - 100),
    stroke: "#000000",
  });
  canvas.add(line);
  canvas.setActiveObject(line);
  canvas.renderAll();
}

function createRectangle() {
  const rectangle = new fabric.Rect({
    left: Math.random() * (canvas.width - 100),
    top: Math.random() * (canvas.height - 100),
    width: 100,
    height: 50,
    fill: "#000000",
  });
  canvas.add(rectangle);
  canvas.setActiveObject(rectangle);
  canvas.renderAll();
}

function createCircle() {
  const circle = new fabric.Circle({
    left: Math.random() * (canvas.width - 100),
    top: Math.random() * (canvas.height - 100),
    radius: 50,
    fill: "#000000",
  });
  canvas.add(circle);
  canvas.setActiveObject(circle);
  canvas.renderAll();
}
// -- create part

// update properties part
function updateInput(selectedObject) {
  const widthInput = document.getElementById("width");
  const heightInput = document.getElementById("height");
  const xCoordinateInput = document.getElementById("xCoordinate");
  const yCoordinateInput = document.getElementById("yCoordinate");
  const colorPicker = document.getElementById("colorPicker");

  if (!selectedObject) {
    widthInput.value = "null";
    heightInput.value = "null";
    xCoordinateInput.value = "null";
    yCoordinateInput.value = "null";
    colorPicker.value = "#000000";
    return;
  }

  if (selectedObject && selectedObject.scaleX) {
    const scaledWidth = selectedObject.getScaledWidth();
    widthInput.value = Math.round(scaledWidth);
  }

  if (selectedObject && selectedObject.scaleX) {
    const scaledHeight = selectedObject.getScaledHeight();
    heightInput.value = Math.round(scaledHeight);
  }

  if (selectedObject) {
    const xCoordinate = selectedObject.left;
    xCoordinateInput.value = Math.round(xCoordinate);
  }
  if (selectedObject) {
    const yCoordinate = selectedObject.top;
    yCoordinateInput.value = Math.round(yCoordinate);
  }
}

canvas.on("selection:cleared", function (options) {
  updateInput(null);
});
canvas.on("object:selected", function (options) {
  const selectedObject = options.target;
  colorPicker.value = selectedObject.fill;
  updateInput(selectedObject);
});
canvas.on("object:scaling", function (options) {
  const scaledObject = options.target;
  updateInput(scaledObject);
});
canvas.on("object:moving", function (options) {
  const movedObject = options.target;
  updateInput(movedObject);
});

document.getElementById("width").addEventListener("input", function (event) {
  const newWidth = parseFloat(event.target.value);
  if (!newWidth) {
    newWidth = 1;
  }

  const activeObject = canvas.getActiveObject();

  if (activeObject && !isNaN(newWidth)) {
    //유효한 숫자인 경우
    activeObject.set({ scaleX: newWidth / activeObject.width });
    canvas.renderAll();
    updateInput(activeObject);
  }
});
document.getElementById("height").addEventListener("input", function (event) {
  const newHeight = parseInt(event.target.value, 10);
  if (!newHeight) {
    newHeight = 1;
  }
  const activeObject = canvas.getActiveObject();
  if (activeObject && !isNaN(newHeight)) {
    activeObject.set({ scaleY: newHeight / activeObject.height });
    canvas.renderAll();
    updateInput(activeObject);
  }
});
document
  .getElementById("xCoordinate")
  .addEventListener("input", function (event) {
    const newXCoordinate = parseInt(event.target.value, 10);

    const activeObject = canvas.getActiveObject();
    if (activeObject && !isNaN(newXCoordinate)) {
      activeObject.set({ left: newXCoordinate });
      canvas.renderAll();
      updateInput(activeObject);
    }
  });
document
  .getElementById("yCoordinate")
  .addEventListener("input", function (event) {
    const newYCoordinate = parseInt(event.target.value, 10);

    const activeObject = canvas.getActiveObject();
    if (activeObject && !isNaN(newYCoordinate)) {
      activeObject.set({ top: newYCoordinate });
      canvas.renderAll();
      updateInput(activeObject);
    }
  });
document
  .getElementById("colorPicker")
  .addEventListener("input", function (event) {
    const selectedColor = event.target.value;
    const activeObject = canvas.getActiveObject();

    if (activeObject) {
      activeObject.set({ fill: selectedColor });
      canvas.renderAll();
      updateProperties(activeObject);
    }
  });
// update properties part

// z-order part
function moveToFront() {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.bringToFront(activeObject); //맨 앞으로
  }
}
function moveToForward() {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.bringForward(activeObject); //한 칸 앞으로
  }
}

function moveToBack() {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.sendToBack(activeObject); // 맨 뒤로
  }
}
function moveToBackward() {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.sendBackwards(activeObject); //한 칸 뒤로
  }
}
// -- z-order part
