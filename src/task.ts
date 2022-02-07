import { homedir } from "os";
import { dirname, normalize } from "path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { getToday } from "./main";
import * as inquirer from "inquirer";

//todo 나중에는 config 파일에서 설정을 읽어올 수 있게 하면 좋겠음
type Mark = `[ ]` | `[>]` | `[X]` | `[O]` | `[<]` | `[-]`; //자기가 스스로 특정 '타입'을 만들 수도 있음

const homeDir: string = homedir(); //크로스플랫폼(일단 맥, 윈도우즈 대응)을 위해 normalize 사용
let path: string = normalize(homeDir + "/documents/finishUp/todo.json"); //todo:나중엔 config 파일에서 설정치를 읽어오도록 바꾸고 싶음
let inbox: any[] = []; //todo 배열보다 나은 방법이 있는 것은 아닌지? `any`로 하는 수밖에 없음? 배열 안 오브젝트 요소에 액세스하려면??왜??

/*Interfaces define "public contracts",
it describes the public side of the class and as such it doesn't make sense to have private access modifier.*/
interface Item {
  //bullet: Mark;
  aim: string;
  creationDate?: string;
}

class Task implements Item {
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    let idArr: number[] = [];
    for (let i of inbox) {
      idArr.push(i._id);
    }
    let max = Math.max(...idArr); //todo: 왜 ...이 들어가지?
    if (max < value) {
      this._id = value;
    } else {
      this._id = max + 1;
    }
  }

  private _id: number;
  bullet: Mark;
  aim: string;
  creationDate: string;

  constructor(goal: string) {
    this._id = 1;
    this.bullet = `[ ]`;
    this.aim = goal;
    this.creationDate = getToday();
  }
}

function checkInbox(): boolean {
  return existsSync(path);
}

function getInbox() {
  inbox = JSON.parse(readFileSync(path, "utf-8"));
  return inbox;
}

function exportToJson(listOfTask: any): void {
  try {
    writeFileSync(path, JSON.stringify(listOfTask, null, 2));
  } catch (error) {
    if (!checkInbox()) {
      console.log(`디렉토리가 존재하지 않습니다.`);
    }
  }
}

function makeDirAndFile() {
  try {
    mkdirSync(dirname(path));
    exportToJson(inbox);
  } catch (error) {
    exportToJson(inbox);
  }
}

function setupInbox(): void {
  if (checkInbox()) {
    inbox = getInbox();
  } else {
    makeDirAndFile(); //inbox still [];
  }
}

setupInbox();

function addTask(userInput: string): void {
  const task = new Task(userInput);
  task.id = inbox.length + 1;
  inbox.push(task);
  exportToJson(inbox);
  console.log(`added`);
}

function promptTask(): void {
  if (inbox.length > 0) {
    //아 대박 멍청이 타스/자스에서 같다는 ==지요?
    for (let tsk of inbox) {
      console.log(tsk._id, tsk.bullet, tsk.aim);
    }
  } else {
    console.log(`There is no task any.`);
  }
}

function getIndexById(id: string): number {
  return inbox.findIndex((element) => element._id === parseInt(id));
}

function getIndexByBody(input: string): number {
  return inbox.findIndex((element) => element.aim === input);
}

function checkId(userInput: string): boolean {
  return getIndexById(userInput) > -1;
}

function delTask(userInput: string): void {
  if (checkId(userInput)) {
    inbox.splice(getIndexById(userInput), 1); //id 번부터 '1'개를 지움
    exportToJson(inbox);
    console.log(`deleted`);
  } else console.log(`ERROR`);
}

function doneTask(userInput: string): void {
  if (checkId(userInput)) {
    inbox[getIndexById(userInput)].bullet = `[X]`;
    exportToJson(inbox);
    console.log(`checked`);
  } else console.log(`ERROR`);
}

function clearInbox(): void {
  inbox = [];
  exportToJson(inbox);
  console.log(`cleared`);
}

function modifyItem(): void {
  if (inbox.length > 0) {
    inquirer
      .prompt([
        {
          type: "list",
          name: "item",
          message: "Choose item to modify",
          choices: inbox.map((item) => item.aim), //배열 내 각 <item>마다 <item.aim>을 반환함
        },
      ])
      .then((selection) => {
        const idx = getIndexByBody(selection.item);
        inquirer
          .prompt([
            {
              type: "input",
              name: "content",
            },
          ])
          .then((input) => {
            inbox[idx].aim = input.content;
            exportToJson(inbox);
            console.log(`modified`);
          });
      });
  } else console.log(`inbox is empty`);
}

export { addTask, promptTask, delTask, doneTask, clearInbox, modifyItem };
