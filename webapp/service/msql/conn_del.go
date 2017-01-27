package msql

import (
	"server-api-go/webapp/service/model"
	"github.com/jinzhu/gorm"
	"server-api-go/webapp/service/conf"
	"fmt"
	"database/sql"
	"time"
)

/*func bar(baz interface{}) {
f, ok := baz.(*foo)
if !ok {
// baz was not of type *foo. The assertion failed
}

func bar(baz interface{}) {
switch f := baz.(type) {
case *foo: // f is of type *foo
default: // f is some other type
}
}*/


func InitGormDB2() {

	/*
	var err error
	Db, err = gorm.Open("postgres", "user=puis sslmode=disable")
	if err != nil {
		revel.ERROR.Println("FATAL", err)
		panic(err)
	}
	tab := &models.User{}
	Db.AutoMigrate(tab)
	Db.Model(tab).AddUniqueIndex("idx_user__gmail", "gmail")
	Db.Model(tab).AddUniqueIndex("idx_user__pu_mail", "pu_mail")*/

	// db, err := gorm.Open("postgres", DB_Connection)
	// defer db.Close()

	// checkErr(err)
}

func InitGormDB() []model.ContentWord {

	var words = []model.ContentWord{}
	db, err := gorm.Open("postgres", conf.DB_Conn_Postgres)
	defer db.Close()

	if err != nil {

		fmt.Println(err)

	} else {
		db.Where("\"IsRecommend\" = ?", 1).Limit(10).Find(&words)
	}

	fmt.Println("InitGormDB")
	var _new_words = []model.ContentWord{}
	for _, word := range words {
		word.UpdateDate = word.CreateDate.Format("2006-01-02 15:04:05")
		_new_words = append(_new_words, word)
	}
	return _new_words
	//fmt.Println(word.Id, word.Wort, word.En, word.IsRecommend)

}



func InitGoDB() []model.ContentWord {

	fmt.Println("InitGoDB")
	fmt.Println(conf.DB_Conn_Postgres)
	db, err := sql.Open("postgres", conf.DB_Conn_Postgres)


	var usersArray = []model.ContentWord{}

	if err != nil {

		fmt.Println(err)
		return usersArray;
	} else {


		var sqlStr = "SELECT id, \"Wort\", \"WortSex\", \"En\", \"IsRegel\", \"UpdateDate\" " +
			"FROM content_dictionary_de WHERE \"IsRecommend\" = 0"

		fmt.Println(sqlStr)
		rows, err := db.Query(sqlStr)
		if err != nil {

			fmt.Println(err)
		} else {

			fmt.Println("rows.Next")
			/* for _, row := range &rows {
				fmt.Println(row)
			} */

			word := model.ContentWord{}
			var updatedate time.Time
			var s sql.NullString

			defer rows.Close()
			for rows.Next() {

				err := rows.Scan(&word.ID, &word.Wort, &word.WortSex, &s, &word.IsRegel, &updatedate)

				word.UpdateDate = updatedate.Format("2006-01-02 15:04:05")
				word.En = ""
				if s.Valid {
					word.En = s.String
				}

				if err != nil {
					fmt.Println(err)
				}
				usersArray = append(usersArray, word)
			}

			err = rows.Err()
			if err != nil {
				fmt.Println(err)
			}

			// fmt.Println("name:", name, "sex:", sex)

			/* for rows.Next() {

				var id int8
				var Wort string
				var WortSex string
				var createdate time.Time
				err = rows.Scan(&id, &Wort, &WortSex, &createdate)

				fmt.Println("uid | username | department | created ")
				fmt.Println(id)
				fmt.Println(createdate)
				//fmt.Printf("%3v | %8v | %6v | %6v\n", id, Wort, WortSex, CreateDate)

			}*/
		}

		defer db.Close()

		//fmt.Println(usersArray)
		return usersArray;
	}
}
