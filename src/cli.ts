#!/usr/bin/env node
/* 어이없다 user 아니고 usr!
커맨드라인에서 실행하기 위한 코드인 것 같음(?? 잘 모르겠지만 필요하다고 함):윈도우 환경에서는 필요 없고 리눅스, 맥 환경에서 필요하다고. */

import { Command } from "commander";
import * as pack from "../package.json";
import {
  addItem,
  clearInbox,
  delItem,
  doTask,
  doneTask,
  modifyItem,
} from "./inbox";
import { main } from "./main";

const program: Command = new Command();

program
  .version(pack.version, `-v, --version`)
  .name(`fu`)
  .description(pack.description)
  .usage(`<command> <argument>`)
  .action(main);

program
  .command(`add`)
  .argument(`<text>`, `add new items to inbox.`)
  .option(`-n, --note`, `add new note instead of task`)
  .description(
    `add new task or note. You should put them between single or double quote.('')`
  )
  //.action(addItem);
  .action((text, options) => {
    if (options.note) {
      addItem(text, true);
    } else {
      addItem(text, false);
    }
  });

program
  .command(`del <id>`)
  .description(`delete item by its id`)
  .action(delItem);

program.command(`do <id>`).description(`check task by its id`).action(doTask);

program
  .command(`done <id>`)
  .description(`check task by its id`)
  .action(doneTask);

program
  .command(`clear`)
  .description(`clear all items in inbox`)
  .action(clearInbox);

//TODO: mod <id>로 id를 넣으면 해당 아이템을 수정하게 했으면 좋겠고 아니면 선택형으로 대화형 프롬포트가 나왔으면 좋겠음
program.command(`mod`).description(`modify selected item`).action(modifyItem);

// program
//   .command(`t <id>`)
//   .action(testfn);

program.parse(process.argv);
