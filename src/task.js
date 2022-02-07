"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyItem = exports.clearInbox = exports.doneTask = exports.delTask = exports.promptTask = exports.addTask = void 0;
var os_1 = require("os");
var path_1 = require("path");
var fs_1 = require("fs");
var main_1 = require("./main");
var inquirer = __importStar(require("inquirer"));
var homeDir = (0, os_1.homedir)();
var path = (0, path_1.normalize)(homeDir + "/documents/finishUp/todo.json");
var inbox = [];
var Task = (function () {
    function Task(goal) {
        this._id = 1;
        this.bullet = "[ ]";
        this.aim = goal;
        this.creationDate = (0, main_1.getToday)();
    }
    Object.defineProperty(Task.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            var idArr = [];
            for (var _i = 0, inbox_1 = inbox; _i < inbox_1.length; _i++) {
                var i = inbox_1[_i];
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
    return Task;
}());
function checkInbox() {
    return (0, fs_1.existsSync)(path);
}
function getInbox() {
    inbox = JSON.parse((0, fs_1.readFileSync)(path, "utf-8"));
    return inbox;
}
function exportToJson(listOfTask) {
    try {
        (0, fs_1.writeFileSync)(path, JSON.stringify(listOfTask, null, 2));
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
        exportToJson(inbox);
    }
    catch (error) {
        exportToJson(inbox);
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
    exportToJson(inbox);
    console.log("added");
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
function getIndexById(id) {
    return inbox.findIndex(function (element) { return element._id === parseInt(id); });
}
function getIndexByBody(input) {
    return inbox.findIndex(function (element) { return element.aim === input; });
}
function checkId(userInput) {
    return getIndexById(userInput) > -1;
}
function delTask(userInput) {
    if (checkId(userInput)) {
        inbox.splice(getIndexById(userInput), 1);
        exportToJson(inbox);
        console.log("deleted");
    }
    else
        console.log("ERROR");
}
exports.delTask = delTask;
function doneTask(userInput) {
    if (checkId(userInput)) {
        inbox[getIndexById(userInput)].bullet = "[X]";
        exportToJson(inbox);
        console.log("checked");
    }
    else
        console.log("ERROR");
}
exports.doneTask = doneTask;
function clearInbox() {
    inbox = [];
    exportToJson(inbox);
    console.log("cleared");
}
exports.clearInbox = clearInbox;
function modifyItem() {
    if (inbox.length > 0) {
        inquirer
            .prompt([
            {
                type: "list",
                name: "item",
                message: "Choose item to modify",
                choices: inbox.map(function (item) { return item.aim; }),
            },
        ])
            .then(function (selection) {
            var idx = getIndexByBody(selection.item);
            inquirer
                .prompt([
                {
                    type: "input",
                    name: "content",
                },
            ])
                .then(function (input) {
                inbox[idx].aim = input.content;
                exportToJson(inbox);
                console.log("modified");
            });
        });
    }
    else
        console.log("inbox is empty");
}
exports.modifyItem = modifyItem;
