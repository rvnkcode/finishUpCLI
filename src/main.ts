
/*import * as readline from "readline";
import {stdin as input, stdout as output} from "process";
//node ?? ?? "readline"? ???? "cli"?? ??? ??????
const rl =readline.createInterface({input, output});*/

//import { promptCLLoop } from "readline-sync";

import { saveTask, addTask } from "./task";
import { checkTask, promptTask } from "./task";

function getToday(): string {
  const date: Date = new Date();
  /*
                  const yyyy: string = date.getFullYear().toString();
                  let mm: string = (date.getMonth() + 1).toString(); //Jan = 0
                  let dd: string = date.getDate().toString();
  
                  if (mm.length < 2) {
                          mm = `0` + mm;
                  }
  
                  if (dd.length < 2) {
                          dd = `0` + dd;
                  }
          */
  return date.toLocaleDateString("ko-KR");
}

function main() {
  console.log(getToday());
  checkTask();
  promptTask();
}

//?? ?? sub main()?? ????.....??
/* promptCLLoop({
  add() {
    addTask();
    console.log(`Task is add to inbox.`);
  },
  exit() {
    saveTask();
    console.log(`good-bye`);
    return true;
  },
}); */

export { getToday, main };
