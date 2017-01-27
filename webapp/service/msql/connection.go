package msql

import (
	"fmt"

	"server-api-go/webapp/service/conf"

	"github.com/jinzhu/gorm"
	_"github.com/lib/pq"
)


// var Db gorm.DB []interface{}

func Create(model interface{}) {

	db, err := gorm.Open("postgres", conf.DB_Conn_Postgres)
	defer db.Close()

	if isPass(err) {
		db.Create(model)
	}
}

func Update(model interface{}) {

	db, err := gorm.Open("postgres", conf.DB_Conn_Postgres)
	defer db.Close()

	if isPass(err) {
		db.Save(&model)
	}
}

func Delete(model interface{}) {

	db, err := gorm.Open("postgres", conf.DB_Conn_Postgres)
	defer db.Close()

	//var _models = models
	if isPass(err) {
		db.Save(&model)
	}

}

// Update & Delete
func execute(model interface{}) {

	db, err := gorm.Open("postgres", conf.DB_Conn_Postgres)
	defer db.Close()

	if isPass(err) {
		db.Save(&model)
	}
}

func First(out interface{}, where ...interface{}) {

	db, err := gorm.Open("postgres", conf.DB_Conn_Postgres)
	defer db.Close()

	if isPass(err) {
		db.First(out, where...)
	}
}

func QueryFirst(out interface{}, filter string) {

	db, err := gorm.Open("postgres", conf.DB_Conn_Postgres)
	defer db.Close()

	//var _models = models
	fmt.Println(filter)
	if isPass(err) {
		db.Where(filter).First(out)
	}
}

func Query(out interface{}, filter string, orderBy *string) {

	QueryPaginate(out, filter, orderBy, 1, -1)

}

func QueryPaginate(out interface{}, filter string, orderBy *string, curPage, limit int8) {

	db, err := gorm.Open("postgres", conf.DB_Conn_Postgres)
	defer db.Close()

	//var _models = models
	if isPass(err) {
		//_offset := (curPage - 1) * limit
		//db.Where(filter).Limit(limit, _offset).Find(out)
		db.Where(filter).Limit(10).Find(out)
	}
}

func isPass(err error) bool {
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}


