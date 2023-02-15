abstract class UserClassEx {
  constructor(
    protected firstname: string,
    protected lastname: string
  ) { }

  abstract sayHi(name: string): string
  abstract fullName(): string
}

class PlayerClassEX extends UserClassEx {
  fullName() {
    return `${this.firstname} ${this.lastname}`
  }

  sayHi(name: string) {
    return `Hello ${name}. I'm ${this.fullName()}`
  }
}