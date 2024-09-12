package main

import (
	"fmt"
	"sandbox/cmd/inittest/testA"
)

func main() {
	value1 := testA.Test1()
	fmt.Println(value1)
}

// 結果
// /cmd/myapp$ go run .
// 53
// /cmd/myapp$

// testの結果と一致していることから、testでも別packageのinit関数が動いていることが実証できた。
