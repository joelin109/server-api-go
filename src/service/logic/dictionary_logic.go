package logic

import (
	"fmt"

	"server-api-go/src/service/msql"
	"server-api-go/src/service/model"
	"server-api-go/src/service/util"
	//"os/user"
	"time"
)

type DictionaryLogic struct{}

var DefaultDictionary = DictionaryLogic{}

func (*DictionaryLogic) Post(word *model.ContentWord) (*model.ContentWord, error) {

	util.Log(util.UnderscoreName("DictionaryHandler.Post"))

	_word := new(model.ContentWord)
	_filter := msql.Filter("wort = ?", word.Wort)
	// _count, _ := msql.Count(&model.ContentWord{}, _filter)
	msql.QueryFirst(&_word, _filter)
	if _word.ID >= 1 {
		// Update
		_word.En = word.En
		_word.Zh = word.Zh
		_word.Plural = word.Plural
		_word.Type = word.Type
		_word.IsRegel = word.IsRegel
		_word.IsRecommend = word.IsRecommend
		_word.UpdateDate = time.Now()
		msql.Update(&_word, nil)
	} else {
		// Insert
		word.CreateDate = time.Now()
		word.UpdateDate = time.Now()
		msql.Create(&word)
		util.Log(_filter, word.ID)
	}

	_detail := new(model.ContentWord)
	msql.QueryFirst(&_detail, _filter)
	_detail.FormatDate()
	return _detail, nil
}

func (*DictionaryLogic) GetDetail(word *model.ContentWord) (*model.ContentWord, error) {

	fmt.Println(util.UnderscoreName("DictionaryLogic.GetDetail"))

	_word := new(model.ContentWord)
	_word.ID = word.ID

	//msql.QueryFirst(&_word, "wort = 'beeilen'")
	msql.First(&_word, _word.ID)

	fmt.Println(_word)
	fmt.Println(util.RandomKey("cw"))
	fmt.Println(util.RandomToken())

	_word.FormatDate()

	return _word, nil
}

func (*DictionaryLogic) GetList(param string, page int8, size int8) ([]*model.ContentWord, error) {

	fmt.Println(util.UnderscoreName("DictionaryLogic.GetList"))

	_filter := msql.Filter("is_recommend = ?", 0)
	_words := make([]*model.ContentWord, 0)
	msql.Query(&_words, _filter, nil)

	for _, _word := range _words {
		_word.FormatDate()
	}

	return _words, nil
}