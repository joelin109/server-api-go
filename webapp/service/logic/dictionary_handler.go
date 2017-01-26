package logic

import (
	"fmt"

	"server-api-go/webapp/service/msql"
	"server-api-go/webapp/service/model"
	"server-api-go/webapp/service/util"
)

type DictionaryHandler struct{}

/*func (DictionaryHandler) FindLastList(param string, limit int) ([]*model.ContentWord, error) {
	words := make([]*model.ContentWord, 0)

	err := MasterDB.Where("ctime>? AND status!=?", param, model.ArticleStatusOffline).
		OrderBy("cmtnum DESC, likenum DESC, viewnum DESC").Limit(limit).Find(&words)

	return words, err
}*/

func (*DictionaryHandler) GetList(param string, limit int8) ([]*model.ContentWord, error) {

	fmt.Println(util.UnderscoreName("DictionaryHandler.GetList"))

	_filter := fmt.Sprintf("\"is_recommend\" = 1")
	_words := make([]*model.ContentWord, 0)
	//_words := []&model.ContentWord{}

	fmt.Println(_words)
	msql.Query(_filter, nil, limit, &_words)

	fmt.Println("DictionaryHandler.GetList")
	for _, _word := range _words {
		_word.UpdateDate = _word.CreateDate.Format("2006-01-02 15:04:05")
		fmt.Println(*_word)
	}

	return _words, nil
}