import { Item } from "./interface";
import { Priority, Bullet } from "./types";
import { indexList } from "./parser";

class Task implements Item {
  get index(): number {
    return this._index;
  }

  set index(value: number) {
    const maxIndex: number = Math.max(...Array.from(indexList));
    maxIndex < value ? (this._index = value) : (this._index = maxIndex + 1);
  }
  //Property
  private _index: number;
  mark: Bullet;
  isDone: boolean;
  priority?: Priority;
  completionDate?: Date;
  creationDate?: Date;
  body: string;
  project?: string[];
  context?: string[];
  dueDate?: Date;
  /*fields 를 필수로 지정하지 않으면 fields 의 타입이 Array<string> 혹은 undefined 가 되기 때문에
   해당 타입을 쓰는 프로퍼티는 반드시 필수 프로퍼티로 지정해줘야만 한다. */
  fields?: Array<[string, string]>;
  rawData: string;

  constructor(line: string) {
    this._index = 1;
    this.mark = `[ ]`;
    this.isDone = false;
    this.body = ``;
    this.rawData = line;
    this.allocateProperties(line);
  }

  //Method
  allocateProperties(line: string): void {
    const words: string[] = line
      .split(/\s+/) //정규식 표현: // 사이에 정규식 키워드가 들어감. reg exp \s 는 스페이스마다 분리한다는 의미
      .map((symbol: string) => symbol.trim()); //map 은 각 배열의 요소를 순회하여 새로운 배열을 반환

    this.setMarkAndDone(words);
    this.setPriority(words);
    this.setCompletionDate(words);
    this.setCreationDate(words);

    let project: string[] = [];
    let context: string[] = [];
    let field: Array<[string, string]> = [];

    for (const word of words.filter((item: string) => item.length > 1)) {
      switch (word[0]) {
        case `+`:
          project.push(word);
          words.splice(words.indexOf(word), 1);
          break;
        case `@`:
          context.push(word);
          words.splice(words.indexOf(word), 1);
          break;
        default: {
          let index: number = word.indexOf(`:`);
          if (index > 0 && index < word.length - 1) {
            field.push([word.slice(0, index), word.slice(index + 1)]);
          }
          words.splice(words.indexOf(word), 1);
        }
      }
    }

    this.project = project;
    this.context = context;
    this.fields = field;
    this.body = words.join(` `);
  }

  setMarkAndDone(words: string[]): void {
    if (words[0] === `x`) {
      this.mark = `[X]`;
      this.isDone = true;
      words.shift(); //배열의 첫번째 아이템을 제거. 첫번째 아이템을 반환하기도 한다.
    }
  }

  setPriority(words: string[]): void {
    //문장의 ^ 처음부터 \이스케이프문자로쓰임 $ 끝까지
    const priority: string[] | null = words[0].match(/\([A-Za-z]\)/);
    if (priority) {
      this.priority = priority[0];
      words.shift();
    }
  }

  setCompletionDate(words: string[]): void {
    const completionDate: Date | null = this.isDate(words[0]);
    if (this.isDone && completionDate) {
      this.completionDate = completionDate;
      words.shift();
    }
  }

  setCreationDate(words: string[]): void {
    const creationDate: Date | null = this.isDate(words[0]);
    if (creationDate) {
      this.creationDate = creationDate;
      words.shift();
    }
  }

  isDate(text: string): Date | null {
    /* \d: 숫자 {n} n개 있는
    정규표현식 오브젝트에 test()라는 메소드가 있나봄; 처음앎*/
    if (/\d{4}-\d{2}-\d{2}/.test(text)) {
      return new Date(text);
    }
    return null;
  }
}

export { Task };
