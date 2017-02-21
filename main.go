package main

import (
	"github.com/gin-gonic/gin"
	"server-api-go/src/service/api"
	"net/http"
)

func main() {
	// initialize gin
	router := gin.Default()
	api.RegisterRoutes(router)

	router.StaticFile("asset/css/styles6.css", "./www/asset/css/styles6.css")
	router.StaticFile("app.bundle.js", "./www/app.bundle.js")
	router.LoadHTMLFiles("www/index.html")
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	router.Run(":8088")

}
