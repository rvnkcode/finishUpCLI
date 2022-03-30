"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = exports.Task = void 0;
var main_1 = require("./main");
var inbox_1 = require("./inbox");
var Note = (function () {
    function Note(userInput) {
        this._id = 1;
        this.bullet = "[-]";
        this.text = userInput;
        this.creationDate = (0, main_1.getToday)();
    }
    Object.defineProperty(Note.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            var idArr = [];
            for (var _i = 0, inbox_2 = inbox_1.inbox; _i < inbox_2.length; _i++) {
                var i = inbox_2[_i];
                idArr.push(i._id);
            }
            var max = Math.max.apply(Math, idArr);
            if (max < value) {
                this._id = value;
            }
            else {
                this._id = max + 1;
            }
        },
        enumerable: false,
        configurable: true
    });
    return Note;
}());
exports.Note = Note;
var Task = (function (_super) {
    __extends(Task, _super);
    function Task(userInput) {
        var _this = _super.call(this, userInput) || this;
        _this.bullet = "[ ]";
        _this.isDoing = false;
        _this.isDone = false;
        _this.project = "";
        _this.dueDate = "";
        return _this;
    }
    return Task;
}(Note));
exports.Task = Task;
