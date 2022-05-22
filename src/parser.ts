import { readFileSync, writeFileSync } from "fs";
import { normalize } from "path";
import { homedir } from "os";
import { Task } from "./task";

const path: string = `/.todo/todo.txt`;
let entireText: string = readFileSync(
  normalize(homedir() + path),
  "utf-8"
).trim();
let textLines: string[] = [];

if (entireText.length > 0) {
  textLines = entireText.split(`\n`);
}

function saveToToDoTxt(todoList: Task[]): void {
  textLines = [];
  todoList.forEach((task) => {
    textLines.push(task.rawData);
  });
  entireText = textLines.join(`\n`);
  writeFileSync(homedir() + path, entireText, `utf-8`);
}

export { textLines, saveToToDoTxt };
