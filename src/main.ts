import { promptItem } from "./inbox";

function getToday(): string {
  const date: Date = new Date();
  return date.toLocaleDateString("ko-KR");
}

function main(): void {
  console.log(getToday());
  promptItem();
}

export { getToday, main };
