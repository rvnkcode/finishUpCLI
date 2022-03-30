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
    try {
        (0, inbox_1.setUpInbox)();
    }
    catch (error) {
        console.error("Failed to get the list.");
    }
    (0, inbox_1.promptTask)();
}
exports.main = main;
