package api

import (
	"net/http"

	"server-api-go/webapp/service/conf"
	"github.com/gin-gonic/gin"
)

func APIRegisterRoute(router *gin.Engine) {
	word := WordAPI{}
	word.registerRoute(router)

	//routing.Handlers(router)
	router.POST(conf.APIURL_Content_Article_List, API_ContentArticle_List)
	router.POST(conf.APIURL_Content_Article_Detail, API_ContentArticle_Detail)

	router.GET("/user/:name", func(c *gin.Context) {
		name := c.Param("name")
		c.String(http.StatusOK, "Hello %s", name)
	})
}

func (self *WordAPI)registerRoute(router *gin.Engine) {

	//routing.Handlers(router)
	router.POST(conf.APIURL_Content_Dictionary_Post, self.New)
	router.POST(conf.APIURL_Content_Dictionary_Detail, self.Detail)
	router.POST(conf.APIURL_Content_Dictionary_List, self.List)

}




