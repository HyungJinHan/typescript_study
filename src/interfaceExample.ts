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

console.log(`
이름 : ${me.name} | 나이 : ${me.age}
지역 : ${me.city} | 친구 : ${me.friends}
팀 이름 : ${myTeam.nickname} | 팀 컬러 : ${myTeam.team} | 팀 인원 : ${myTeam.teamNum}
`);
// 이름: hhj | 나이 : 28
// 지역: Gwangju | 친구 : a, b, c, d
// 팀 이름: 삐딱해골 | 팀 컬러 : red | 팀 인원: 20