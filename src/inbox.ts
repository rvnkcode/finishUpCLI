import { homedir } from "os";
import { dirname, normalize } from "path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { Task, Note } from "./item";
import * as inquirer from "inquirer";

const homeDir: string = homedir(); //크로스플랫폼(일단 맥, 윈도우즈 대응)을 위해 normalize 사용
const path: string = normalize(homeDir + "/.finishUp/todo.json"); //TODO:나중엔 config 파일에서 설정치를 읽어오도록 바꾸고 싶음
let home: any[] = []; //TODO: 배열보다 나은 방법이 있는 것은 아닌지? `any`로 하는 수밖에 없음? 배열 안 오브젝트 요소에 액세스하려면??왜??
let inbox: any[] = [];

home.push(inbox);

// dealing with inbox
// function checkInbox(): boolean {
//   return existsSync(path);
// }

function getField(home: any) {
  home = JSON.parse(readFileSync(path, "utf-8"));
  return home;
}

function exportToJson(listOfTask: any): void {
  try {
    writeFileSync(path, JSON.stringify(listOfTask, null, 2));
  } catch (error) {
    if (!existsSync(path)) {
      console.log(`ERROR:디렉토리가 존재하지 않습니다.`);
    }
  }
}

function makeDirAndFile(home: any) {
  try {
    mkdirSync(dirname(path));
    exportToJson(home);
  } catch (error) {
    exportToJson(home);
  }
}

function setUpField(): any {
  if (!existsSync(path)) {
    //경로에 파일이 존재하지 않을 경우
    makeDirAndFile(home);
  }
  home = getField(home);
  return home;
}

home = setUpField(); // inbox 초기화

function clearInbox(): void {
  // inbox = [];
  home[0] = []; //home[0] = inbox;
  exportToJson(home);
  console.log(`cleared`);
}

//dealing with item(task or not: method for everything)
function addItem(userInput: string, isNote?: boolean): void {
  let item: any;
  if (isNote) {
    item = new Note(userInput);
    console.log(`add note`);
  } else {
    item = new Task(userInput);
    console.log(`add task!`);
  }
  item.id = home[0].length + 1;
  item.project = `inbox`;
  home[0].push(item);
  exportToJson(home);
  console.log(`Item added successfully`);
}

function promptItem(): void {
  if (home[0].length > 0) {
    //아 대박 멍청이 타스/자스에서 같다는 ==지요?
    for (let itm of home[0]) {
      console.log(itm._id, itm.status, itm.text);
    }
  } else {
    console.log(`There is no task any.`);
  }
}

function getIndexById(id: string): number {
  return home[0].findIndex((element: any) => element._id === parseInt(id));
}

function getIndexByBody(input: string): number {
  return home[0].findIndex((element: any) => element.body === input);
}

function checkId(id: number): boolean {
  return id > -1;
}

function delItem(userInput: string): void {
  let id = getIndexById(userInput);
  if (checkId(id)) {
    home[0].splice(id, 1); //id 번부터 '1'개를 지움
    exportToJson(home);
    console.log(`deleted`);
  } else console.log(`ERROR`);
}

function modifyItem(): void {
  if (home[0].length > 0) {
    inquirer
      .prompt([
        {
          type: "list",
          name: "item",
          message: "Choose item to modify",
          choices: home[0].map((item: any) => item.body), //배열 내 각 <item>마다 <item.body>을 반환함
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
            home[0][idx].body = input.content;
            exportToJson(home);
            console.log(`modified`);
          });
      });
  } else console.log(`inbox is empty`);
}

// for task only
function isTask(id: number): boolean {
  if (home[0][id].status != `[-]`) {
    //if (inbox[id].constructor.name == `Task`) { // it returns `object`
    return true;
  } else return false;
}

function isExistTask(id: number): boolean {
  if (checkId(id) && isTask(id)) {
    return true;
  } else return false;
}

function doTask(userInput: string): void {
  let id: number = getIndexById(userInput);
  if (isExistTask(id)) {
    home[0][id].status = `[>]`;
    console.log(`checked`);
  } else console.error(`ERROR`);
}

function doneTask(userInput: string): void {
  let id: number = getIndexById(userInput);
  if (isExistTask(id)) {
    home[0][id].status = `[X]`;
    exportToJson(home);
    console.log(`checked`);
  } else console.error(`ERROR`);
}


// function testfn(id: string): void {
//   console.log(inbox[getIndexById(id)].constructor.name);
// }

export {
  inbox,
  home,
  addItem,
  promptItem,
  delItem,
  doneTask,
  clearInbox,
  modifyItem,
  setUpField,
  doTask,
  //  testfn,
};
