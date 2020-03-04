package main

import (
	"log"
	"fmt"
)

type User struct { // struct 关键字 声明结构体
	Name string
	Age int
}

type Person struct {
	Name string
	Age int
}

func main() {
	u := User { // 声明变量并赋值
		Name: "Horace",
		Age: 20,
	} 
	log.Printf("hello struct %s, age is %d", u.Name, u.Age)
	log.Println()

	var p1 Person// var 声明变量
	p1.Name = "Tom"
	p1.Age = 30

	p2 := Person {
		Name: "Lemon",
		Age: 18,
	}

	// p3 := Person {
	// 	Name: "Mike",
	// 	Age: 25,
	// }
	// Println 末尾加换行
	fmt.Println("p2=", p2)


	// Ldate         = 1 << iota     //日期示例： 2009/01/23
    // Ltime                         //时间示例: 01:23:23
    // Lmicroseconds                 //毫秒示例: 01:23:23.123123.
    // Llongfile                     //绝对路径和行号: /a/b/c/d.go:23
    // Lshortfile                    //文件和行号: d.go:23.
    // LUTC                          //日期时间转为0时区的
    // LstdFlags     = Ldate | Ltime //Go提供的标准抬头信息
	log.SetFlags(log.Lshortfile | log.Ldate | log.Lmicroseconds)
	log.Printf("%s login, age: %d", u.Name, u.Age)
}