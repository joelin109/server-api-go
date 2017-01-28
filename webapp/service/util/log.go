package util

import (
	"fmt"
)

func Log(a ...interface{}) (error) {

	fmt.Println(a...)
	return nil
}
