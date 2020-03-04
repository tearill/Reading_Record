# Go 语言 Map (集合)  

- 语法  
  map[key]value --- map 表示集合，后面指定 key 和 value 的数据类型  
  示例：  
  ```go
  var countryCapitalMap map[string]string // 变量声明 并没有分配空间
	countryCapitalMap = make(map[string]string) // make 分配空间
  ```

- 增  
  MapName[key] = value  

- 删  
  delete(MapName, key)  

- 改  
  MapName[key] = ModifiedValue  

- 查  
  value, ok := MapName[key]  
  如果存在 ok -> true  
  不存在 ok -> false  

- 遍历  
  for key := range MapName {
    // 拿到 key
    // 通过 key 遍历 Map
    fmt.Println(Mapname[key])
  }