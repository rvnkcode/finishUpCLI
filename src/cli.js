#!/usr/bin/env node
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
var commander_1 = require("commander");
var pack = __importStar(require("../package.json"));
var task_1 = require("./task");
var main_1 = require("./main");
var program = new commander_1.Command();
program
    .version(pack.version, "-v, --version")
    .name("fu")
    .description(pack.description)
    .usage("<command> <argument>")
    .action(main_1.main);
program.command("add <text>").description("add new task").action(task_1.addTask);
program
    .command("del <number>")
    .description("delete task or note")
    .action(task_1.delTask);
program.command("done <number>").description("done task").action(task_1.doneTask);
program
    .command("clear")
    .description("clear all items in inbox")
    .action(task_1.clearInbox);
program.command("mod").description("modify selected item").action(task_1.modifyItem);
program.parse(process.argv);
