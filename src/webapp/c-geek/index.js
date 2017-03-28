import React from 'react';
import { FloatingActionButton, FlatButton, Icoutton, FontIcon } from 'material-ui';
import * as githubService from './../service/github-service';
import * as act from './../setting/action';

import List, * as _list from './../component/list'
import FilterListGithub from './filter-list-github'
import * as tag from './../component/item/tag'

export default class Geek extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            pageSize: 30,
            total: 0,
            page: 1,
            filterData: { language: 'JavaScript', star: 3000 },
            filterVisible: false,
            willNeedUpdate: false,
        }
    }
    componentDidMount() {
        this._list_findAll(true)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.willNeedUpdate;
    }


    _list_findAll(willScrollTop) {
        this._list_github_findAll(willScrollTop);
    }

    _list_github_findAll(willScrollTop) {
        this.state.pageSize = 30;
        let filter = { filter: this.state.filterData, page: this.state.page }

        githubService.findAll(filter)
            .then(data => {

                this._list_prepare_update(willScrollTop)
                this.setState({
                    results: data.items,
                    total: data.total_count
                });
            });
    }

    _list_prepare_update(willScrollTop) {
        if (willScrollTop == true) {
            window.scrollTo(0, 0);
        }
        this.state.willNeedUpdate = true;
    }


    //Dispatch 
    _dispatch_list(action) {

        switch (action.type) {
            case _list.List_Filter:
                this.setState({ filterVisible: true });
                break;

            default:
                this.state.page = action.data;
                this._list_findAll(action.type === _list.List_Page_Next)
                break;
        }
        return false;
    }

    _dispatch_list_item(action) {
        switch (action.type) {
            case act.Action_List_Github_Author:
                //window.open(action.data, '_blank');
                this._router_link_detail(action)
                break;
            case act.Action_List_Github_Repository:
                window.open(action.data, '_blank');
                //this._router_link_detail(action)
                break;
            default:
                alert(action.type + "-" + action.data)
                break;
        }
        return false;
    }

    _dispatch_list_filter_popup(action) {
        switch (action.type) {
            case act.Action_Filter_List_Github_Confirm:
                this.state.filterData = action.data;
                this.state.page = 1;
                this._list_findAll(true)
                break;

            default:
                break;
        }

        this.state.willNeedUpdate = true;
        this.setState({ filterVisible: false });
        return false;
    }

    //Router_link
    _router_link_detail(action) {
        let _types = action.type.split("_");
        let _type = _types[_types.length - 1].toLowerCase();
        let _link = `/detail?_v=${_type}`;
        this.state.link = {
            pathname: _link,
            // this is the trick!
            state: {
                modal: true,
                channel: action
            }
        }

        this.props.history.push(this.state.link)
    }

    render() {
        return (
            <div>
                <List
                    resource={this.state.results}
                    pageSize={this.state.pageSize} total={this.state.total}
                    dispatch={this._dispatch_list.bind(this)}
                    dispatch_item={this._dispatch_list_item.bind(this)}
                    filterOpen={this.state.filterVisible}
                    itemTag={tag.List_Item_Github}
                />

                <FilterListGithub
                    open={this.state.filterVisible}
                    dispatch={this._dispatch_list_filter_popup.bind(this)}
                />
            </div>
        );
    }


}