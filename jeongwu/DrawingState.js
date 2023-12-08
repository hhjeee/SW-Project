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
        const size = 8; // 조절점의 크기
        context.fillStyle = "#000000"; // 조절점의 색상

        // 사각형의 네 모서리에 조절점을 그립니다.
        context.fillRect(this.x - size / 2, this.y - size / 2, size, size);
        context.fillRect(this.x + this.width - size / 2, this.y - size / 2, size, size);
        context.fillRect(this.x - size / 2, this.y + this.height - size / 2, size, size);
        context.fillRect(this.x + this.width - size / 2, this.y + this.height - size / 2, size, size);
    }

    containsPoint(x, y) {
        return x >= this.x && x <= this.x + this.width &&
               y >= this.y && y <= this.y + this.height;
    }
}

class Circle extends Shape {
    draw(context, shape) {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
        context.fill();
    }
    
    drawResizeHandles(context) {
        const size = 8; // 조절점의 크기
        context.fillStyle = "#000000"; // 조절점의 색상

        // 사각형의 네 모서리에 조절점을 그립니다.
        context.fillRect(this.x - this.width/2 - size / 2, this.y - this.height/2 - size / 2, size, size);
        context.fillRect(this.x + this.width/2 - size / 2, this.y - this.height/2 - size / 2, size, size);
        context.fillRect(this.x - this.width/2 - size / 2, this.y + this.height/2 - size / 2, size, size);
        context.fillRect(this.x + this.width/2 - size / 2, this.y + this.height/2 - size / 2, size, size);
    }

    containsPoint(x, y) {
        const dx = x - this.x;
        const dy = y - this.y;
        return dx * dx + dy * dy <= (this.width / 2) * (this.width / 2);
    }
}
