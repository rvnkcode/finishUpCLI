#!/usr/bin/env node
/* 어이없다 user 아니고 usr!
커맨드라인에서 실행하기 위한 코드인 것 같음(?? 잘 모르겠지만 필요하다고 함):윈도우 환경에서는 필요 없고 리눅스, 맥 환경에서 필요하다고. */

import { Command } from "commander";
import * as pack from "../package.json";
import { addTask, clearInbox, delTask, doneTask, modifyItem } from "./task";
import { main } from "./main";

const program: Command = new Command();

program
  .version(pack.version, `-v, --version`)
  .name(`fu`)
  .description(pack.description)
  .usage(`<command> <argument>`)
  .action(main);

program.command(`add <text>`).description(`add new task`).action(addTask);
program
  .command(`del <number>`)
  .description(`delete task or note`)
  .action(delTask);
program.command(`done <number>`).description(`done task`).action(doneTask);
program
  .command(`clear`)
  .description(`clear all items in inbox`)
  .action(clearInbox);
program.command(`mod`).description(`modify selected item`).action(modifyItem);

program.parse(process.argv);
