function search(age: number): string {
  return '找到了' + age + '岁的小姐姐'
}

var age: number = 28

var result: string = search(age)

// console.log(result)

// 有可选参数的函数
function searchNew(age: number, stature?: string): string {
  let yy: string = ''
  yy = '找到了' + age + '岁'
  if (stature != undefined) {
    yy = yy + stature
  }
  return yy + '的小姐姐'
}

var resultNew: string = searchNew(22, '大长腿')

// console.log(resultNew)

// 有默认参数的函数
function searchDefault(age: number = 18, stature: string = '水蛇腰'): string {
  let yy: string = ''
  yy = '找到了' + age + '岁'
  if (stature != undefined) {
    yy = yy + stature
  }
  return yy + '的小姐姐'
}

var resultDefault: string = searchDefault(22, '大长腿')
// console.log(resultDefault)

// 有剩余参数的函数
function searchLeft(...need: string[]): string {
  let yy: string = '找到了'
  for(let i = 0; i < need.length; i++) {
    yy += need[i]
    if (i < need.length - 1) {
      yy += '、'
    }
  }
  yy += '的小姐姐'
  return yy
}

var resultLeft: string = searchLeft('22岁', '大长腿', '瓜子脸', '水蛇腰')
console.log(resultLeft)
