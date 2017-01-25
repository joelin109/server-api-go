package api

import "github.com/gin-gonic/gin"

func API_ContentArticle_List(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Im Joe",
	})
}

func API_ContentArticle_Detail(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Im Joe",
	})
}
