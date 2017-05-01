import React from 'react';
import { FloatingActionButton, FlatButton, Icoutton, FontIcon } from 'material-ui';
import Paginator from './paginator';
import * as productService from './../../service/dem/product-service';
import * as wordService from './../../service/word-service';
import * as act from './../../setting/action';

import ListTable from './list-table';
import List from './list'
import * as tag from './../item/tag';
import PopupFilterList from './../popup/filter-list'


export default class ListC extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            page: 1,
            pageSize: 12,
            channel: props.channel,
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
            case act.Action_Channel_Type_Word:
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
            min: this.state.filterRange[0], max: this.state.filterRange[1],
            page: this.state.page
        }
        productService.findAll(filter)
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
            case act.Action_List_Article_Detail:
                window.open(action.data, '_blank');
                break;
            default:
                alert(action.type + "-" + action.data)
                break;
        }
        return false;
    }

    _dispatch_link_detail(action) {
        let _types = action.type.split("_");
        let _type = _types[_types.length - 1].toLowerCase();
        let _link = `/article/?_${_type}`;
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

    _dispatch_list_filter(action) {

        this.state.willNeedUpdate = true;
        this.setState({ listFilterVisible: true })
    }

    _dispatch_list_filter_popup(action) {
        switch (action.type) {
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


    _fontIcon(id, color = '#EEEEEE') {
        let _hoverColor = "#EF5350"
        return <FontIcon className="material-icons" color={color} hoverColor={_hoverColor}>{id}</FontIcon>;
    }

    render() {
        const _display = this.state.channel.type;
        let _hoverColor = "#EF5350"

        let list
        switch (_display) {
            case act.Action_Channel_Type_Word:
                list = <ListTable
                    source={this.state.results} itemStyle="deutsch"
                    dispatch={this._dispatch_list.bind(this)} />
                break;

            default:
                list = <List key='card'
                    itemTag={tag.List_Item_Card}
                    source={this.state.results}
                    dispatch={this._dispatch_list.bind(this)} />
                break;
        }

        return (
            <div>
                {list}

                <br />  <br />

                <div>
                    <Paginator
                        page={this.state.page} pageSize={this.state.pageSize} total={this.state.total}
                        onPrevious={this._action_list_page_previous.bind(this)}
                        onNext={this._action_list_page_next.bind(this)} />
                </div>

                <div className="root-list-filter">
                    <FloatingActionButton className="root-list-filter-button"
                        backgroundColor={_hoverColor} zDepth={2}
                        onTouchTap={this._dispatch_list_filter.bind(this)}>
                        {this._fontIcon('filter_list')}
                    </FloatingActionButton>
                </div>

                <PopupFilterList open={this.state.listFilterVisible}
                    channel={this.state.channel}
                    dispatch={this._dispatch_list_filter_popup.bind(this)} />
            </div>
        );
    }


}


