package util

import (
	"fmt"
	"reflect"
	"strings"
	"unicode"
	"errors"
)

func Struct2Map(src interface{}, dest map[string]interface{}) error {
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

func Map2Struct(src map[string]interface{}, out interface{}) error {

	for k, v := range src {
		err := setField(out, k, v)
		if err != nil {
			fmt.Println("match failed field:", k, v)
		}
	}

	return nil
}

func setField(out interface{}, mapName string, mapValue interface{}) error {
	structObject := reflect.ValueOf(out).Elem()
	structFieldName := matchFieldName(out, mapName)
	structFieldValue := structObject.FieldByName(structFieldName)

	var mapFieldValue reflect.Value
	switch mapValue.(type) {
	case float64:
		_v_flt, _ := mapValue.(float64)
		_typeString := fmt.Sprintf("%s", structFieldValue.Type())

		switch _typeString {
		case "int8":
			mapFieldValue = reflect.ValueOf(int8(_v_flt))
		case "int16":
			mapFieldValue = reflect.ValueOf(int16(_v_flt))
		default:
			mapFieldValue = reflect.ValueOf(int(_v_flt))
		}

	default:
		mapFieldValue = reflect.ValueOf(mapValue)
	}

	if !structFieldValue.IsValid() {
		return fmt.Errorf("No such field: %s in obj", mapName)
	}
	if !structFieldValue.CanSet() {
		return fmt.Errorf("Cannot set %s field value", mapName)
	}

	if structFieldValue.Type() != mapFieldValue.Type() {
		return errors.New("Provided value type didn't match obj field type")
	}

	structFieldValue.Set(mapFieldValue)
	return nil
}

func matchFieldName(obj interface{}, name string) string {
	structObject := reflect.ValueOf(obj).Elem()
	_fieldName := name
	_fieldValue := structObject.FieldByName(_fieldName)

	if !_fieldValue.IsValid() {

		_r := strings.NewReplacer("_", "")
		_fieldCount := structObject.NumField()
		for i := 0; i < _fieldCount; i++ {
			_tempName := structObject.Type().Field(i).Name
			if _r.Replace(strings.ToLower(_tempName)) == _r.Replace(strings.ToLower(name)) {
				//structFieldName = tempFieldName
				//structFieldValue = structObject.FieldByName(structFieldName)
				return _tempName
				//break
			}
		}

	}

	return name
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