// --- 기본 타입 지정법 ---
type Name = string;
type Age = number;
type Player = {
  readonly name: Name,
  // 읽기 전용으로 수정 불가
  age?: Age
  // age?: number | undefined
}

// --- 지정된 타입 사용 ---
const playerA: Player = {
  name: 'hhj',
  age: 28
}

const playerB: Player = {
  name: 'hsh'
}

function playerMaker(name: Name): Player {
  return {
    name
  }
}

const hhj = playerMaker('hhj');
hhj.age = 28;

const playerMakers = (name: Name): Player => ({ name });

const hsh = playerMakers('hsh');
hsh.age = 56;

// --- readonly 사용법 ---
const numbers: readonly number[] = [1, 2, 3];
// numbers.push(1, 2);
// readonly로 인한 수정 불가 (Error)

// --- 배열 형식의 타입 지정 ---
const playerO: readonly [string, number, boolean] = ['hhj', 28, true]; // O
// const playerX: [string, number, boolean] = [true, 'hhj', 28]; // X
// 이렇게 사용할 경우 순서도 중요함

// --- undefined, null 타입 ---
let a: undefined = undefined;
let b: null = null;

// --- any 타입 ---
let c = [];
// let c: any[] - 타입을 신경쓰지 않고 사용하기 위함

// --- unknown 타입 사용법 ---
let d: unknown;

if (typeof d === 'number') {
  let d = 3;
  let e = d + 1;
}
// d가 숫자인 경우 실행 시, 오류 X

if (typeof d === 'string') {
  let d = 'hhj'
  let e = d.toUpperCase;
}
// d가 문자열인 경우 실행 시, 오류 X

// --- 함수의 void 형식 ---
function hello() {
  console.log('hello');
}
// function hello(): void - return 값이 없는 경우

// ---void의 예외처리 방식---
function hi(): never {
  throw new Error('xxx')
}
// function hi(): never - return 값을 절대로 출력하지 않는 경우
// ex) 예외 처리

// --- never 타입 ---
function test(name: string | number) {
  if (typeof name === 'string') {
    name // string
  } else if (typeof name === 'number') {
    name // number
  } else {
    name // never - 사용 X
  }
}

// --- Call Signatures ---
// 타입을 만들고 불러오는 작업
function addA(a: number, b: number) {
  return (
    a + b
  )
}
// function addA(a: number, b: number): number

const addB = (a: number, b: number) => a + b
// const addB: (a: number, b: number) => number

type AddA = (a: number, b: number) => number;

const addC: AddA = (a, b) => a + b
// Add = (a: number, b: number) => number

// --- Overloading ---
// 함수가 여러개의 Call Signatures를 가지고 있을 때 발생
type AddB = {
  (a: number, b: number): number;
  (a: number, b: string): number;
}

const addD: AddB = (a, b) => {
  if (typeof b === 'string') {
    return a
  }
  return a + b
}
// Overloading 예제

type Config = {
  path: string,
  state: object
}

type Push = {
  (path: string): void;
  (config: Config): void;
}

const push: Push = (config) => {
  if (typeof config === 'string') {
    console.log(config);
  } else {
    console.log(config.path, config.state);
  }
}
// Overloading 방지 예제

// --- Polymorphism ---
// 종합적으로 다양한 타입을 지정하는 방법
type SuperPrintA = {
  <T, M>(arrA: T[], arrB?: M): T
}

const superPrintA: SuperPrintA = (arr) => arr[0]

const arrA = superPrintA([1, 2, 3, 4], 'x');
// const superPrint: <number, string>(arrA: number[], arrB?: string | undefined) => number
const arrB = superPrintA([true, false, true, false], 1);
// const superPrint: <boolean, number>(arrA: boolean[], arrB?: number | undefined) => boolean
const arrC = superPrintA(['1', '2', '3', '4'], [1, 2]);
// const superPrint: <string, number[]>(arrA: string[], arrB?: number[] | undefined) => string
const arrD = superPrintA([1, '2', 3, true, [1, 2]], false);
// const superPrint: <string | number | boolean | number[], boolean>
// (arrA: (string | number | boolean | number[])[], arrB?: boolean | undefined) => string | number | boolean | number[]

function superPrintB<T>(a: T[]) {
  return a[0]
}

const arrE = superPrintB([1, 2, 3, 4]);

// --- Conclusions ---
type Example1<Extra> = {
  name: string
  extraInfo: Extra
}

type Example2 = {
  favFood: string
}

type Example3 = Example1<Example2>

