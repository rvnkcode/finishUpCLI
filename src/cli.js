#!/user/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToday = void 0;
var readline_sync_1 = require("readline-sync");
var task_1 = require("./task");
function getToday() {
    var date = new Date();
    return date.toLocaleDateString("ko-KR");
}
exports.getToday = getToday;
function main() {
    console.log(getToday());
    (0, task_1.checkTask)();
    (0, task_1.promptTask)();
}
main();
(0, readline_sync_1.promptCLLoop)({
    add: function () {
        (0, task_1.addTask)();
        console.log("Task is add to inbox.");
    },
    exit: function () {
        (0, task_1.saveTask)();
        console.log("good-bye");
        return true;
    },
});
(0, readline_sync_1.keyInPause)((0, task_1.promptTask)());
