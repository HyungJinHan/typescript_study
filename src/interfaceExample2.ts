// --- class형 ---
abstract class UserClassEx {
  constructor(
    protected firstName: string,
    protected lastName: string
  ) { }

  abstract sayHi(name: string): string
  abstract fullName(): string
}

class PlayerClassEx extends UserClassEx {
  fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  sayHi(name: string) {
    return `Hello ${name}. I'm ${this.fullName()}`
  }
}

// --- interface형 ---
interface UserInterfaceEx {
  firstName: string,
  lastName: string,
  sayHi(name: string): string
  fullName(): string
}

interface HumanInterfaceEx {
  age: number
}

class PlayerInterfaceEx implements UserInterfaceEx, HumanInterfaceEx {
  constructor(
    public firstName: string,
    public lastName: string,
    public age: number
  ) { }

  fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  sayHi(name: string) {
    return `Hello ${name}. I'm ${this.fullName()}`
  }
}

function makeUser(user: UserInterfaceEx): UserInterfaceEx {
  return {
    firstName: 'Hyun Jin',
    lastName: 'Han',
    fullName: () => 'xx',
    sayHi: (name) => 'string'
  }
}

console.log(makeUser())