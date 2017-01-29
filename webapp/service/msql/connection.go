package msql

import (
	"fmt"

	"server-api-go/webapp/service/conf"

	"github.com/jinzhu/gorm"
	_"github.com/lib/pq"
	"strings"

)


// var Db gorm.DB []interface{}

func Create(in interface{}) {

	db, err := gorm.Open("postgres", conf.DB_Conn_Postgres)
	defer db.Close()

	if isPass(err) {
		db.Create(in)
		//db.NewRecord(in)
	}
}

func Update(in interface{}, update map[string]interface{}) {

	db, err := gorm.Open("postgres", conf.DB_Conn_Postgres)
	defer db.Close()

	if isPass(err) {
		if update == nil {
			db.Save(in)
		} else {
			db.Model(in).Updates(update)
		}
	}
}

func Delete(model interface{}) {

	db, err := gorm.Open("postgres", conf.DB_Conn_Postgres)
	defer db.Close()

	//var _models = models
	if isPass(err) {
		db.Save(model)
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

// Search - First: one record
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

func Count(model interface{}, filter string) (int, error) {

	db, err := gorm.Open("postgres", conf.DB_Conn_Postgres)
	defer db.Close()

	var count int
	if isPass(err) {
		db.Model(model).Where(filter).Count(&count)
	}
	return count, err
}

func Filter(format string, v interface{}) string {
	var _format string

	switch v.(type) {
	case string:
		_r := strings.NewReplacer("?", "'%s'")
		_format = _r.Replace(format)
	default:
		_format = strings.Replace(format, "?", "%v", -1)
	}

	return fmt.Sprintf(_format, v)
}


// Check Error
func isPass(err error) bool {
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}


