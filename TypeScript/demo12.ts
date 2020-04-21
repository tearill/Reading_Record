//! 接口 interface
interface Husband {
  sex: string,
  interest: string,
  buy?: Boolean
}

let myHusband: Husband = { sex: 'male', interest: 'reading', buy: true }

console.log(myHusband)

interface SearchMan {
  (source: string, subString: string): boolean
}

let mySearch: SearchMan
mySearch = function(source: string, subString: string): boolean {
  let flag = source.search(subString)
  return (flag != -1)
}

console.log(mySearch('高、富、帅、德', '胖'))

