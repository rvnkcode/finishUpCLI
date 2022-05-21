import { Priority } from "./types";

// generic: 'T' is going to be a type declared at run-time instead of compile time. T for type
interface Item {
  isDone: boolean;
  priority?: Priority;
  completionDate?: Date;
  creationDate?: Date;
  body: string;
  project?: string[];
  context?: string[];
  dueDate?: Date;
  //fields?: Array<[string, string]>;
  fields?: { [key: string]: string };
  rawData: string;
}

export { Item };
