package model

import (
	"time"
)

const (
	ArticleStatusNew = iota
	ArticleStatusOnline
	ArticleStatusOffline
)

type ContentWord struct {
	ID          int         `gorm:"primary_key"         json:"id"`
	Wort        string      `gorm:"column:wort"         json:"Wort"      sql:"not null;unique"  binding:"required"`
	WortSex     string      `gorm:"column:wort_sex"     json:"WortSex"   sql:"not_null"   binding:"required"`
	Plural      string      `gorm:"column:plural"       json:"Plural2"    sql:"not null"   binding:"required"`
	Zh          string      `gorm:"column:zh"           json:"Zh"`
	En          string      `gorm:"column:en"           json:"En" `
	Level       string      `gorm:"column:level"        json:"Level"`
	Type        string      `gorm:"column:type"         json:"Type"`
	IsRegel     int8        `gorm:"column:is_regel"     json:"IsRegel"`  // <=127
	IsRecommend int8        `gorm:"column:is_recommend" json:"IsRecommend"`
	IsIgnore    int8        `gorm:"column:is_ignore"    json:"IsIgnore"`
	CreateDate  time.Time   `gorm:"column:create_date"  json:"-"`
	UpdateDate  time.Time   `gorm:"column:update_date"  json:"-"`
	CreatedAt   string      `gorm:"-"                   json:"CreateDate"`
}

func (*ContentWord) TableName() string {
	return "content_dictionary_de"
}

func (self *ContentWord) FormatDate()  {
	self.CreatedAt = self.CreateDate.Format("2006-01-02 15:04:05")
}


// 抓取的文章信息
type Article struct {
	Id        int       `json:"id" xorm:"pk autoincr"`
	Domain    string    `json:"domain"`
	Name      string    `json:"name"`
	Title     string    `json:"title"`
	Cover     string    `json:"cover"`
	Author    string    `json:"author"`
	AuthorTxt string    `json:"author_txt"`
	Lang      int       `json:"lang"`
	PubDate   string    `json:"pub_date"`
	Url       string    `json:"url"`
	Content   string    `json:"content"`
	Txt       string    `json:"txt"`
	Tags      string    `json:"tags"`
	Css       string    `json:"css"`
	Viewnum   int       `json:"viewnum"`
	Cmtnum    int       `json:"cmtnum"`
	Likenum   int       `json:"likenum"`
	Top       uint8     `json:"top"`
	Status    int       `json:"status"`
	OpUser    string    `json:"op_user"`
}

func (*Article) TableName() string {
	return "articles"
}


