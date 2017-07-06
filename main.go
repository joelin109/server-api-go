package main

import (
	"net/http"
	"server-api-go/src/service/api"

	"github.com/gin-gonic/gin"
)

func main() {
	// initialize gin, register API
	router := gin.Default()
	api.RegisterRoutes(router)

	router.StaticFile("asset/css/style.css", "./www/asset/css/style.css")
	router.StaticFile("asset/css/style-index.css", "./www/asset/css/style-index.css")
	router.StaticFile("asset/img/demo-r1.png", "./www/asset/img/demo-r1.png")
	router.StaticFile("vendor.dll.js", "./www/vendor.dll.js")
	router.StaticFile("index.bundle.js", "./www/index.bundle.js")
	router.LoadHTMLFiles("www/index.html")
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	router.Run(":8088")

}
