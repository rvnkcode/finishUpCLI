import { Task } from "./task";
import { textLines, saveToToDoTxt } from "./parser";
//import * as inquirer from "inquirer";

let todoList: Task[] = [];
const indexList: Set<number> = new Set();

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
  } else console.log(`ID doesn't exist in your To Do List. Pleas check again.`);
}

function modifyEntireItem(idInput: string, text: string): void {
  let id = getIndexById(idInput);
  if (checkId(id)) {
    todoList[id].allocateProperties(text);
    saveToToDoTxt(todoList);
    console.log(`Task is modified successfully.`);
  } else console.log(`ID doesn't exist in your To Do List. Pleas check again.`);
}

function filterDueItem(): Task[] {
  const list: Task[] = todoList.filter((task: Task) => {
    return task.dueDate;
  });
  sortByDue(list);
  return list;
}

function sortByDue(list?: Task[]): Task[] {
  let l: Task[] = todoList;

  if (list) {
    l = list;
  }

  l.sort((a, b) => {
    if (a.dueDate && b.dueDate) {
      return a.dueDate.valueOf() - b.dueDate.valueOf();
    } else return 0;
  });
  return l;
}

export {
  todoList,
  indexList,
  addItem,
  clearAll,
  delItem,
  modifyEntireItem,
  filterDueItem,
  sortByDue
};
