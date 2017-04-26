import React from 'react';
//import * as service from './../../service/news-service';
import * as service from './../../service/article-service';
import * as act from './../../setting/action';
import * as tag from './../../component/item/tag'
import List, * as _list from './../../component/list'
import ArticleListFilter from './article-list-filter'
import NewArticle from './new-article'




export default class AdminArticle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            pageSize: 30,
            total: 0,
            page: 1,
            filterData: "ars-technica",
            filterVisible: false,
            editVisible: false,
            editObject: {},
            willNeedUpdate: false,
        }

        this._dispatch_list = this._dispatch_list.bind(this);
        this._dispatch_list_filter = this._dispatch_list_filter.bind(this);
        this._dispatch_list_item = this._dispatch_list_item.bind(this);
        this._dispatch_list_item_update = this._dispatch_list_item_update.bind(this);
    }

    componentDidMount() {
        this._list_findAll(true)
    }

    componentWillReceiveProps(nextProps) {
        this._component_should_update(false);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.willNeedUpdate;
    }


    _list_findAll(willScrollTop) {
        this._list_news_findAll(willScrollTop);
    }

    _list_news_findAll(willScrollTop) {
        this.state.pageSize = 30;
        let filter = { filter: this.state.filterData, page: this.state.page }

        service.findAll(filter)
            .then(data => {

                let _results = this._mergeResult(data.articles, data.source);
                this._component_should_update(true, true)
                this.setState({
                    results: _results,
                });
            });
    }

    _component_should_update(willUpdate = true, willScroll = false) {
        if (willScroll == true) {
            window.scrollTo(0, 0);
        }
        this.state.filterVisible = false;
        this.state.detailVisible = false;
        this.state.willNeedUpdate = willUpdate;
    }

    _mergeResult(result, tag) {

        let _result = result;
        Array.from(_result, (item) => {
            item["tag"] = tag;
            return item
        })

        return _result;
    }


    //Dispatch 
    _dispatch_list(action) {

        switch (action.type) {
            case _list.List_Filter:
                this._setFilter()
                break;
            case _list.List_New:
                this._setEditOrNew();
                break;

            default:
                this.state.page = action.data;
                this._list_findAll(action.type === _list.List_Page_Next)
                break;
        }
        return false;
    }

    _dispatch_list_item(action) {
        this._setEditOrNew(action.data, false)
        return false;
    }

    _dispatch_list_item_update(action) {

    }


    _dispatch_list_filter(action) {
        switch (action.type) {
            case act.Action_Filter_List_Confirm:
                this.state.filterData = action.data;
                this.state.page = 1;
                this._list_findAll(true)
                break;

            default:
                break;
        }

        this._setFilter(false);
        return false;
    }

    _setFilter(open = true) {
        this._component_should_update();
        this.setState({
            filterVisible: open,
            editVisible: false
        });
    }
    _setEditOrNew(data, isNew = true) {
        this.state.editObject = isNew ? null : data;

        this._component_should_update();
        this.setState({
            filterVisible: false,
            editVisible: true,
        });
    }





    render() {
        let _filterVisible = this.state.filterVisible;
        let _editVisible = _filterVisible ? false : this.state.editVisible;
        let _willUpdate = !_filterVisible && !_editVisible;

        return (
            <div>
                <List
                    source={this.state.results}
                    pageSize={this.state.pageSize} total={this.state.results.length}
                    dispatch={this._dispatch_list}
                    dispatch_item={this._dispatch_list_item}
                    filterOpen={!_willUpdate}
                    itemTag={tag.List_Item_Admin_Article}
                    admin={true}
                />

                <ArticleListFilter
                    open={_filterVisible}
                    dispatch_filter={this._dispatch_list_filter}
                />

                <NewArticle
                    open={_editVisible}
                    source={this.state.editObject}
                    dispatch_item_update={this._dispatch_list_item_update}
                />
            </div>
        );
    }


}