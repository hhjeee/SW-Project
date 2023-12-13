class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(subscriber => subscriber !== observer);
    }

    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}


class Observer {
    // observer는 data로 shape을 받을 것임.
    update(shapes) {
        // 'data'를 사용하여 필요한 업데이트를 수행
    }
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
        const colorCoordinateInput = document.getElementById("colorPicker");

        if (shapes.length !== 1){
            widthInput.value = "";
            heightInput.value = "";
            xCoordinateInput.value = "";
            yCoordinateInput.value = "";
            colorCoordinateInput.value = "#000000";
        }
        else{
            let shape = shapes[0];
            
            let width = Math.round(shape.width);
            let height = Math.round(shape.height);

            let x = Math.round(shape.x);
            let y = Math.round(shape.y);

            let color = shape.color;

            // 각 입력 필드에 값을 설정
            widthInput.value = width;
            heightInput.value = height;
            xCoordinateInput.value = x;
            yCoordinateInput.value = y;
            colorCoordinateInput.value = color; // 색상 입력 필드의 ID가 'colorInput'이라고 가정
        }
    }

    
}
