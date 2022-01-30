#!/user/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline_sync_1 = require("readline-sync");
var os_1 = require("os");
var path_1 = require("path");
var fs_1 = require("fs");
var homeDir = (0, os_1.homedir)();
var path = (0, path_1.normalize)(homeDir + "/documents/finishUp/todo.json");
function getToday() {
    var dateAndTime = new Date();
    var yyyy = dateAndTime.getFullYear().toString();
    var mm = (dateAndTime.getMonth() + 1).toString();
    var dd = dateAndTime.getDate().toString();
    if (mm.length < 2) {
        mm = "0" + mm;
    }
    if (dd.length < 2) {
        dd = "0" + dd;
    }
    return yyyy + "/" + mm + "/" + dd;
}
var Task = (function () {
    function Task(goal) {
        this._symbol = ["\u2022", "\uFF1E", "\u3006", "\u25EF", "\uFF1C", "\u2212"];
        this.bullet = this._symbol[0];
        this.aim = goal;
    }
    return Task;
}());
console.log(getToday());
if ((0, fs_1.existsSync)(path)) {
    var savedData = JSON.parse((0, fs_1.readFileSync)(path, "utf-8"));
    console.log(savedData);
}
else {
    var task = new Task((0, readline_sync_1.question)());
    var arr = [];
    arr.push(task);
    console.log(arr);
}
