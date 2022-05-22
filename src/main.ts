import { todoList } from "./inbox";
import { Task } from "./task";

function main(): void {
  const date: Date = new Date();
  console.log(date.toISOString().split(`T`)[0]); // yyyy-MM-dd

  if (todoList.length > 0) {
    todoList.forEach((task: Task) => {
      if (
        task.fields.hasOwnProperty(`hide`) ||
        task.fields.hasOwnProperty(`h`) ||
        task.fields.hasOwnProperty(`Hide`) ||
        task.fields.hasOwnProperty(`wait`)
      ) {
        return; // 만약 continue 를 쓰면 jump target cannot cross function boundary typescript 에러 발생
      }
      console.log(task.index + ` ` + task.mark + ` ` + task.body);
    });
  } else console.log(`Your task is done! Have a nice day.`);
}

export { main };
