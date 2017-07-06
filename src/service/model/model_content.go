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
	ID            int       `gorm:"primary_key"             json:"id"`
	Wort          string    `gorm:"column:wort"             json:"wort"      sql:"not null;unique"  binding:"required"`
	WortSex       string    `gorm:"column:wort_sex"         json:"wort_sex"  sql:"not null"   binding:"required"`
	Phonitic      string    `gorm:"column:phonitic"         json:"phonitic"`
	PhoniticSep   string    `gorm:"column:phonitic_sep"     json:"phonitic_sep"`
	Plural        string    `gorm:"column:plural"           json:"plural"    sql:"not null"   binding:"required"`
	Zh            string    `gorm:"column:zh"               json:"zh"`
	En            string    `gorm:"column:en"               json:"en" `
	Level         string    `gorm:"column:level"            json:"level"`
	Type          string    `gorm:"column:type"             json:"type"`
	IsRegel       int8      `gorm:"column:is_regel"         json:"is_regel"` // <=127
	IsRecommend   int8      `gorm:"column:is_recommend"     json:"is_recommend"`
	PublishStatus int8      `gorm:"column:publish_status"   json:"publish_status"`
	CreateDate    time.Time `gorm:"column:create_date"      json:"-"`
	UpdateDate    time.Time `gorm:"column:last_update_date" json:"-"`
	CrawlStatus   int8      `gorm:"column:crawl_status"     json:"crawl_status"`
	UpdatedAt     string    `gorm:"-"                       json:"last_update_date"`
}

func (*ContentWord) TableName() string {
	return "content_dictionary_de"
}

func (self *ContentWord) FormatDate() {
	self.UpdatedAt = self.UpdateDate.Format("2006-01-02 15:04:05")
}

// 抓取的文章信息
type Article struct {
	ID        int    `json:"id" xorm:"pk autoincr"`
	Domain    string `json:"domain"`
	Name      string `json:"name"`
	Title     string `json:"title"`
	Cover     string `json:"cover"`
	Author    string `json:"author"`
	AuthorTxt string `json:"author_txt"`
	Lang      int    `json:"lang"`
	PubDate   string `json:"pub_date"`
	URL       string `json:"url"`
	Content   string `json:"content"`
	Txt       string `json:"txt"`
	Tags      string `json:"tags"`
	CSS       string `json:"css"`
	Viewnum   int    `json:"viewnum"`
	Cmtnum    int    `json:"cmtnum"`
	Likenum   int    `json:"likenum"`
	Top       uint8  `json:"top"`
	Status    int    `json:"status"`
	OpUser    string `json:"op_user"`
}

func (*Article) TableName() string {
	return "articles"
}
