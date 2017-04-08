import React from 'react';
import { FloatingActionButton, FlatButton, Icoutton, FontIcon } from 'material-ui';
import ListCard from './list-card'
import Paginator from './paginator';
import { itemCovers, userThumbs } from './../../setting/data'
const covers = itemCovers
const thumbs = userThumbs

export const List_Page_Previous = 'List_Page_Previous'
export const List_Page_Next = 'List_Page_Next'
export const List_Filter = 'List_Filter'

export default class List extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            page: 1,
            listFilterButtonBground: '#EF5350',
        }
        this._dispatch_list = this._dispatch_list.bind(this);
        this._dispatch_list_page_previous = this._dispatch_list_page_previous.bind(this);
        this._dispatch_list_page_next = this._dispatch_list_page_next.bind(this);
        this._dispatch_list_filter = this._dispatch_list_filter.bind(this);

        // alert('ListBase-constructor')
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (typeof (nextProps.filterOpen) !== "undefined" && nextProps.filterOpen) {
            return false;
        }
        else {
            return true;
        }
    }

    //Dispatch
    _dispatch_list(action) {
        this.props.dispatch_item(action);
        return false;
    }

    _dispatch_list_page_previous() {
        this.state.page = this.state.page - 1;
        this.props.dispatch({ type: List_Page_Previous, data: this.state.page });
        return false;
    }

    _dispatch_list_page_next() {
        this.state.page = this.state.page + 1;
        this.props.dispatch({ type: List_Page_Next, data: this.state.page });
        return false;
    }

    _dispatch_list_filter(action) {
        this.props.dispatch({ type: List_Filter, data: this.state.page });
        return false;
    }

    _fontIcon(id, color = '#EEEEEE') {
        let _hoverColor = "#EF5350"
        return <FontIcon className="material-icons" color={color} hoverColor={_hoverColor}>{id}</FontIcon>;
    }

    _adjustResult(result) {

        let _result = result;
        Array.from(_result, (item) => {
            item["coverSrc"] = covers[Math.floor(Math.random() * covers.length)];
            item["userThumb"] = thumbs[Math.floor(Math.random() * thumbs.length)]
            return item
        })

        return _result;
    }

    render() {
        this.state.results = this._adjustResult(this.props.resource);
        let _itemTag = this.props.itemTag;
        let _key = `list-${_itemTag}`;

        return (
            <div>
                <ListCard key={_key}
                    itemTag={_itemTag}
                    resource={this.state.results}
                    dispatch={this._dispatch_list.bind(this)}
                />

                <Paginator
                    page={this.state.page}
                    pageSize={this.props.pageSize} total={this.props.total}
                    onPrevious={this._dispatch_list_page_previous.bind(this)}
                    onNext={this._dispatch_list_page_next.bind(this)}
                />

                <div className="root-list-filter">
                    <FloatingActionButton className="root-list-filter-button"
                        zDepth={2}
                        backgroundColor={this.state.listFilterButtonBground}
                        onTouchTap={this._dispatch_list_filter.bind(this)}>
                        {this._fontIcon('filter_list')}
                    </FloatingActionButton>
                </div>
            </div>
        );
    }


}