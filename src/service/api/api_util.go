package api

import (
	"net/http"
	"io/ioutil"
	"encoding/json"

	"server-api-go/src/service/util"
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

func (self *RequestBody) Read(request *http.Request) *RequestBody {
	x, _ := ioutil.ReadAll(request.Body)
	json.Unmarshal(x, &self)

	return self
}

func (self *RequestBody) FillData(out interface{}) {

	util.Map2Struct(self.Data, out)
	/*for k, v := range self.Data {
		err := setField(out, k, v)
		if err != nil {
			fmt.Println("match failed field:", k, v)
		}
	}*/
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