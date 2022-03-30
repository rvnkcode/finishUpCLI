#!/usr/bin/env node
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
var commander_1 = require("commander");
var pack = __importStar(require("../package.json"));
var inbox_1 = require("./inbox");
var main_1 = require("./main");
var program = new commander_1.Command();
program
    .version(pack.version, "-v, --version")
    .name("fu")
    .description(pack.description)
    .usage("<command> <argument>")
    .action(main_1.main);
program
    .command("add <text>")
    .option("-n, --note", "add new note instead of task", false)
    .description("add new task or note. If you wanna type some sentence, you should put them between single quote.('')")
    .action(inbox_1.addItem);
program
    .command("del <id>")
    .description("delete item by its id")
    .action(inbox_1.delTask);
program
    .command("done <id>")
    .description("check task by its id")
    .action(inbox_1.doneTask);
program
    .command("clear")
    .description("clear all items in inbox")
    .action(inbox_1.clearInbox);
program.command("mod").description("modify selected item").action(inbox_1.modifyItem);
program.parse(process.argv);
