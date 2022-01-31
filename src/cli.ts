#!/user/bin/env node
//커맨드라인에서 실행하기 위한 코드인 것 같음(?? 잘 모르겠지만 필요하다고 함):윈도우 환경에서는 필요 없고 리눅스, 맥 환경에서 필요하다고.

/*import * as readline from "readline";
import {stdin as input, stdout as output} from "process";
//node 기본 모듈 readline은 비동기라 cli에서 쓰기엔 부적절한듯?
const rl =readline.createInterface({input, output});*/

import {question as getUserInput} from 'readline-sync';
import {homedir} from 'os';
import {dirname, normalize} from 'path'; // import path module
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs'; // import fs module

type Emblem = `•` | `＞` | `〆` | `◯` | `＜` | `−`; //자기가 스스로 특정 '타입'을 만들 수도 있음

const homeDir: string = homedir(); //크로스플랫폼(일단 맥, 윈도우즈 대응)을 위해 normalize 사용
let path: string = normalize(homeDir + "/documents/finishUp/todo.json"); //todo:나중엔 config 파일에서 설정치를 읽어오도록 바꾸고 싶음

function getToday(): string {
    const dateAndTime: Date = new Date();
    const yyyy: string = dateAndTime.getFullYear().toString();
    let mm: string = (dateAndTime.getMonth() + 1).toString(); //Jan = 0
    let dd: string = dateAndTime.getDate().toString();

    console.log(dateAndTime.getUTCDate());
    
    if (mm.length < 2) {
        mm = `0` + mm;
    }

    if (dd.length < 2) {
        dd = `0` + dd;
    }

    return yyyy + `/` + mm + `/` + dd;
}

interface Todo {
    bullet: Emblem;
    aim: string;
    creationDate: string;
}

class Task implements Todo{
    bullet: Emblem;
    aim: string;
    creationDate: string;
    //todo 나중에는 config 파일에서 설정을 읽어올 수 있게 하면 좋겠음

    constructor(goal: string) {
        this.bullet = `•`;
        this.aim = goal;
        this.creationDate = getToday();
    }
}

console.log(getToday());
if (existsSync(path)) {
    let savedData: object[] = JSON.parse(readFileSync(path, "utf-8"));
    console.log(savedData);
} else {
    let task: Task = new Task(getUserInput());
    let arr: object[] = [];

    arr.push(task);
    console.log(arr);
}

//todo 배열보다 나은 방법이 있는 것은 아닌지?
