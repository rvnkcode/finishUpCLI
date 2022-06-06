#!/usr/bin/env node
/* 어이없다 user 아니고 usr!
커맨드라인에서 실행하기 위한 코드인 것 같음(?? 잘 모르겠지만 필요하다고 함):윈도우 환경에서는 필요 없고 리눅스, 맥 환경에서 필요하다고. */

import { Command } from "commander";
import * as pack from "../package.json";
import { main, promptTask } from "./main";
import {
  addItem,
  clearAll,
  delItem,
  modifyEntireItem,
  filterDueItem,
} from "./inbox";

const program: Command = new Command();

program
  .version(pack.version, `-v, --version`)
  .name(`fu`)
  .description(pack.description)
  .usage(`<command> <argument>`)
  .option(`-d, --dump`, ``, false)
  .option(`-w, --wait`, ``, false)
  .action((options) => {
    main(options);
  });

program
  .command(`add <text>`)
  .description(
    `add new task. You should put them between single or double quote.(''). The format of input text must be todo.txt format.`
  )
  .action((input) => {
    addItem(input);
    console.log(`Task added successfully.`);
  });

program
  .command(`due`)
  .description(`prompt task that has due date.`)
  .action(() => {
    promptTask(filterDueItem());
  });

program
  .command(`del <id>`)
  .description(`delete item by its index.`)
  .action(delItem);

program
  .command(`clear`)
  .description(`clear all items in inbox`)
  .action(clearAll);

program
  .command(`mod`)
  .description(
    `modify task by it's id. The format of input text must be todo.txt format.`
  )
  .argument(`<id>`, `id of modify task`)
  .argument(
    `<text>`,
    `The format of input text must be todo.txt format if command does not have any option.`
  )
  .action(modifyEntireItem);

program.command(`set`).requiredOption(`-d, --due`);
//.action(fn)

//program.command(`do <id>`).description(`check task by its id`).action(doTask);

//program
//  .command(`done <id>`)
//  .description(`check task by its id`)
//  .action(doneTask);

program.parse(process.argv);

//debug
//main();
