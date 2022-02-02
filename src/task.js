"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchTaskById = exports.promptTask = exports.addTask = void 0;
var os_1 = require("os");
var path_1 = require("path");
var fs_1 = require("fs");
var main_1 = require("./main");
var homeDir = (0, os_1.homedir)();
var path = (0, path_1.normalize)(homeDir + "/documents/finishUp/todo.json");
var inbox = [];
var Task = (function () {
    function Task(goal) {
        this._id = 1;
        this.bullet = "\u2022";
        this.aim = goal;
        this.creationDate = (0, main_1.getToday)();
        this.done = false;
    }
    Object.defineProperty(Task.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            for (var _i = 0, inbox_1 = inbox; _i < inbox_1.length; _i++) {
                var idx = inbox_1[_i];
                if (idx._id === value) {
                    this._id = value + 1;
                    value++;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
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
    task.id = inbox.length + 1;
    inbox.push(task);
    console.log("Task is added.");
    saveTask(inbox);
}
exports.addTask = addTask;
function promptTask() {
    if (inbox.length > 0) {
        for (var _i = 0, inbox_2 = inbox; _i < inbox_2.length; _i++) {
            var tsk = inbox_2[_i];
            console.log(tsk._id, tsk.bullet, tsk.aim);
        }
    }
    else {
        console.log("There is no task any.");
    }
}
exports.promptTask = promptTask;
function delTask(id) {
    inbox.splice(id, 1);
    console.log("The item is deleted.");
    saveTask(inbox);
}
function searchTaskById(id) {
    var idNumber = parseInt(id);
    for (var _i = 0, inbox_3 = inbox; _i < inbox_3.length; _i++) {
        var idx = inbox_3[_i];
        if (idNumber === idx._id) {
            idNumber = inbox.indexOf(idx);
            delTask(idNumber);
            break;
        }
    }
}
exports.searchTaskById = searchTaskById;
addTask(`asdf`);