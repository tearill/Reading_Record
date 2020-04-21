// !类的修饰符
// public protected private
class Person1 {
  public sex: string
  protected name: string
  private age: number
  public constructor(sex: string, name: string, age: number) {
    this.sex = sex
    this.name = name
    this.age = age
  }
  public sayHello() {
    console.log('Hello')
  }
  protected sayLove() {
    console.log('I love you')
  }
}

var person1: Person1 = new Person1('male', 'Horace', 20)
// console.log(person1.sex)
// console.log(person1.name)
// console.log(person1.age)
// person1.sayHello()
// person1.sayLove()

//! readonly
class Man {
  public readonly sex: string = 'male'
}

var man: Man = new Man()
// man.sex = 'female' // 只读