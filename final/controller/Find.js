DrawingController.prototype.findResizeHandle = function (event) {
  const rect = this.view.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  let handle_output = null;
  const handleSize = 8;
  let selectedShapes = this.selectedShapes;

  if (selectedShapes.length == 0) return null;
  let handles = {};

  selectedShapes.forEach((selectedShape) => {
    // 조절점 위치 계산
    if (selectedShape instanceof Ellipse) {
      const middleX = selectedShape.x;
      const middleY = selectedShape.y;

      handles = {
        "top-left": {
          x: middleX - selectedShape.width / 2,
          y: middleY - selectedShape.height / 2,
        },
        "top-right": {
          x: middleX + selectedShape.width / 2,
          y: middleY - selectedShape.height / 2,
        },
        "bottom-left": {
          x: middleX - selectedShape.width / 2,
          y: middleY + selectedShape.height / 2,
        },
        "bottom-right": {
          x: middleX + selectedShape.width / 2,
          y: middleY + selectedShape.height / 2,
        },
      };
    } else {
      handles = {
        "top-left": { x: selectedShape.x, y: selectedShape.y },
        "top-right": {
          x: selectedShape.x + selectedShape.width,
          y: selectedShape.y,
        },
        "bottom-left": {
          x: selectedShape.x,
          y: selectedShape.y + selectedShape.height,
        },
        "bottom-right": {
          x: selectedShape.x + selectedShape.width,
          y: selectedShape.y + selectedShape.height,
        },
      };
    }
    // 각 조절점에 대해 클릭된 지점이 조절점 영역 내에 있는지 확인
    for (const handle in handles) {
      const hx = handles[handle].x;
      const hy = handles[handle].y;
      if (
        x >= hx - handleSize / 2 &&
        x <= hx + handleSize / 2 &&
        y >= hy - handleSize / 2 &&
        y <= hy + handleSize / 2
      ) {
        handle_output = handle; // 해당 조절점 식별자 반환
      }
    }
  });

  return handle_output;
};

DrawingController.prototype.findShape = function (event) {
  const rect = this.view.canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const sortedShapes = this.shapes.sort((a, b) => b.zOrder - a.zOrder);

  for (let shape of sortedShapes) {
    if (shape.containsPoint(mouseX, mouseY)) {
      return shape;
    }
  }

  return null;
};
