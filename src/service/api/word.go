package api

import (
	"fmt"

	"../model"
	"../logic"

	"github.com/gin-gonic/gin"
)

type WordHandler struct {
}

func (self *WordHandler) New(c *gin.Context) {

	_logic := new(logic.DictionaryLogic)
	_body := new(RequestBody).Read(c.Request)
	_word := new(model.ContentWord)
	_body.FillData(_word)

	var response Response
	response.Code = "1"
	response.Desc = "Successful"
	response.Resource = "Postgres"
	response.Result = ResponseResult{}
	response.Result.Rows = _word
	response.Result.Detail, _ = _logic.Post(_word)

	c.JSON(400, response)
}

func (self *WordHandler) List(c *gin.Context) {
	//model.InitGormDB()
	//var _logic = &logic.DefaultDictionary

	var _body RequestBody
	_body.Read(c.Request)
	fmt.Println(_body.Data)

	var _response Response

	_response.Code = "1"
	_response.Desc = "Successful"
	_response.Resource = "Postgres"
	_response.Result = ResponseResult{}
	_response.Result.Rows, _ = logic.DefaultDictionary.GetList("dfd", 1, 20) // model.InitGormDB() // model.InitGoDB()
	_response.Result.Detail = _body

	c.JSON(400, _response)
}

func (self *WordHandler) Detail(c *gin.Context) {
	_logic := new(logic.DictionaryLogic)
	_body := new(RequestBody).Read(c.Request)
	_word := new(model.ContentWord)
	_body.FillData(_word)

	var response Response
	response.Code = "1"
	response.Desc = "Successful"
	response.Resource = "Postgres"
	response.Result = ResponseResult{}
	response.Result.Rows = _word
	response.Result.Detail, _ = _logic.GetDetail(_word)

	c.JSON(400, response)
}
