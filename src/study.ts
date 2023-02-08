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
function addA(a: number, b: number) {
  return (
    a + b
  )
}
// function addA(a: number, b: number): number

const addB = (a: number, b: number) => a + b
// const addB: (a: number, b: number) => number

type Add = (a: number, b: number) => number;

const addC: Add = (a, b) => a + b
// Add = (a: number, b: number) => number