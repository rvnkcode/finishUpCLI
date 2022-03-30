import { promptTask, setUpInbox } from "./inbox";

function getToday(): string {
  const date: Date = new Date();
  return date.toLocaleDateString("ko-KR");
}

function main(): void {
  console.log(getToday());
  try {
   setUpInbox();
  } catch (error) {
   console.error(`Failed to get the list.`)
  }
  promptTask();
}

export { getToday, main };