type arrNumbers = Array<number>
// 타입스크립트에 내장된 interface 사용을 통한 배열 타입 지정

const eampleA: Example3 = {
  name: 'hhj',
  extraInfo: {
    favFood: 'pizza'
  }
}

const eampleB: Example1<null> = {
  name: 'hsh',
  extraInfo: null
}

const eampleC: arrNumbers = [1, 2, 3, 4, 2.2]

// --- TypeScript의 객체 지향 프로그래밍 ---
abstract class ExampleUser {
  constructor(
    private privateFirstName: string,
    private privateLastName: string,
    private privateNickname: string,
    protected firstName: string,
    protected lastName: string,
    protected nickname: string
  ) { }

  abstract getNickname(): void

  getFullName() {
    return `${this.firstName} ${this.lastName}`
  }
}
// ↓ 자동으로 JS 버전으로 만들어줌 ↓
// class User {
//   constructor(privateFirstName, privateLastName, privateNickname, firstName, lastName, nickname) {
//     this.privateFirstName = privateFirstName;
//     this.privateLastName = privateLastName;
//     this.privateNickname = privateNickname;
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.nickname = nickname;
//   }
//   getFullName() {
//     return `${this.firstName} ${this.lastName}`;
//   }
// }

class ExamplePlayer extends ExampleUser {
  getNickname() {
    console.log(this.nickname);
    // private - 상속받은 자식에서 접근 불가능
    // protected - 상속받은 자식에서 접근 가능
  }
}

const hhjClass = new ExamplePlayer('HyungJin', 'Han', '삐딱해골', 'HyungJin', 'Han', '삐딱해골');

hhjClass.getNickname();

hhjClass.getFullName();

// new ExampleUser('HyungJin', 'Han', '삐딱해골', 'HyungJin', 'Han', '삐딱해골');
// 추상 클래스의 인스턴스를 만들 수 없습니다. (Error)

type Words = {
  [key: string | number]: string;
}

class Dict {
  private words: Words;
  constructor() {
    this.words = {}
  }
  add(word: Word) {
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.def;
    }
  }
  def(term: string) {
    return this.words[term]
  }
  static hello() {
    return 'hello';
  }
}

class Word {
  constructor(
    public readonly term: string,
    public def: string
  ) { }
}

const kimchi = new Word('kimchi', '한국의 음식');

const dict = new Dict();

dict.add(kimchi);
dict.def('kimchi');

// kimchi.term = 'xxx';
// 읽기 전용 속성이므로 'term'에 할당할 수 없습니다.

console.log(kimchi);

console.log(Dict.hello());
// "hello"

// https://www.typescriptlang.org/ko/play?ts=4.9.5#code/IYIwzgLgTsDGEAJYBthjAgqmAplBA3gFAKlID2AdpFAK7zn4AUJZbbADlAJYBuwEHAi58BOAGLcokAHLAAtjgBcCGt0oBzADSt27Ef0HCehnABk0EOYpVrNOvXoNjjowTO6wA1pQXLV0Orauo6kXOSC8DgAJggAZlKyfraB9iGh4ZGCsahJNgE8aaGcUBE4UbGUnj7JBUHpZACUhAC+RCGgNHCIGjhW1b6KTI0qvOTc0e1svRDitMjI1jjDhA2kUH20UJQIAAYAJAQQABbcYAB0CdJWfi0Ihydn57k3ii27IW1tRChoGAAKqAAnngEDgAB6CSjRDDYUHEaZ9DzeQbLZoIxywKhgcjIHDPcgaJiPC5VFF+RoAbjWCAA9LTXKYEABaBCAQYHALGDgGwewAC4whAAnjgF2hwALo4AcQYQgEQJwA-tQhABG9gAAawClTTT6cYyhUWezuXyhWLJTKlZ8iN8sdREMdjgArBAAXgQlBwAHcEIDgCCoEwAOQACSBtE0ACl1J6tAgfcBKCGw4AEgcAjK2AF1XABc1UZ9fsDwdD4cjmbjSc9VPaqtNkAQFutdodzrhHtT-o0QezYe9EZTueTBdVgBTZtkIQAuC4AM9sAJUOAFKaEIATpsAHp0IQDPNXrOQguYARccAGEOAGc6EIAI8dHA8HhYZZcuiVeOGpqucgkALuOABjqEIAZVsAHN3ChCADzHAAG9esANQOASrG5fK96WrWeSwllPBlzxwa870fF933Fb9f3aA8ZmRGohgLIgkL6OYFiWYZKSAA