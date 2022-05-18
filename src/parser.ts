import { readFileSync } from "fs";
import { normalize } from "path";
import { Task } from "./task";
import { homedir } from "os";

const todoList: Task[] = [];
const entireText: string = readFileSync(
  normalize(homedir() + "/.todo/todo.txt"),
  "utf-8"
).trim();
const textLines: string[] = entireText.split(`\n`);
const indexList: Set<number> = new Set();

textLines.forEach((line: string) => {
  let task: Task = new Task(line.trim());
  task.index = todoList.length + 1;
  indexList.add(task.index);
  todoList.push(task);
});

todoList.forEach((task: Task) => {
  console.log(task.index + ` ` + task.mark + task.body);
});

export { indexList };
