package main

import (
	"fmt"

	"github.com/google/go-cmp/cmp"
)

type Activity struct {
	Mes  string
	Icon string
}

func main() {
	activityA := &Activity{Mes: "食事", Icon: "🍚"}
	activityB := &Activity{Mes: "ご飯", Icon: "🍚"}

	fmt.Println("差分無し\n", cmp.Diff(activityA, activityA))
	fmt.Println("差分無しの出力文字数:", len(cmp.Diff(activityA, activityA)))
	fmt.Println("差分Mes\n", cmp.Diff(activityA, activityB))
}
