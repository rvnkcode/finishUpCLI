"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.getToday = void 0;
var inbox_1 = require("./inbox");
function getToday() {
    var date = new Date();
    return date.toLocaleDateString("ko-KR");
}
exports.getToday = getToday;
function main() {
    console.log(getToday());
    (0, inbox_1.promptItem)();
}
exports.main = main;
