import { homedir } from "os";
import { dirname, normalize } from "path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { getToday } from "./main";

//todo 나중에는 config 파일에서 설정을 읽어올 수 있게 하면 좋겠음
type Mark = `•` | `＞` | `〆` | `◯` | `＜` | `−`; //자기가 스스로 특정 '타입'을 만들 수도 있음

const homeDir: string = homedir(); //크로스플랫폼(일단 맥, 윈도우즈 대응)을 위해 normalize 사용
let path: string = normalize(homeDir + "/documents/finishUp/todo.json"); //todo:나중엔 config 파일에서 설정치를 읽어오도록 바꾸고 싶음
let inbox: any[] = []; //todo 배열보다 나은 방법이 있는 것은 아닌지? `any`로 하는 수밖에 없음? 배열 안 오브젝트 요소에 액세스하려면??왜??

/*Interfaces define "public contracts",
it describes the public side of the class and as such it doesn't make sense to have private access modifier.*/
interface Todo {
  bullet: Mark;
  aim: string;
  creationDate?: string;
}

class Task implements Todo {
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    for (let idx of inbox) {
      if (idx._id === value) {
        this._id = value + 1;
        value++;
      }
    }
  }

  private _id: number;
  bullet: Mark;
  aim: string;
  creationDate: string;
  done: boolean;

  constructor(goal: string) {
    this._id = 1;
    this.bullet = `•`;
    this.aim = goal;
    this.creationDate = getToday();
    this.done = false;
  }
}

function checkInbox(): boolean {
  return existsSync(path);
}

function getInbox() {
  inbox = JSON.parse(readFileSync(path, "utf-8"));
  return inbox;
}

function saveTask(arr: any): void {
  try {
    writeFileSync(path, JSON.stringify(arr, null, 2));
  } catch (error) {
    if (!checkInbox()) {
      console.log(`디렉토리가 존재하지 않습니다.`);
    }
  }
}

function makeDirAndFile() {
  try {
    mkdirSync(dirname(path));
    saveTask(inbox);
  } catch (error) {
    saveTask(inbox);
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
  console.log(`Task is added.`);
  saveTask(inbox);
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

function delTask(id: number): void {
  inbox.splice(id, 1);
  console.log(`The item is deleted.`);
  saveTask(inbox);
}

function searchTaskById(id: string): void {
  let idNumber: number = parseInt(id); //콘솔 인풋은 스트링타입이기 때문에 int 로 변환이 필요함
  for (let idx of inbox) {
    if (idNumber === idx._id) {
      idNumber = inbox.indexOf(idx);
      delTask(idNumber);
      break;
    }
  }
}

export { addTask, promptTask, searchTaskById };
