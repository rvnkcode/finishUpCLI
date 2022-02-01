//#!/user/bin/env ts-node
//커맨드라인에서 실행하기 위한 코드인 것 같음(?? 잘 모르겠지만 필요하다고 함):윈도우 환경에서는 필요 없고 리눅스, 맥 환경에서 필요하다고.

import { Command } from "commander";
import * as pack from "../package.json";

const program = new Command();

program
  .version(pack.version, '-v, --version')
  .name('fu')

program  
  .command('add')
  //.option('-t, --test','test command')
  //.action()
program.parse(process.argv);

