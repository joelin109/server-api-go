package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"./src/service/api"
)

func main() {
	// initialize gin, register API
	router := gin.Default()
	api.RegisterRoutes(router)

	files := [...]string{"asset/css/style.css", "asset/css/style-index.css", "asset/img/demo-r1.png", "vendor.dll.js", "index.bundle.js"}
	for _, _file := range files {
		_fileAbsolutePath := "./www/" + _file
		router.StaticFile(_file, _fileAbsolutePath)
	}

	router.LoadHTMLFiles("www/index.html")
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	router.Run(":8088")

}
