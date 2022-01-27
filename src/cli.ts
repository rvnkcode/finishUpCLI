#!/user/bin/env node
//커맨드라인에서 실행하기 위한 코드인 것 같음(?? 잘 모르겠지만 필요하다고 함):윈도우 환경에서는 필요 없고 리눅스, 맥 환경에서 필요하다고.

// import * as readline from "readline";
// import {stdin as input, stdout as output} from "process";
// node 기본 모듈 readline은 비동기라 cli에서 쓰기엔 부적절한듯?
// const rl =readline.createInterface({input, output});
import {question as getUserInput} from 'readline-sync';
import {homedir} from 'os';
import {dirname, normalize} from 'path'; // import path module
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs'; // import fs module


function getToday(): string {
    const dateAndTime: Date = new Date();
    const yyyy: string = dateAndTime.getFullYear().toString();
    let mm: string = (dateAndTime.getMonth() + 1).toString(); //Jan = 0
    let dd: string = dateAndTime.getDate().toString();

    if (mm.length < 2) {
        mm = `0` + mm;
    }

    if (dd.length < 2) {
        dd = `0` + dd;
    }

    return yyyy + `/` + mm + `/` + dd;
}

class Task {
    bullet: string;
    aim: string;
    //todo 나중에는 config 파일에서 설정을 읽어올 수 있게 하면 좋겠음
    private _symbol: string[] = [`•`, `＞`, `〆`, `◯`, `＜`, `−`];

    constructor(goal: string) {
        this.bullet = this._symbol[0];
        this.aim = goal;
    }
}

//todo 배열보다 나은 방법이 있는 것은 아닌지?
const inbox: Task[] = []; //클래스를 만들면 하나의 타입이 되므로 그대로 해당 클래스를 타입으로 가진 배열을 선언할 수 있게 된다!

const task = new Task(getUserInput());

inbox.push(task);
let path:string;

function createPath():string {
    const homeDir = homedir();
    //크로스플랫폼(일단 맥, 윈도우즈 대응)을 위해 normalize 사용
    //todo:나중엔 config 파일에서 설정치를 읽어오도록 바꾸고 싶음
    return normalize(homeDir + "/documents/finishUp/todo.json");
}

function checkFile(filePath:string):string {
    //비동기? 프로미스? 콜백? 개념들을 이런 곳에 쓰는거 아닌가....공부가 필요함
    if (!existsSync(filePath)) {
        path = createDirectory(filePath);
        path = createFile(filePath);
    } else {
        path = importFile(filePath);
    }
    return path;
}

function createDirectory(filePath:string):string {
    try {
        mkdirSync(dirname(filePath));
    } catch (error) {
        path = createFile(filePath);
        return path;
    }
    return ``;
}

function createFile(filePath:string):string {
    if (!existsSync(filePath)) {
        writeFileSync(filePath, JSON.stringify(inbox, null, 2));
    }
    return `ture`;
}

function importFile(filePath:string):string {
    const jsonFile = readFileSync(filePath, "utf-8");
    //JSON.parse는 filePath가 필요한 것이 아니고 string(그러니까 데이터 내용 그 자체)을 필요로 함
    return JSON.parse(jsonFile);
}

console.log(getToday());
console.log(inbox[0].bullet + inbox[0].aim);
