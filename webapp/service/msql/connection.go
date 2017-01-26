package msql

import (
	"fmt"

	"server-api-go/webapp/service/conf"

	"github.com/jinzhu/gorm"
	_"github.com/lib/pq"
)


// var Db gorm.DB []interface{}

func Query(filter string, order_by *string, limit int8, out interface{}) {

	db, err := gorm.Open("postgres", conf.DB_Conn_Postgres)
	defer db.Close()

	//var _models = models
	if err != nil {

		fmt.Println(err)
		fmt.Println(filter)

	} else {
		db.Where(filter).Limit(limit).Find(out)
	}

}

func Execute() {

}


func checkErr(err error) {
	if err != nil {
		fmt.Println(err)
	}
}


