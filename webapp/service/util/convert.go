package util

import (
	"fmt"
	"reflect"
	"strings"
	"unicode"
)

func Struct2Map(dest map[string]interface{}, src interface{}) error {
	if dest == nil {
		return fmt.Errorf("Struct2Map(dest is %v)", dest)
	}
	srcType := reflect.TypeOf(src)
	srcValue := reflect.Indirect(reflect.ValueOf(src))
	if srcValue.Kind() != reflect.Struct {
		return fmt.Errorf("Struct2Map(non-struct %s)", srcType)
	}
	srcType = srcValue.Type()
	fieldNum := srcType.NumField()
	for i := 0; i < fieldNum; i++ {
		// struct 字段的反射类型（StructField）
		fieldType := srcType.Field(i)
		// 非导出字段不处理
		if fieldType.PkgPath != "" {
			continue
		}
		tag := fieldType.Tag.Get("json")
		fieldValue := srcValue.Field(i)

		// json 有 key,omitempty 的情况
		tag = strings.Split(tag, ",")[0]

		if tag == "" {
			tag = UnderscoreName(fieldType.Name)
		}
		dest[tag] = fieldValue.Interface()
	}
	return nil
}

// model中类型提取其中的 idField(int 类型) 属性组成 slice 返回
func Models2Intslice(models interface{}, idField string) []int {
	if models == nil {
		return []int{}
	}

	// 类型检查
	modelsValue := reflect.ValueOf(models)
	if modelsValue.Kind() != reflect.Slice {
		return []int{}
	}

	var modelValue reflect.Value

	length := modelsValue.Len()
	ids := make([]int, 0, length)

	for i := 0; i < length; i++ {
		modelValue = reflect.Indirect(modelsValue.Index(i))
		if modelValue.Kind() != reflect.Struct {
			continue
		}

		val := modelValue.FieldByName(idField)
		if val.Kind() != reflect.Int {
			continue
		}

		ids = append(ids, int(val.Int()))
	}

	return ids
}

// 驼峰式写法转为下划线写法
func UnderscoreName(name string) string {
	buffer := NewBuffer()
	for i, r := range name {
		if unicode.IsUpper(r) {
			if i != 0 {
				buffer.Append('_')
			}
			buffer.Append(unicode.ToLower(r))
		} else {
			buffer.Append(r)
		}
	}

	return buffer.String()
}