import { homedir } from "os";
import { dirname, normalize } from "path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { question as getUserInput } from "readline-sync";
import { getToday } from "./main";

//todo 나중에는 config 파일에서 설정을 읽어올 수 있게 하면 좋겠음
type Mark = `•` | `＞` | `〆` | `◯` | `＜` | `−`; //자기가 스스로 특정 '타입'을 만들 수도 있음

const homeDir: string = homedir(); //크로스플랫폼(일단 맥, 윈도우즈 대응)을 위해 normalize 사용
let path: string = normalize(homeDir + "/documents/finishUp/todo.json"); //todo:나중엔 config 파일에서 설정치를 읽어오도록 바꾸고 싶음
let inbox: any[] = []; //todo 배열보다 나은 방법이 있는 것은 아닌지? any로 하는 수밖에 없음? 배열 안 오브젝트 요소에 액세스하려면????왜???????

/*Interfaces define "public contracts",
it describes the public side of the class and as such it doesn't make sense to have private access modifier.*/
interface Todo {
  //bullet: Mark;
  aim: string;
  isChecked: boolean;
}

class Task implements Todo {
  _bullet: Mark;

  /*  get bullet() {
		return this._bullet;
	}

	set bullet(date?: string, done?: boolean) {
		if (done) {
			this._bullet = `〆`;
		}
	}*/

  aim: string;
  creationDate: string;
  isChecked: boolean;
  isPending: boolean;
  // isTask: boolean;
  // isProject: boolean;
  // isNote: boolean;

  constructor(goal: string) {
    this._bullet = `•`;
    this.aim = goal;
    this.creationDate = getToday();
    this.isChecked = false;
    this.isPending = false;
  }
}

function addTask(): void {
  const task = new Task(getUserInput());
  inbox.push(task);
  //return inbox;
}

function saveTask(): void {
  writeFileSync(path, JSON.stringify(inbox, null, 2));
}

function checkTask(): void {
  if (existsSync(path)) {
    inbox = JSON.parse(readFileSync(path, "utf-8"));
  } else {
    try {
      mkdirSync(dirname(path));
      saveTask();
    } catch (error) {
      saveTask();
    }
  }
}

function promptTask(): void {
  if (inbox.length > 0) {
    //아 대박 멍청이 타스/자스에서 같다는 ==지요?
    for (let i: number = 0; i < inbox.length; i++) {
      console.log(inbox[i]._bullet, inbox[i].aim);
    }
  } else {
    console.log(`There is no task any.`);
  }
}

export { saveTask, addTask, checkTask, promptTask };
