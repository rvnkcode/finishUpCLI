import { Item } from "./interface";
import { Priority, Bullet } from "./types";
import { indexList } from "./inbox";

class Task implements Item {
  get index(): number {
    return this._index;
  }

  set index(value: number) {
    if (this.fields.hasOwnProperty(`id`)) {
      this._index = +this.fields.id;
    } else {
      const maxIndex: number = Math.max(...Array.from(indexList));
      maxIndex < value ? (this._index = value) : (this._index = maxIndex + 1);
      this.fields.id = this._index.toString();
    }
  }
  //Property
  private _index: number;
  mark: Bullet;
  isDone: boolean;
  priority?: Priority;
  completionDate?: Date;
  creationDate?: Date;
  body: string;
  project: string[];
  context: string[];
  /*fields 를 필수로 지정하지 않으면 fields 의 타입이 여기서 지정해 준 타입 혹은 undefined 가 되기 때문에
   해당 타입을 쓰는 프로퍼티는 반드시 필수 프로퍼티로 지정해줘야만 한다.
    object is possibly `undefined` 에러 발생!*/
  //fields?: Array<[string, string]>;
  fields: { [key: string]: string };
  rawData: string;
  dueDate?: Date;
  startDate?: Date;
  urgent?: number;

  constructor(line: string) {
    this._index = 1;
    this.mark = `[ ]`;
    this.isDone = false;
    this.body = ``;
    this.project = [];
    this.context = [];
    this.rawData = line;
    this.fields = {};
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
    this.setDescriptionPart(words);
    for (let key in this.fields) {
      switch (key) {
        case `due`:
          this.setDueDate(this.fields.due);
          break;
        case `start`:
          this.setStartDate(this.fields.start);
          break;
        case `id`:
          this._index = +this.fields.id;
          break;
        default:
          break;
      }
    }
    this.updateRawData();
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
    } else {
      this.creationDate = new Date();
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

  setDescriptionPart(words: string[]): void {
    let project: string[] = [];
    let context: string[] = [];
    let field: { [key: string]: string } = {};
    let indexOfFlag: number[] = [];

    words.forEach((word: string) => {
      switch (word[0]) {
        case `+`:
          project.push(word);
          indexOfFlag.push(words.indexOf(word));
          break;
        case `@`:
          context.push(word);
          indexOfFlag.push(words.indexOf(word));
          break;
        default: {
          let index: number = word.indexOf(`:`);
          if (index > 0 && index < word.length - 1) {
            //field.push([word.slice(0, index), word.slice(index + 1)]);
            let key: string = word.slice(0, index);
            field[key] = word.slice(index + 1);
            indexOfFlag.push(words.indexOf(word));
          }
        }
      }
    });

    //앞에서부터 배열 요소를 지우면 배열이 어그러져 인덱스가 바뀌기 때문에 배열 뒷자리(높은 수의 인덱스)부터 지우도록 처리
    indexOfFlag.reverse();
    // body 에 task 내용만 남기도록 +, @, : 등이 포함된 요소 삭제
    indexOfFlag.forEach((indexNumber: number) => {
      words.splice(indexNumber, 1);
    });

    this.project = project;
    this.context = context;
    this.fields = field;
    this.body = words.join(` `);
  }

  setDueDate(text: string): void {
    //if (`due` in this.fields) { in은 오브젝트의 프로토타입까지 거슬러 올라가기 때문에
    const dueDate: Date | null = this.isDate(text);
    if (dueDate) {
      this.dueDate = dueDate;
    }
  }

  setStartDate(text: string): void {
    const startDate: Date | null = this.isDate(text);
    if (startDate) {
      this.startDate = startDate;
    }
  }

  updateRawData(): void {
    let temp: string[] = [];
    if (this.isDone) {
      temp.push(`x`);
    }
    if (this.priority) {
      temp.push(this.priority);
    }
    if (this.completionDate) {
      temp.push(this.completionDate.toISOString().split(`T`)[0]);
    }
    if (this.creationDate) {
      temp.push(this.creationDate.toISOString().split(`T`)[0]);
    }
    temp.push(this.body);
    if (this.project) {
      this.project.forEach((v: string) => {
        temp.push(v);
      });
    }
    if (this.context) {
      this.context.forEach((v: string) => {
        temp.push(v);
      });
    }
    if (Object.keys(this.fields).length > 0) {
      for (const [key, value] of Object.entries(this.fields)) {
        temp.push(`${key}:${value}`);
      }
    }
    this.rawData = temp.join(` `);
  }
}

export { Task };
