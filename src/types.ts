type Priority = `(A)` | `(B)` | `(C)` | string;

//TODO 나중에는 config 파일에서 설정을 읽어올 수 있게 하면 좋겠음
type Bullet = `[ ]` | `[>]` | `[X]` | `[O]` | `[<]` | `[-]`; //자기가 스스로 특정 '타입'을 만들 수도 있음

export { Priority, Bullet };
