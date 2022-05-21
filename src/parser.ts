import { readFileSync } from "fs";
import { normalize } from "path";
import { homedir } from "os";

const entireText: string = readFileSync(
  normalize(homedir() + "/.todo/todo.txt"),
  "utf-8"
).trim();
const textLines: string[] = entireText.split(`\n`);

// prompt
// todoList.forEach((task: Task) => {
//   console.log(task.index + ` ` + task.mark + task.body);
// });

export { textLines };
