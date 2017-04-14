import React from 'react';
import { FloatingActionButton, FlatButton, Icoutton, FontIcon } from 'material-ui';
import * as wordService from './../service/word-service';
import * as articleService from './../service/product-service';
import * as act from './../setting/action';

import Word from './word';


export default class AdminList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            channel: { type: act.Action_Admin_Channel_Type_Word, data: {} },
            results: [],
            page: 1,
            pageSize: 12,
            filterKey: '',
            listFilterVisible: false,
            willNeedUpdate: false,
        }
    }

    componentDidMount() {
        this._list_findAll();
    }

    componentWillReceiveProps(nextProps) {
        // alert("componentWillReceiveProps - " + nextProps.channel.type)
        this.state.willNeedUpdate = false;
        if (nextProps.channel) {
            if (this.state.channel.type !== nextProps.channel.type) {
                this._switch_channel(nextProps.channel)
            }
        }

    }

    shouldComponentUpdate(nextProps, nextState) {

        return this.state.willNeedUpdate;
    }

    _switch_channel(newChannel) {
        if (newChannel) {
            this.state.channel = newChannel;
            this.state.page = 1;
            this._list_findAll();
        }
    }


    //API Request&Response
    _list_findAll(willScrollTop = false) {
        switch (this.state.channel.type) {
            case act.Action_Admin_Channel_Type_Word:
                this._list_deutsch_findAll(willScrollTop);
                break;
            default:
                this._list_article_findAll(willScrollTop);
                break;
        }
    }

    _list_article_findAll(willScrollTop) {
        this.state.pageSize = 12;
        let filter = {
            search: this.state.filterKey,
            min: 0, max: 26,
            page: this.state.page
        }
        articleService.findAll(filter)
            .then(result => {

                this._list_prepare_update(willScrollTop)
                this.setState({
                    results: result.products,
                    page: result.page,
                    total: result.total,
                });
            });
    }


    _list_deutsch_findAll(willScrollTop) {
        this.state.pageSize = 30;
        wordService.findAll({})
            .then(data => {
                this._list_prepare_update(willScrollTop)
                this.setState({
                    results: data.rows,
                    pageSize: 30,
                });
            });

    }

    _list_prepare_update(willScrollTop) {
        if (willScrollTop == true) {
            //window.scrollTo(0, 0);
        }
        this.state.willNeedUpdate = true;
    }

    //Dispatch
    _dispatch_list(action) {

        switch (action.type) {
            case act.Action_List_Article_Tag:
                this._action_list_article_tag(action.data)
                break;
            case act.Action_Admin_Word_List_Modify:
                alert(action.data.wort + '-' + action.data.wortsex)
                break;

            default:
                //this.props.dispatch(action, action.data)
                break;
        }
        return false;
    }

    _dispatch_list_filter(action) {

        this.state.willNeedUpdate = true;
        this.setState({ listFilterVisible: true })
    }

    _dispatch_list_filter_popup(action) {
        switch (action.type) {
            case act.Action_Filter_List_Github_Confirm:
                this._action_list_github_filter(action.data)
                break;

            case act.Action_Filter_List_Article_Confirm:
                this._action_list_article_filter(action.data)
                break;

            default:
                break;
        }

        this.state.willNeedUpdate = true;
        this.setState({ listFilterVisible: false });
        return false;
    }

    //Acton
    _action_list_article_tag(tag) {
        this.state.filterKey = tag;
        this.state.page = 1;
        this._list_findAll()
    }

    _action_list_article_filter(range) {
        this.state.filterKey = ""
        this.state.page = 1;
        this._list_findAll()
    }


    _action_list_page_previous() {
        this.state.page = this.state.page - 1;
        this._list_findAll()
    }

    _action_list_page_next() {
        this.state.page = this.state.page + 1;
        this._list_findAll(true)
    }


    render() {
        //alert("render - " + this.state.results.length)
        let color = "#EEEEEE"
        let hoverColor = "#EF5350"
        let search = <FontIcon className="material-icons" color={hoverColor} hoverColor={hoverColor}>filter_list</FontIcon>;

        let list
        switch (this.state.channel.type) {
            case act.Action_Admin_Channel_Type_Word:
                list = <Word
                    source={this.state.results}
                    dispatch={this._dispatch_list.bind(this)}
                    open={this.state.listFilterVisible}
                />
                break;

            default:
                list = <Word
                    source={this.state.results}
                    dispatch={this._dispatch_list.bind(this)}
                    open={this.state.listFilterVisible}
                />
                break;
        }

        return (
            <div className="admin-root">
                {list}

                <br />  <br />

                <div className="root-list-filter">
                    <FloatingActionButton className="root-list-filter-button"
                        backgroundColor={hoverColor} zDepth={2}
                        onTouchTap={this._dispatch_list_filter.bind(this)}>
                        {search}
                    </FloatingActionButton>
                </div>
            </div>
        );
    }


}
;