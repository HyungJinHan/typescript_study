type PersonName = string
type PersonAge = number
type PersonCity = string
type PersonFriends = Array<string>

type TeamNickname = string
type TeamColor = 'red' | 'blue' | 'yellow'
type TeamNum = 10 | 20 | 30
// 원하는 값만을 타입으로 지정하는 것도 가능

type PersonInfo = {
  name: PersonName,
  age: PersonAge,
  city: PersonCity,
  friends?: PersonFriends
}

interface TeamInfo {
  nickname: TeamNickname,
  team: TeamColor,
  teamNum: TeamNum
}
// 오브젝트의 모양을 특정해주기 위하 interface 사용
// 쉽게 생각하면 class를 다루는 느낌으로 보면 됨

interface UserInfo {
  name: string
}
// 동일하게 작동하는 type 문법
// type UserInfo = {
// name: string
// }

interface UserPlayer extends UserInfo {
}
// 동일하게 작동하는 type 문법
// type UserPlayer = UserInfo & {
// }

const han: UserPlayer = {
  name: '한형진'
}

const me: PersonInfo = {
  name: 'hhj',
  age: 28,
  city: 'Gwangju',
  friends: ['a', 'b', 'c', 'd']
}

const myTeam: TeamInfo = {
  nickname: '삐딱해골',
  team: 'red',
  teamNum: 20
}

han.name = '한형진임';

console.log(`
이름 : ${me.name} | 나이 : ${me.age}
지역 : ${me.city} | 친구 : ${me.friends}
팀 이름 : ${myTeam.nickname} | 팀 컬러 : ${myTeam.team} | 팀 인원 : ${myTeam.teamNum}
interface 예제 : ${han.name}
`);
// 이름: hhj | 나이 : 28
// 지역: Gwangju | 친구 : a, b, c, d
// 팀 이름: 삐딱해골 | 팀 컬러: red | 팀 인원: 20
// interface 예제 : 한형진임

// 결론
// type 키워드는 interface 키워드에 비해 좀 더 활용할 수 있는 범위가 넒다.

// --- interface 여러개 사용 ---
interface Example {
  name: string
}

interface Example {
  age: number
}

interface Example {
  nickname: string
}

interface Example {
  city: string
}

const interfaceExample: Example = {
  name: '한형진',
  age: 28,
  nickname: '삐딱해골',
  city: '광주'
}

console.log(interfaceExample);
// { name: '한형진', age: 28, nickname: '삐딱해골', city: '광주' }
// 같은 이름의 interface는 자동으로 합쳐짐 (type은 불가능) -> interface를 사용하는 결정적인 이유