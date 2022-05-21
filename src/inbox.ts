import { Task } from "./task";
import { textLines } from "./parser";

const todoList: Task[] = [];
const indexList: Set<number> = new Set();
//const date: Date = new Date();

textLines.forEach((line: string) => {
  let task: Task = new Task(line.trim());
  task.index = todoList.length + 1;
  indexList.add(task.index);
  todoList.push(task);
});

export { todoList, indexList };
