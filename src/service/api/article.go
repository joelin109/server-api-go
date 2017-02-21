package api

import (
	"github.com/gin-gonic/gin"
	"server-api-go/src/service/logic"
	"fmt"
)

type ArticleAPI struct {
}

func API_ContentArticle_New(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Im Joe",
	})
}

func (self *ArticleAPI) List(c *gin.Context) {
	//model.InitGormDB()
	var _handler = logic.DefaultDictionary

	var body RequestBody
	body.Read(c.Request)
	fmt.Println(body.Data)

	/*_test := make(map[string]interface{}, 0)
util.Struct2Map(_test, _body)
fmt.Println(_test)*/

	var response Response

	response.Code = "1"
	response.Desc = "Successful"
	response.Resource = "Postgres"
	response.Result = ResponseResult{}
	response.Result.Rows, _ = _handler.GetList("dfd", 10, 20) // model.InitGormDB() // model.InitGoDB()
	response.Result.Detail = body

	c.JSON(400, response)
}

func (self *ArticleAPI) Detail(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "API_ContentDiction_Post",
	})
}



