package api

import (
	"fmt"

	"server-api-go/webapp/service/logic"

	"github.com/gin-gonic/gin"
)

type WordAPI struct {
}

func (self *WordAPI) New(c *gin.Context) {

	//model.InitGormDB()
	var _handler = logic.DictionaryHandler{}

	var body RequestBody
	body.Parse(c.Request)
	fmt.Println(body.Data)
	fmt.Println(body.Data["Sex"])
	fmt.Println(body.Data["isRegel"])

	var response Response

	response.Code = "1"
	response.Desc = "Successful"
	response.Resource = "Postgres"
	response.Result = ResponseResult{}
	response.Result.Rows, _ = _handler.GetList("dfd", 10) // model.InitGormDB() // model.InitGoDB()
	response.Result.Detail = body

	c.JSON(400, response)
}

func (self *WordAPI) List(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "API_ContentDiction_List",
	})
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
