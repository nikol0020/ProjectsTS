class View {
    showResult(result: string) {

        let display = document.querySelector('.display');
        (display as HTMLInputElement).value = result;
    }
}

class Model {
    calculate(input: string, currentValue: string): string {
        let result: string;
        if (currentValue.indexOf('=') >= 0) {
            result = eval(this.replaceSigns(input));
        } else if (currentValue.indexOf('c') >= 0) {
            result = "";
        } else {
            result = input + currentValue;
        }
        return result;
    }

    replaceSigns(str: string): string {
        let res;
        res = str.replace("^", "**");
        res = res.replace("x", "*");
        return res;
    }
}

class Controller {
    model: Model;
    view: View;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
    }

    handleClick(inputData: string, currentValue: string) {
        let calculatedResult = this.model.calculate(inputData, currentValue);
        this.view.showResult(calculatedResult);
    }
}
;

class App {
    controller: Controller;

    constructor(controller: Controller) {
        this.controller = controller;
    }

    init() {
        let inputData = document.querySelector('.display');
        let calc = document.querySelectorAll("input[type= button]");
        for (let i = 0; i < calc.length; i++) {
        calc[i].addEventListener("click", (e: Event) => this.controller.handleClick((inputData as HTMLInputElement).value,(<HTMLInputElement>e.target).value));
        }
    }
}
let view = new View();
let model = new Model();
let controller = new Controller(model, view);
let app = new App(controller);
app.init();
