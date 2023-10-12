const canvas = new fabric.Canvas("canvas");
let selectedShape = "text";

//
document
  .getElementById("shapeDropdown")
  .addEventListener("change", function (event) {
    selectedShape = event.target.value;
  });

//-----create object-----
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
//----------

// --- z-order 변경 ---
canvas.on("mouse:down", function (options) {
  const selectedObject = options.target;
  if (selectedObject) {
    // 선택된 도형의 Z-order를 변경 -> 맨앞으로 이동
    canvas.bringToFront(selectedObject);
  }
});
// ------

function updateProperties(selectedObject) {
  const sizeElement = document.getElementById("size");
  const colorElement = document.getElementById("color");
  const positionElement = document.getElementById("position");

  // 선택된 object 없을때 값 나타내지 않기
  if (!selectedObject) {
    sizeElement.innerText = "가로: 세로: ";
    colorElement.innerText = "색상: ";
    positionElement.innerText = "X좌표: Y좌표: ";
    return;
  }

  // 선택된 object의 속성 창을 보여주기
  sizeElement.innerText = `가로: ${selectedObject.getScaledWidth()} 세로: ${selectedObject.getScaledHeight()}`;
  colorElement.innerText = `색상: ${selectedObject.fill || "없음"}`;
  positionElement.innerText = `X좌표: ${selectedObject.left} Y좌표: ${selectedObject.top}`;
}
// ------

// -- object의 크기가 변경되었을때 이를 받아옴 --
canvas.on("object:scaling", function (options) {
  const scaledObject = options.target;
  updateProperties(scaledObject);
});
// 선택된 object
canvas.on("object:selected", function (options) {
  const selectedObject = options.target;
  updateProperties(selectedObject);
});
// 선택된 object가 없을때
canvas.on("selection:cleared", function (options) {
  updateProperties(null);
});
canvas.on("object:moving", function (options) {
  const movedObject = options.target;
  updateProperties(movedObject);
});

// ------
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
