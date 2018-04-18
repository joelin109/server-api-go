package api

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"../_conf"
)

func RegisterRoutes(router *gin.Engine) {
	new(WordHandler).registerRoute(router)
	new(ArticleAPI).registerRoute(router)

	router.GET("/user/:name", func(c *gin.Context) {
		name := c.Param("name")
		c.String(http.StatusOK, "Hello %s", name)
	})
}

func (self *WordHandler)registerRoute(router *gin.Engine) {

	router.POST(conf.APIURL_Content_Dictionary_Post, self.New)
	router.POST(conf.APIURL_Content_Dictionary_Detail, self.Detail)
	router.POST(conf.APIURL_Content_Dictionary_List, self.List)

}

func (self *ArticleAPI)registerRoute(router *gin.Engine) {

	router.POST(conf.APIURL_Content_Article_Post, API_ContentArticle_New)
	router.POST(conf.APIURL_Content_Article_List, self.Detail)
	router.POST(conf.APIURL_Content_Article_Detail, self.List)

}



