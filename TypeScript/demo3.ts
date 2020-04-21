var age: number = NaN
var stature: number = 178.5

console.log(age)
console.log(stature)
console.log('----------------------')

var Horace: string = 'Horace ihorace.cn'
console.log(Horace)

// boolean true false
var b: boolean = true
var c: boolean = false
console.log(b, c)
console.log('----------------------')

// enum 类型 枚举，固定种类的
enum HUMAN { male = '男', female = '女', intersex = '中性' }
console.log(HUMAN.male) // 不赋值就是下标
console.log('----------------------')

// any 类型 经常切换类型
var t: any = 10
t = "Horace"
t = true
console.log(t)
console.log('----------------------')

// null 空白