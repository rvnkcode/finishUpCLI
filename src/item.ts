import { getToday } from "./main";
import { inbox } from "./inbox";

//TODO: 나중에는 config 파일에서 설정을 읽어올 수 있게 하면 좋겠음
type Mark = `[ ]` | `[>]` | `[X]` | `[O]` | `[<]` | `[-]`; //자기가 스스로 특정 '타입'을 만들 수도 있음

/*Interfaces define "public contracts",
it describes the public side of the class and as such it doesn't make sense to have private access modifier.*/
interface Item {
  //bullet: Mark;
  text: string;
  creationDate?: string;
}

class Note implements Item {
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    let idArr: number[] = [];
    for (let i of inbox) {
      idArr.push(i._id);
    }
    let max = Math.max(...idArr); //TODO: 왜 ...이 들어가지?
    if (max < value) {
      this._id = value;
    } else {
      this._id = max + 1;
    }
  }

  protected _id: number;
  bullet: Mark;
  text: string;
  readonly creationDate: string;

  constructor(userInput: string) {
    this._id = 1;
    this.bullet = `[-]`;
    this.text = userInput;
    this.creationDate = getToday();
  }
}

class Task extends Note {
  
  isDoing: boolean;
  isDone: boolean;
  project: string;
  dueDate: string;

  constructor(userInput: string) {
    super(userInput); // super()로 상위 컨스트럭터를 호출해야만 오버라이딩 할 수 있음
    
    this.bullet = `[ ]`;
    this.isDoing = false;
    this.isDone = false;
    this.project = ``;
    this.dueDate = ``;
  }
}

export { Task, Note };
