//! 类的继承和重写 TypeScript 不支持多重继承
class HoraceClass {
  public name: string
  public age: number
  public skill: string
  public constructor(name: string, age: number, skill: string) {
    this.name = name
    this.age = age
    this.skill = skill
  }

  public interest() {
    console.log('Find Someone')
  }
}

let HoraceObj: HoraceClass = new HoraceClass('Horace', 20, 'coding')
HoraceObj.interest()

class Child extends HoraceClass {
  public shape: string = 'handsome'

  public interest() { // 重写父类方法
    super.interest()
    console.log('Build bussiness')
  }

  public makeMoney() {
    console.log('One billion per day')
  }
}

let child = new Child('Horace_child', 18, 'speech')
// console.log(child)
child.interest()
child.makeMoney()