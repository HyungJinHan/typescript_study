type PersonName = string;
type PersonAge = number;
type PersonCity = string;
type PersonFriends = Array<string>

type Person = {
  name: PersonName,
  age: PersonAge,
  city: PersonCity,
  friends?: PersonFriends
}

const me: Person = {
  name: 'hhj',
  age: 28,
  city: 'Gwangju',
  friends: ['a', 'b', 'c', 'd']
}

console.log(`
이름 : ${me.name}, 나이 : ${me.age}
지역 : ${me.city} 친구 : ${me.friends}
`);
// 이름 : hhj, 나이 : 28
// 지역: Gwangju 친구: a, b, c, d