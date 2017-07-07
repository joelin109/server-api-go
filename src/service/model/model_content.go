package model

import (
	"time"
)

const (
	ArticleStatusNew = iota
	ArticleStatusOnline
	ArticleStatusOffline
)

//ContentWord struct is the model for table,content_dictionary_de
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

// TableName is for setting tablename for ContentWord struct model
func (*ContentWord) TableName() string {
	return "content_dictionary_de"
}

func (self *ContentWord) FormatDate() {
	self.UpdatedAt = self.UpdateDate.Format("2006-01-02 15:04:05")
}

// Article struct is the model for table,content_article
type Article struct {
	ID                int       `gorm:"primary_key"                json:"id"`
	CoverThumbnailSrc string    `gorm:"column:cover_thumbnail_src" json:"cover_thumbnail_src" sql:"not null"   binding:"required"`
	CoverSrc          string    `gorm:"column:cover_src"           json:"cover_src"`
	Title             string    `gorm:"column:title"               json:"title" sql:"not null"   binding:"required"`
	SubTitle          string    `gorm:"column:subtitle"            json:"subtitle"`
	OriginalURL       string    `gorm:"column:original_url"        json:"original_url"`
	Desc              string    `gorm:"column:desc"                json:"desc"`
	Formatype         string    `gorm:"column:format_type"         json:"format_type"`
	BodyMatchLevel    int8      `gorm:"column:body_match_level"    json:"body_match_level"`
	ChannelID         string    `gorm:"column:channel_id"          json:"channel_id"`
	TagID             string    `gorm:"column:tag_id"              json:"tag_id"`
	PublishAt         string    `gorm:"column:publish_at"          json:"publish_at"`
	IsRecommend       int8      `gorm:"column:is_recommend"        json:"is_recommend"`
	PublishStatus     int8      `gorm:"column:publish_status"      json:"publish_status"`
	LastUpdateDate    time.Time `gorm:"column:last_update_date"    json:"last_update_date"`
}

func (*Article) TableName() string {
	return "content_article"
}
