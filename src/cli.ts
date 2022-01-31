#!/user/bin/env node
//커맨드라인에서 실행하기 위한 코드인 것 같음(?? 잘 모르겠지만 필요하다고 함):윈도우 환경에서는 필요 없고 리눅스, 맥 환경에서 필요하다고.

/*import * as readline from "readline";
import {stdin as input, stdout as output} from "process";
//node 기본 모듈 "readline"은 비동기라 "cli"에서 쓰기엔 부적절한듯?
const rl =readline.createInterface({input, output});*/

import { keyInPause, promptCLLoop } from "readline-sync";
import { saveTask, addTask, checkTask, promptTask } from "./task";

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
  ``;
  promptTask();
}

main();

//그럼 이걸 sub main()으로 봐야하나.....??
promptCLLoop({
  add() {
    addTask();
    console.log(`Task is add to inbox.`);
  },
  exit() {
    saveTask();
    console.log(`good-bye`);
    return true;
  },
});

export { getToday };
