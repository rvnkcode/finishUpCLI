"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptTask = exports.checkTask = exports.addTask = exports.saveTask = void 0;
var os_1 = require("os");
var path_1 = require("path");
var fs_1 = require("fs");
var readline_sync_1 = require("readline-sync");
var cli_1 = require("./cli");
var homeDir = (0, os_1.homedir)();
var path = (0, path_1.normalize)(homeDir + "/documents/finishUp/todo.json");
var inbox = [];
var Task = (function () {
    function Task(goal) {
        this._bullet = "\u2022";
        this.aim = goal;
        this.creationDate = (0, cli_1.getToday)();
        this.isChecked = false;
    }
    return Task;
}());
function addTask() {
    var task = new Task((0, readline_sync_1.question)());
    inbox.push(task);
}
exports.addTask = addTask;
function saveTask() {
    (0, fs_1.writeFileSync)(path, JSON.stringify(inbox, null, 2));
}
exports.saveTask = saveTask;
function checkTask() {
    if ((0, fs_1.existsSync)(path)) {
        inbox = JSON.parse((0, fs_1.readFileSync)(path, "utf-8"));
    }
    else {
        try {
            (0, fs_1.mkdirSync)((0, path_1.dirname)(path));
            saveTask();
        }
        catch (error) {
            saveTask();
        }
    }
}
exports.checkTask = checkTask;
function promptTask() {
    if (inbox.length > 0) {
        for (var i = 0; i < inbox.length; i++) {
            console.log(inbox[i]._bullet, inbox[i].aim);
        }
    }
    else {
        console.log("There is no task any.");
    }
}
exports.promptTask = promptTask;
