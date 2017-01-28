package logic

import (
	"fmt"

	"server-api-go/webapp/service/msql"
	"server-api-go/webapp/service/model"
	"server-api-go/webapp/service/util"
	//"os/user"
)

type DictionaryHandler struct{}

func (*DictionaryHandler) Post(word *model.ContentWord) (*model.ContentWord, error) {

	util.Log(util.UnderscoreName("DictionaryHandler.Post"))

	_word := new(model.ContentWord)
	_filter := msql.Filter("wort = ?", word.Wort)
	_count, _ := msql.Count(&model.ContentWord{}, _filter)
	if _count >= 1 {
		// Update
		msql.QueryFirst(&_word, _filter)

		_word.En = word.En
		_word.Zh = word.Zh
		_word.Plural = word.Plural
		msql.Update(&_word, nil)
	} else {
		// Insert
		util.Log(_filter, _count)
	}

	_detail := new(model.ContentWord)
	msql.First(&_detail, _word.ID)
	_detail.CreatedAt = _detail.CreateDate.Format("2006-01-02 15:04:05")

	return _detail, nil
}

func (*DictionaryHandler) GetDetail(word *model.ContentWord) (*model.ContentWord, error) {

	fmt.Println(util.UnderscoreName("DictionaryHandler.GetDetail"))

	_word := new(model.ContentWord)
	_word.ID = word.ID

	//msql.QueryFirst(&_word, "wort = 'beeilen'")
	msql.First(&_word, _word.ID)

	fmt.Println(_word)
	fmt.Println(util.RandomKey("cw"))
	fmt.Println(util.RandomToken())

	_word.CreatedAt = _word.CreateDate.Format("2006-01-02 15:04:05")

	return _word, nil
}

func (*DictionaryHandler) GetList(param string, limit int8) ([]*model.ContentWord, error) {

	fmt.Println(util.UnderscoreName("DictionaryHandler.GetList"))

	_filter := fmt.Sprintf("\"is_recommend\" = 1")
	_words := make([]*model.ContentWord, 0)
	//_words := []&model.ContentWord{}

	fmt.Println(_words)
	msql.Query(&_words, _filter, nil)

	fmt.Println("DictionaryHandler.GetList")
	for _, _word := range _words {
		_word.CreatedAt = _word.CreateDate.Format("2006-01-02 15:04:05")
		fmt.Println(*_word)
	}

	return _words, nil
}