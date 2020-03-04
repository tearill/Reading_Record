package main  // module

import "fmt"

func main() { // 入口
	// hashmap 数据结构 ES6
	// 语法: map[key]value
	var countryCapitalMap map[string]string // 变量声明 并没有分配空间
	countryCapitalMap = make(map[string]string) // make 分配空间

	// 增
	countryCapitalMap["France"] = "巴黎"
	countryCapitalMap["Italy"] = "罗马"
	countryCapitalMap["Japan"] = "东京"
	countryCapitalMap["India"] = "新德里"

	// 删  
	delete(countryCapitalMap, "France")
	fmt.Println("delete France")

	// 改
	countryCapitalMap["Italy"] = "Modify Name"

	// 查 判断元素是否存在  
	capital, ok := countryCapitalMap["France"]
	fmt.Println(ok, "+++++")
	if (ok) {
		fmt.Println("France 的首都是:", capital)
	} else {
		fmt.Println("France 不存在")
	}

	// 遍历
	for country := range countryCapitalMap { // 数组
		fmt.Println(country, "首都是", countryCapitalMap[country])
		// fmt.Println(key, "首都是", value)
	}
}