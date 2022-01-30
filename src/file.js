"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndCreateDirectoryOrFileOrImportAndReadFile = exports.path = void 0;
var os_1 = require("os");
var path_1 = require("path");
var fs_1 = require("fs");
var homeDir = (0, os_1.homedir)();
var path = (0, path_1.normalize)(homeDir + "/documents/finishUp/todo.json");
exports.path = path;
function checkAndCreateDirectoryOrFileOrImportAndReadFile(path) {
    if ((0, fs_1.existsSync)(path)) {
        var savedData = JSON.parse((0, fs_1.readFileSync)(path, "utf-8"));
        return savedData;
    }
    else {
        try {
            (0, fs_1.mkdirSync)((0, path_1.dirname)(path));
            (0, fs_1.writeFileSync)(path, JSON.stringify(inbox, null, 2));
            return inbox;
        }
        catch (error) {
            (0, fs_1.writeFileSync)(path, JSON.stringify(inbox, null, 2));
            return inbox;
        }
    }
}
exports.checkAndCreateDirectoryOrFileOrImportAndReadFile = checkAndCreateDirectoryOrFileOrImportAndReadFile;
