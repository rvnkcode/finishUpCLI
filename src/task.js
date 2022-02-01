"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptTask = exports.addTask = void 0;
var os_1 = require("os");
var path_1 = require("path");
var fs_1 = require("fs");
var main_1 = require("./main");
var homeDir = (0, os_1.homedir)();
var path = (0, path_1.normalize)(homeDir + "/documents/finishUp/todo.json");
var inbox = [];
var Task = (function () {
    function Task(goal) {
        this.bullet = "\u2022";
        this.aim = goal;
        this.creationDate = (0, main_1.getToday)();
        this.done = false;
    }
    return Task;
}());
function checkInbox() {
    return (0, fs_1.existsSync)(path);
}
function getInbox() {
    inbox = JSON.parse((0, fs_1.readFileSync)(path, "utf-8"));
    return inbox;
}
function saveTask(arr) {
    try {
        (0, fs_1.writeFileSync)(path, JSON.stringify(arr, null, 2));
    }
    catch (error) {
        if (!checkInbox()) {
            console.log("\uB514\uB809\uD1A0\uB9AC\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
        }
    }
}
function makeDirAndFile() {
    try {
        (0, fs_1.mkdirSync)((0, path_1.dirname)(path));
        saveTask(inbox);
    }
    catch (error) {
        saveTask(inbox);
    }
}
function setupInbox() {
    if (checkInbox()) {
        inbox = getInbox();
    }
    else {
        makeDirAndFile();
    }
}
setupInbox();
function addTask(userInput) {
    var task = new Task(userInput);
    inbox.push(task);
    console.log("Task is added.");
    saveTask(inbox);
}
exports.addTask = addTask;
function promptTask() {
    if (inbox.length > 0) {
        for (var _i = 0, inbox_1 = inbox; _i < inbox_1.length; _i++) {
            var tsk = inbox_1[_i];
            console.log(tsk.bullet, tsk.aim);
        }
    }
    else {
        console.log("There is no task any.");
    }
}
exports.promptTask = promptTask;
