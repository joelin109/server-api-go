package api

import (
	"net/http"
	"io/ioutil"
	"encoding/json"
	"reflect"
	"fmt"
	//"errors"
	//"server-api-go/webapp/service/model"
	//"github.com/golang/protobuf/ptypes/struct"
	"strings"
	"errors"
)


// For Request
type RequestBody struct {
	Token      string       `json:"token"`
	SiteCode   string       `json:"sitecode"`
	Channel    string       `json:"channel"`
	Locale     string       `json:"locale"`
	AppVersion int          `json:"appver"`
	Data       map[string]interface{}  `json:"data"`
}

func (self *RequestBody) Parse(request *http.Request) *RequestBody {
	x, _ := ioutil.ReadAll(request.Body)
	// fmt.Printf("%s", string(x))
	json.Unmarshal(x, &self)

	return self
}

func (self *RequestBody) ReadData(out interface{}) {

	for k, v := range self.Data {
		err := setField(out, k, v)
		if err != nil {
			fmt.Println("match failed field:", k, v)
		}
	}
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


// For Response
type Response struct {
	Code     string `json:"code"`
	Desc     string `json:"desc"`
	Resource string `json:"resource"`
	Result   ResponseResult `json:"result"`
}
type ResponseResult struct {
	Page   ResponseResultPage `json:"page"`
	Rows   interface{}        `json:"rows"`
	Detail interface{}        `json:"detail"`
}
type ResponseResultPage struct {
	PageSize  int8 `json:"pageSize"`
	CurPage   int8 `json:"cur_page"`
	MaxPage   int8 `json:"max_page"`
	TotalRows int8 `json:"total_rows"`
}