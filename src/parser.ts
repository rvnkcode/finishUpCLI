import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, normalize } from "path";
import { homedir } from "os";
import { Task } from "./task";
import { exit } from "process";

const path: string = normalize(homedir() + `/.finishUp/todo.txt`);
let entireText: string = ``;
let textLines: string[] = [];

if (!existsSync(path)) {
  try {
    mkdirSync(dirname(path));
    writeFileSync(path, ``, "utf-8");
  } catch (error) {
    writeFileSync(path, ``, "utf-8");
  }
}

try {
  entireText = readFileSync(path, "utf-8").trim();
} catch (error) {
  console.error(`ERROR: The file doesn't exists.`);
  exit();
}

if (entireText.length > 0) {
  textLines = entireText.split(`\n`);
}

function saveToToDoTxt(todoList: Task[]): void {
  textLines = [];
  todoList.forEach((task) => {
    textLines.push(task.rawData);
  });
  entireText = textLines.join(`\n`);
  writeFileSync(path, entireText, `utf-8`);
}

export { textLines, saveToToDoTxt };
