import { todoList } from "./inbox";
import { Task } from "./task";

const doNotWait: string = `오늘의 할 일이 더 이상 없습니다. dump list를 리뷰하거나 다른 할 일을 찾아보세요!
만약 할 일을 시작하기 어렵다면 아주 작은 단계로 쪼개보시기 바랍니다.
그 다음 눈 딱 감고 10분만 해보기! 그러면 더이상 할 일을 미룬게 아니니까요!
WARNING: 절대 <하고싶은 기분>이나 <할 마음이 생길> 때까지 기다리지 마세요!
아마도 그런 때는 평생 오지 않으니까요...`;
const today: string = dateToString(new Date());

function dateToString(date: Date | undefined): string {
  if (date) {
    return date.toISOString().split(`T`)[0]; // yyyy-MM-dd
  } else return ``;
}

function main(options: {}): void {
  console.log(today);
  const arr: boolean[] = Object.values(options);
  let todayList: Task[] = [];

  if (todoList.length > 0) {
    switch (arr[0]) {
      case true:
        switch (arr[1]) {
          case true:
            todayList = todoList;
            break;
          case false:
            todayList = todoList.filter((task: Task) => {
              return (
                !task.fields.hasOwnProperty(`wait`) ||
                dateToString(task.startDate) === today
              );
            });
            break;
        }
        break;
      case false:
        switch (arr[1]) {
          case true:
            todayList = todoList.filter((task: Task) => {
              return (
                task.fields.hasOwnProperty(`wait`) ||
                dateToString(task.startDate) === today
              );
            });
            break;
          case false:
            todayList = todoList.filter((task: Task) => {
              return dateToString(task.startDate) === today;
            });
            break;
        }
    }
    promptTask(todayList);
  } else console.log(doNotWait);
}

function promptTask(list: Task[]): void {
  if (list.length > 0) {
    list.forEach((task: Task) => {
      console.log(task.index + ` ` + task.body + ` ` + dateToString(task.dueDate));
    });
  } else console.log(doNotWait);
}

export { main, promptTask };
