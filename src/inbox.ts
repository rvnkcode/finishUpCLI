import { homedir } from "os";
import { dirname, normalize } from "path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { Task, Note } from "./item";
import * as inquirer from "inquirer";

const homeDir: string = homedir(); //크로스플랫폼(일단 맥, 윈도우즈 대응)을 위해 normalize 사용
let path: string = normalize(homeDir + "/.finishUp/todo.json"); //TODO:나중엔 config 파일에서 설정치를 읽어오도록 바꾸고 싶음
let inbox: any[] = []; //todo 배열보다 나은 방법이 있는 것은 아닌지? `any`로 하는 수밖에 없음? 배열 안 오브젝트 요소에 액세스하려면??왜??

function checkInbox(): boolean {
  return existsSync(path);
}

function getInbox(inbox: any) {
  inbox = JSON.parse(readFileSync(path, "utf-8"));
  return inbox;
}

function exportToJson(listOfTask: any): void {
  try {
    writeFileSync(path, JSON.stringify(listOfTask, null, 2));
  } catch (error) {
    if (!checkInbox()) {
      console.log(`ERROR:디렉토리가 존재하지 않습니다.`);
    }
  }
}

function makeDirAndFile(inbox: any) {
  try {
    mkdirSync(dirname(path));
    exportToJson(inbox);
  } catch (error) {
    exportToJson(inbox);
  }
}

function setUpInbox(): any {
  // if (checkInbox()) {
  //   inbox = getInbox();
  // } else {
  //   makeDirAndFile(); //inbox still [];
  // }
  if (checkInbox() == false) {
    makeDirAndFile(inbox);
  }
  inbox = getInbox(inbox);
  return inbox;
}

inbox = setUpInbox();
// setUpInbox();

function addItem(userInput: string, isNote?: any): void {
  let item: any;
  if (isNote) {
    item = new Note(userInput);
    console.log(isNote);
  } else {
    item = new Task(userInput);
  }
  item.id = inbox.length + 1;
  inbox.push(item);
  exportToJson(inbox);
  console.log(`Item added successfully`);
}

function promptTask(): void {
  if (inbox.length > 0) {
    //아 대박 멍청이 타스/자스에서 같다는 ==지요?
    for (let itm of inbox) {
      console.log(itm._id, itm.bullet, itm.text);
    }
  } else {
    console.log(`There is no task any.`);
  }
}

function getIndexById(id: string): number {
  return inbox.findIndex((element) => element._id === parseInt(id));
}

function getIndexByBody(input: string): number {
  return inbox.findIndex((element) => element.body === input);
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
          choices: inbox.map((item) => item.body), //배열 내 각 <item>마다 <item.body>을 반환함
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
            inbox[idx].body = input.content;
            exportToJson(inbox);
            console.log(`modified`);
          });
      });
  } else console.log(`inbox is empty`);
}

export {
  inbox,
  addItem,
  promptTask,
  delTask,
  doneTask,
  clearInbox,
  modifyItem,
  setUpInbox,
};

