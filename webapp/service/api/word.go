package api

import (
	"fmt"

	"server-api-go/webapp/service/logic"

	"github.com/gin-gonic/gin"
	//"server-api-go/webapp/service/util"
	"server-api-go/webapp/service/model"
)

type WordAPI struct {
}

func (self *WordAPI) New(c *gin.Context) {

	//model.InitGormDB()
	//_handler := new(logic.DictionaryHandler)
	_body := new(RequestBody).Parse(c.Request)
	//_word := &model.ContentWord{}
	_word := new(model.ContentWord)
	fmt.Println(_word)
	fmt.Println(&_word)
	_body.ReadData(_word)

	fmt.Println(_body)
	fmt.Println(_word)

	var response Response
	response.Code = "1"
	response.Desc = "Successful"
	response.Resource = "Postgres"
	response.Result = ResponseResult{}
	response.Result.Rows = _word
	//response.Result.Rows, _ = _handler.GetDetail(_body.Data) // model.InitGormDB()
	response.Result.Detail = _body

	c.JSON(400, response)
}

func (self *WordAPI) List(c *gin.Context) {
	//model.InitGormDB()
	var _handler = &logic.DictionaryHandler{}

	var body RequestBody
	body.Parse(c.Request)
	fmt.Println(body.Data)

	var response Response

	response.Code = "1"
	response.Desc = "Successful"
	response.Resource = "Postgres"
	response.Result = ResponseResult{}
	response.Result.Rows, _ = _handler.GetList("dfd", 10) // model.InitGormDB() // model.InitGoDB()
	response.Result.Detail = body

	c.JSON(400, response)
}


func (self *WordAPI) Detail(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "API_ContentDiction_Post",
	})
}


// For Request
type BodyData struct {
	Word string `json:"Word"`
	Sex  string `json:"Sex"`
}
