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

// https://www.typescriptlang.org/ko/play?#code/C4TwDgpgBAcghgW2gXigZ2AJwJYDsDmA3AFCiRQCC+KUuArggEYSYlnQAKANnCC1KgDexKKKiYIcACYB7XFxC1EEAFyxlAGhFiA9DqiBfccAMdVEAgE4EqxwDzjgHQ6ogDCHAqBNRAEb2AAGu2i41APxqqEDyg9KC8IX1oGZkwoAB8oOlwpCAAzPAgpYgBfYmJggFoCgGM6YAK8nMK5DCgwHj5MCig1bl5+IUDcZTUAcgALXoArbq0xEOo1ACYADiyc-KKSsoqq4Bq6lgAhJqgW+oEoYVHOpB7etF7u2dz9MuLSgpzkhMLgbDk11swAWTgAaxYABTHVTqJAASm2u34hzEEmAdEwuAOgSOykC2WyxEquGq-QG+1qnx+-0wAL6g26YJIeIAdKF9tMSNcoLdFg8sSsPvViSw0PsgV1QRAIc11tFkAA+KAAwTAzJU5Y41ZnXoEsU8zBoMkqynU8506j7ACsADYmfM8nclhylREmLy1BJpHIFHaogBtAC6+3dAEYNFAJgGAMyekj0e2amlgOjnAH+wMK4JO2TyEC2QAe44AdVfsTjc0oAophMDJMGC5jcFvdyjbqoT6gB5R2SVOu90YHAEAMRqIBxgyGRcSS4b2od3koYB6YBrB0CBhoL6Bu11b1lgADTU7aweHw3ciLD7A6HcBHPtnEADE+GgamC+C6+ZgBdxwDgHYAYmqggBqB8yAA1WoIBemsABrGoEAHCHABxBwAR5qgQBEScAFLHAAtVisWSra0h1WOA1ASJJUlwdJ9iwlI0ikEg0KgRg1HoLguH2SiuHNStLTZGtSMKH0w2ZFi1FPEAvRZKBAAGFwBQ8cAEXGoEAA6H-0AB5HAAHJqBAClRwADmq-cxAA1VkxABBxxDmVZasclIqRMNwX5cBkAB3XAmWwZJpXYGRrKkARkFQboexYSlkVGfT9mDEhPIgVYaAcgBqKBfRIbJgikVwoEAaiHAATxjMAOAwATocASNWoEAHaGA0AEjHAA1OqBH2IKybPACA7KgBynOcjtd3cmFRC85y8UuPyAv2KQaWAGQAFUwEgTAAGE4DQCBwuZKKoEADm64sAF9HEqAqA0synL8sKi0rXZJ5cBeN4kV6CAqJkAEIXqqBsTQQcIBpLgZHwbUDpu3VZmCLadvefbDuOtQADcZGwBy8nEfyESRQAkGqfKBADHRwAUpqSpCdOtV7Xne7AvtoCBvuhQJgF6EtTPR-GixLUlugAD3Jylnv0JHdqgXpUbBCiMf4QG4RBqBQdEwAICcAAGbbEAHNnAFIOlTZLk2GgOZCBSYhQAIMcADzGoEADJnABrOx5nmRpFgAgDABROdAdwIWI3RYE7AmKgFbOs4FHOqg38DqlExGt4IaoIdEoAOkaoHNy2lCQG2oBcg9MAd0ZUX94JXMwd3PegU7w+gSPmeiQHvwK9ErgtKAhqoqAAGVsHwTp4QkPklhp95pCkAEMONzA+wo4PTdENnEWlQI4CgELGG0ctMSr+MAyNKkgA