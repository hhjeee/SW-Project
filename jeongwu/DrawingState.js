// DrawingState.js
let shapeIdCounter = 0;

class Shape {
  constructor(x, y, width, height, color) {
    this.object_id = shapeIdCounter++;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.zOrder = 0;
    this.color = color;
  }

  draw(context, shape) {
    throw new Error("This method must be implemented");
  }

  containsPoint(x, y) {
    // 기본적인 구현. 하위 클래스에서 오버라이드됨
    return false;
  }
}

class Rectangle extends Shape {
  draw(context, shape) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  drawResizeHandles(context) {
    const size = 8;
    context.fillStyle = "#000000";

    context.fillRect(this.x - size / 2, this.y - size / 2, size, size);
    context.fillRect(
      this.x + this.width - size / 2,
      this.y - size / 2,
      size,
      size
    );
    context.fillRect(
      this.x - size / 2,
      this.y + this.height - size / 2,
      size,
      size
    );
    context.fillRect(
      this.x + this.width - size / 2,
      this.y + this.height - size / 2,
      size,
      size
    );
  }

  containsPoint(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }
}

class Ellipse extends Shape {
  draw(context, shape) {
    context.beginPath();
    context.fillStyle = this.color;
    //context.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
    context.ellipse(
      this.x,
      this.y,
      this.width / 2,
      this.height / 2,
      0,
      0,
      2 * Math.PI
    );

    context.fill();
  }

  drawResizeHandles(context) {
    const size = 8;
    context.fillStyle = "#000000";

    context.fillRect(
      this.x - this.width / 2 - size / 2,
      this.y - this.height / 2 - size / 2,
      size,
      size
    );
    context.fillRect(
      this.x + this.width / 2 - size / 2,
      this.y - this.height / 2 - size / 2,
      size,
      size
    );
    context.fillRect(
      this.x - this.width / 2 - size / 2,
      this.y + this.height / 2 - size / 2,
      size,
      size
    );
    context.fillRect(
      this.x + this.width / 2 - size / 2,
      this.y + this.height / 2 - size / 2,
      size,
      size
    );
  }

  containsPoint(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    return dx * dx + dy * dy <= (this.width / 2) * (this.width / 2);
  }
}

class Line extends Shape {
  constructor(x, y, length, color) {
    super(x, y, length, 0, color);
  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.moveTo(this.x, this.y);
    context.lineTo(this.x + this.width, this.y);
    context.stroke();
  }

  drawResizeHandles(context) {
    const size = 8;
    context.fillStyle = "#000000";

    context.fillRect(this.x - size / 2, this.y - size / 2, size, size);
    context.fillRect(
      this.x + this.width - size / 2,
      this.y - size / 2,
      size,
      size
    );
  }

  containsPoint(x, y) {
    return (
      x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + 1
    );
  }
}

/*class Text extends Shape {
  constructor(x, y, text, fontSize, color) {
    super(x, y, 0, 0, color);
    this.text = text;
    this.fontSize = fontSize;
  }

  calculateTextWidth() {
    const metrics = this.context.measureText(this.text);
    return metrics.width;
  }

  draw(context) {
    context.fillStyle = this.color;
    context.font = this.fontSize + "px Arial";
    context.fillText(this.text, this.x, this.y);
  }

  drawResizeHandles(context) {
    const size = 8;
    context.fillStyle = "#000000";

    context.fillRect(this.x - size / 2, this.y - size / 2, size, size);
    context.fillRect(
      this.x + this.width - size / 2,
      this.y - size / 2,
      size,
      size
    );
    context.fillRect(
      this.x - size / 2,
      this.y + this.height - size / 2,
      size,
      size
    );
    context.fillRect(
      this.x + this.width - size / 2,
      this.y + this.height - size / 2,
      size,
      size
    );
  }

  containsPoint(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }
}*/
