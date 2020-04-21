// 类是对象具体事物的一个抽象，对象是类的具体表现
class Person {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  say() {
    console.log('Hello')
  }
}

let person: Person = new Person('Horace', 20)
console.log(person)
person.say()