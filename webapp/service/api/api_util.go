package api

import (
	"net/http"
	"io/ioutil"
	"encoding/json"
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

func (self *RequestBody) Parse(request *http.Request) {
	x, _ := ioutil.ReadAll(request.Body)
	// fmt.Printf("%s", string(x))
	json.Unmarshal(x, &self)
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