package api

import (
	"fmt"

	"server-api-go/src/service/model"
	"server-api-go/src/service/logic"

	"github.com/gin-gonic/gin"
)

type WordAPI struct {
}

func (self *WordAPI) New(c *gin.Context) {

	_handler := new(logic.DictionaryHandler)
	_body := new(RequestBody).Read(c.Request)
	_word := new(model.ContentWord)
	_body.FillData(_word)

	var response Response
	response.Code = "1"
	response.Desc = "Successful"
	response.Resource = "Postgres"
	response.Result = ResponseResult{}
	response.Result.Rows = _word
	response.Result.Detail, _ = _handler.Post(_word)

	c.JSON(400, response)
}

func (self *WordAPI) List(c *gin.Context) {
	//model.InitGormDB()
	var _handler = &logic.DictionaryHandler{}

	var body RequestBody
	body.Read(c.Request)
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
	_handler := new(logic.DictionaryHandler)
	_body := new(RequestBody).Read(c.Request)
	_word := new(model.ContentWord)
	_body.FillData(_word)

	var response Response
	response.Code = "1"
	response.Desc = "Successful"
	response.Resource = "Postgres"
	response.Result = ResponseResult{}
	response.Result.Rows = _word
	response.Result.Detail, _ = _handler.GetDetail(_word)

	c.JSON(400, response)
}
