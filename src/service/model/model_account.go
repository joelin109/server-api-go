package model

import "time"

type User struct {
	Name         string
	Email        string
	Country      string
	Created_date time.Time
	Id           int
	Hash         string
	IP           string
}

func (*User) TableName() string {
	return "content_dictionary_de"
}
