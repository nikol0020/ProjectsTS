var View = (function () {
    function View() {
    }
    View.prototype.showResult = function (result) {
        var display = document.querySelector('.display');
        display.value = result;
    };
    return View;
}());
var Model = (function () {
    function Model() {
    }
    Model.prototype.calculate = function (input, currentValue) {
        var result;
        if (currentValue.indexOf('=') >= 0) {
            result = eval(this.replaceSigns(input));
        }
        else if (currentValue.indexOf('c') >= 0) {
            result = "";
        }
        else {
            result = input + currentValue;
        }
        return result;
    };
    Model.prototype.replaceSigns = function (str) {
        var res;
        res = str.replace("^", "**");
        res = res.replace("x", "*");
        return res;
    };
    return Model;
}());
var Controller = (function () {
    function Controller(model, view) {
        this.model = model;
        this.view = view;
    }
    Controller.prototype.handleClick = function (inputData, currentValue) {
        var calculatedResult = this.model.calculate(inputData, currentValue);
        this.view.showResult(calculatedResult);
    };
    return Controller;
}());
;
var App = (function () {
    function App(controller) {
        this.controller = controller;
    }
    App.prototype.init = function () {
        var _this = this;
        var inputData = document.querySelector('.display');
        var calc = document.querySelectorAll("input[type= button]");
        for (var i = 0; i < calc.length; i++) {
            calc[i].addEventListener("click", function (e) { return _this.controller.handleClick(inputData.value, e.target.value); });
        }
    };
    return App;
}());
var view = new View();
var model = new Model();
var controller = new Controller(model, view);
var app = new App(controller);
app.init();
//# sourceMappingURL=main.js.map