package main

import (
	"github.com/gin-gonic/gin"
	"server-api-go/webapp/service/api"
)

func main() {
	// initialize gin
	router := gin.Default()

	api.RegisterRoutes(router)

	router.Run(":8083")
}
