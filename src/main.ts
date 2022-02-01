import { promptTask } from "./task";

function getToday(): string {
  const date: Date = new Date();
  return date.toLocaleDateString("ko-KR");
}

function main(): void {
  console.log(getToday());
  promptTask();
}

export { getToday, main };
