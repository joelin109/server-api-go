package main

import (
	"net/http"
	"server-api-go/src/service/api"

	"github.com/gin-gonic/gin"
)

func main() {
	// initialize gin
	router := gin.Default()
	api.RegisterRoutes(router)

	router.StaticFile("asset/css/styles6.css", "./www/asset/css/styles6.css")
	router.StaticFile("asset/css/styles.css", "./www/asset/css/styles.css")
	router.StaticFile("assets/styles/salesforce-lightning-design-system.min.css", "./assets/styles/salesforce-lightning-design-system.min.css")
	router.StaticFile("app.bundle.js", "./www/app.bundle.js")
	router.StaticFile("app.bundle2.js", "./www/app.bundle2.js")
	router.LoadHTMLFiles("www/index.html")
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	router.Run(":8088")

}
