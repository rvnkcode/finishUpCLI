"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.doTask = exports.setUpInbox = exports.modifyItem = exports.clearInbox = exports.doneTask = exports.delItem = exports.promptItem = exports.addItem = exports.inbox = void 0;
var os_1 = require("os");
var path_1 = require("path");
var fs_1 = require("fs");
var item_1 = require("./item");
var inquirer = __importStar(require("inquirer"));
var homeDir = (0, os_1.homedir)();
var path = (0, path_1.normalize)(homeDir + "/.finishUp/todo.json");
var inbox = [];
exports.inbox = inbox;
function checkInbox() {
    return (0, fs_1.existsSync)(path);
}
function getInbox(inbox) {
    inbox = JSON.parse((0, fs_1.readFileSync)(path, "utf-8"));
    return inbox;
}
function exportToJson(listOfTask) {
    try {
        (0, fs_1.writeFileSync)(path, JSON.stringify(listOfTask, null, 2));
    }
    catch (error) {
        if (!checkInbox()) {
            console.log("ERROR:\uB514\uB809\uD1A0\uB9AC\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
        }
    }
}
function makeDirAndFile(inbox) {
    try {
        (0, fs_1.mkdirSync)((0, path_1.dirname)(path));
        exportToJson(inbox);
    }
    catch (error) {
        exportToJson(inbox);
    }
}
function setUpInbox() {
    if (checkInbox() == false) {
        makeDirAndFile(inbox);
    }
    exports.inbox = inbox = getInbox(inbox);
    return inbox;
}
exports.setUpInbox = setUpInbox;
function clearInbox() {
    exports.inbox = inbox = [];
    exportToJson(inbox);
    console.log("cleared");
}
exports.clearInbox = clearInbox;
exports.inbox = inbox = setUpInbox();
function addItem(userInput, isNote) {
    var item;
    if (isNote) {
        item = new item_1.Note(userInput);
        console.log("note!");
    }
    else {
        item = new item_1.Task(userInput);
        console.log("task!");
    }
    item.id = inbox.length + 1;
    inbox.push(item);
    exportToJson(inbox);
    console.log("Item added successfully");
}
exports.addItem = addItem;
function promptItem() {
    if (inbox.length > 0) {
        for (var _i = 0, inbox_1 = inbox; _i < inbox_1.length; _i++) {
            var itm = inbox_1[_i];
            console.log(itm._id, itm.bullet, itm.text);
        }
    }
    else {
        console.log("There is no task any.");
    }
}
exports.promptItem = promptItem;
function getIndexById(id) {
    return inbox.findIndex(function (element) { return element._id === parseInt(id); });
}
function getIndexByBody(input) {
    return inbox.findIndex(function (element) { return element.body === input; });
}
function checkId(id) {
    return id > -1;
}
function delItem(userInput) {
    var id = getIndexById(userInput);
    if (checkId(id)) {
        inbox.splice(id, 1);
        exportToJson(inbox);
        console.log("deleted");
    }
    else
        console.log("ERROR");
}
exports.delItem = delItem;
function modifyItem() {
    if (inbox.length > 0) {
        inquirer
            .prompt([
            {
                type: "list",
                name: "item",
                message: "Choose item to modify",
                choices: inbox.map(function (item) { return item.body; }),
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
                inbox[idx].body = input.content;
                exportToJson(inbox);
                console.log("modified");
            });
        });
    }
    else
        console.log("inbox is empty");
}
exports.modifyItem = modifyItem;
function isTask(id) {
    if (inbox[id].bullet != "[-]") {
        return true;
    }
    else
        return false;
}
function isExistTask(id) {
    if (checkId(id) && isTask(id)) {
        return true;
    }
    else
        return false;
}
function doTask(userInput) {
    var id = getIndexById(userInput);
    if (isExistTask(id)) {
        inbox[id].bullet = "[>]";
        exportToJson(inbox);
        console.log("checked");
    }
    else
        console.error("ERROR");
}
exports.doTask = doTask;
function doneTask(userInput) {
    var id = getIndexById(userInput);
    if (isExistTask(id)) {
        inbox[id].bullet = "[X]";
        exportToJson(inbox);
        console.log("checked");
    }
    else
        console.error("ERROR");
}
exports.doneTask = doneTask;
