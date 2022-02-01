"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.getToday = void 0;
var task_1 = require("./task");
function getToday() {
    var date = new Date();
    return date.toLocaleDateString("ko-KR");
}
exports.getToday = getToday;
function main() {
    console.log(getToday());
    (0, task_1.promptTask)();
}
exports.main = main;
