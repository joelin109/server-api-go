import React from 'react';
import { FloatingActionButton, FlatButton, Icoutton, FontIcon } from 'material-ui';
import Paginator from './paginator';
import * as productService from './../../service/product-service';
import * as githubService from './../../service/github-service';
import * as act from './../../action';

import ListCard from './list-card';
import ListDefault from './list-default';
import ListGithub from './list-github'
import PopupFilterList from './../popup/filter-list'
import Style from './../../util/style'

export default class ListC extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            page: 1,
            channel: {},
            filterKey: "",
            filterRange: [0, 26],
            listFilterVisible: false,
            willNeedUpdate: false,
        }
    }

    componentDidMount() {
        this._switch_channel(this.props.channel)
    }

    componentWillReceiveProps(nextProps) {
        // alert("componentWillReceiveProps - " + nextProps.channel.type)
        this.state.willNeedUpdate = false;
        if (this.state.channel.type !== nextProps.channel.type) {
            this._switch_channel(nextProps.channel)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        return this.state.willNeedUpdate;
    }

    _switch_channel(newChannel) {
        this.state.channel = newChannel;
        this.state.filterKey = newChannel.filter;
        this.state.filterRange = newChannel.data;
        this.state.page = 1;
        this._list_findAll();
    }


    //API Request&Response
    _list_findAll(willScrollTop = false) {
        switch (this.state.channel.type) {
            case act.Action_Channel_Type_Github:
                this._list_github_findAll(willScrollTop);
                break;
            default:
                this._list_article_findAll(willScrollTop);
                break;
        }
    }

    _list_article_findAll(willScrollTop) {
        let filter = {
            search: this.state.filterKey,
            min: this.state.filterRange[0], max: this.state.filterRange[1],
            page: this.state.page
        }
        productService.findAll(filter)
            .then(result => {

                if (willScrollTop == true) {
                    window.scrollTo(0, 0);
                }
                this.state.willNeedUpdate = true;
                this.setState({
                    results: result.products,
                    page: result.page,
                    total: result.total,
                });
            });
    }

    _list_github_findAll(willScrollTop) {
        let filter = { search: this.state.filterKey, page: 1 }
        githubService.findAll(filter)
            .then(data => {
                this.state.willNeedUpdate = true;
                this.setState({
                    results: data.items,
                    pageSize: 30,
                    total: data.total_count
                });
            });
    }

    //Dispatch
    _dispatch_list(action) {

        switch (action.type) {
            case act.Action_List_Article_Tag:
                this._action_list_article_tag(action.data)
                break;

            default:
                this.props.dispatch(action, action.data)
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
                alert("Github_Confirm-" + action.data)
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
        this.state.filterRange = range;
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
        let size = this.state.results.length
        let color = "#EEEEEE"
        let hoverColor = "#EF5350"
        let search = <FontIcon className="material-icons" color={hoverColor} hoverColor={hoverColor}>filter_list</FontIcon>;

        let list
        let listStyle = Style.list;
        switch (this.props.displayStyle) {
            case act.Action_Display_List_Article:
                list = <ListCard value={this.state.results} style={listStyle}
                    dispatch={this._dispatch_list.bind(this)} />
                break;
            case act.Action_Display_List_Github:
                list = <ListGithub value={this.state.results} style={listStyle}
                    dispatch={this._dispatch_list.bind(this)} />
                break;
            default:
                list = <ListDefault value={this.state.results} style={listStyle} itemStyle="deutsch"
                    dispatch={this._dispatch_list.bind(this)} />
                break;
        }

        return (
            <div>
                {list}

                <br />  <br />

                <div>
                    <Paginator style={Style.paginator}
                        page={this.state.page} pageSize={size} total={this.state.total}
                        onPrevious={this._action_list_page_previous.bind(this)}
                        onNext={this._action_list_page_next.bind(this)} />
                </div>

                <div className="root-list-filter">
                    <FloatingActionButton className="root-list-filter-button"
                        backgroundColor={hoverColor} zDepth={2}
                        onTouchTap={this._dispatch_list_filter.bind(this)}>
                        {search}
                    </FloatingActionButton>
                </div>

                <PopupFilterList open={this.state.listFilterVisible}
                    channel={this.state.channel}
                    dispatch={this._dispatch_list_filter_popup.bind(this)} />
            </div>
        );
    }


}
;

