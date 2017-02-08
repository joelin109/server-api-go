package util

import (
	"fmt"
)

func Log(a ...interface{}) (error) {

	fmt.Println(a...)
	return nil
}

func Write(a ...interface{}) (error) {

	fmt.Println(a...)
	return nil
}
