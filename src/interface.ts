import { Priority } from "./types";

//generic: 'T' is going to be a type declared at run-time instead of compile time. T for type
interface Item {
  isDone: boolean;
  priority?: Priority;
  completionDate?: Date;
  creationDate?: Date;
  body: string;
  project?: string[]; //왜 그냥 string 이 아니라 string[]로 받을까?
  context?: string[];
  dueDate?: Date;
  fields?: Array<[string, string]>;
  rawData: string;
}

export { Item };
