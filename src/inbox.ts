import { Task } from "./task";
import { textLines, saveToToDoTxt } from "./parser";

let todoList: Task[] = [];
const indexList: Set<number> = new Set();
//const date: Date = new Date();
// const tempBackup: string[] = textLines;

// textLines.forEach((line: string) => {
//   let task: Task = new Task(line.trim());
//   task.index = todoList.length + 1;
//   indexList.add(task.index);
//   todoList.push(task);
// });

textLines.forEach((line: string) => {
  addItem(line);
});

function addItem(input: string): void {
  let task: Task = new Task(input.trim());
  task.index = todoList.length + 1;
  indexList.add(task.index);
  todoList.push(task);
  task.updateRawData();
  saveToToDoTxt(todoList);
}

function clearAll(): void {
  todoList = [];
  saveToToDoTxt(todoList);
}

function getIndexById(id: string): number {
  return todoList.findIndex((task: Task) => task.index === parseInt(id));
}

function checkId(id: number): boolean {
  return id > -1;
}

function delItem(input: string): void {
  let id = getIndexById(input);
  if (checkId(id)) {
    todoList.splice(id, 1); //id 번부터 '1'개를 지움
    saveToToDoTxt(todoList);
    console.log(`Deleted.`);
  } else console.log(`ERROR`);
}

// function reloadToDoList(): void {
//   todoList.forEach((task) => {
//     task.updateRawData();
//   });
// }

export { todoList, indexList, addItem, clearAll, delItem };
