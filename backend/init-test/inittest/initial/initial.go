package initial

import "fmt"

var Value1 int

func init() {
	Value1 = 53
	fmt.Println("initial package init() called, Value1 set to", Value1)
}

