import React from 'react';
import { Card, } from 'material-ui/Card';
import { SButton } from './../../component/wui'
import * as act from './../action';

const _action_List_Item_Edit = 'Action_List_Item_Edit';
const _action_List_Item_Update = 'Action_List_Item_Update';
export default class ArticleListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            willUpdate: true,
            id: '',
            isRecommend: false,
            status: 0,
            coverThumbSrc: '',
            title: '',
            tagID: '',
            tagName: '',
            updated: '',
        };

        this._initItem(props.value)

        this._handle_item_detail = this._handle_item_detail.bind(this);
        this._handle_item_tag = this._handle_item_tag.bind(this);
        this._handle_item_recommend = this._handle_item_recommend.bind(this);
        this._handle_item_approval = this._handle_item_approval.bind(this);
        this._handle_item_unapproval = this._handle_item_unapproval.bind(this);
        this._handle_item_edit = this._handle_item_edit.bind(this);
    }

    componentDidMount() {
        this.state.loading = false
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;//(this.state.total != nextProps.total);
    }

    _initItem(source) {

        let _item = source;
        this.state.id = _item.id;
        this.state.coverThumbSrc = _item.cover_thumbnail_src;
        this.state.title = _item.title;
        this.state.isRecommend = _item.is_recommend === 1;
        this.state.status = _item.publish_status;
        this.state.updated = _item.last_update_date;
        this.state.tagID = '';
        this.state.tagName = 'entertainment-weekly';

    }

    _update(componentUpdate = true) {

        if (componentUpdate) {
            this.setState({ willUpdate: true });
        }

        let _data = {
            id: this.state.id,
            is_recommend: this.state.isRecommend,
            publish_status: this.state.status,
        }
        this.props.dispatch({ type: _action_List_Item_Update, data: _data })
    }

    _handle_item_detail(e) {
        //this.props.dispatch({ type: act.Action_List_Article_Detail, data: e.target.src })
    };


    _handle_item_tag(e) {
        //this.props.dispatch({ type: act.Action_List_Article_Tag, data: e.target.innerHTML })
    };

    _handle_item_recommend() {
        let _isRecommend = this.state.isRecommend;
        this.state.isRecommend = !_isRecommend;
        this._update(true);
    };

    _handle_item_approval() {
        let _status = this.state.status === 1 ? 0 : 1;
        this.state.status = _status;
        this._update(true);
    };

    _handle_item_unapproval() {
        let _status = this.state.status === -1 ? 0 : -1;
        this.state.status = _status;
        this._update(true);
    };

    _handle_item_edit() {
        this.props.dispatch({ type: _action_List_Item_Edit, data: this.props.value })
    };




    render() {
        let _author = this.props.value.author === null ? '---' : this.props.value.author;
        let pills = <li2 ><p className="word" onClick={this._handle_item_tag}>{this.state.tagName}</p></li2>;

        let _coverSrc = this.state.coverThumbSrc;
        let _title = this.state.title;
        let _recommend = this.state.isRecommend;
        let _recommendButton = <SButton id={_recommend ? 'favorite' : 'favorite_border'} selected={_recommend} onTouchTap={this._handle_item_recommend} />;
        let _upButton = <SButton id="thumb_up" selected={this.state.status === 1} onTouchTap={this._handle_item_approval} />;
        let _downButton = <SButton id="thumb_down" selected={this.state.status === -1} onTouchTap={this._handle_item_unapproval} />;
        let _editButton = <SButton id="edit" onTouchTap={this._handle_item_edit} />;

        return (

            <div className="itemC">
                <Card className="itemBox">

                    <div className="itemBox-img-box">
                        <img
                            className="itemBox-img-cover" id="im-user-id"
                            src={_coverSrc}
                            onClick={this._handle_item_detail}
                        />
                        <div className="itemBox-recommend">
                            {_recommendButton}
                        </div>
                        <div className="itemBox-text-rightcopy">
                            <p className="itemBox-text-subTitle"></p>
                        </div>
                    </div>

                    <div className="itemBox-text-box">
                        <p className="itemBox-text-title">
                            <a href={this.props.value.original_url} target="_blank">{_title}</a>
                        </p>
                        <p className="itemBox-text-subTitle">{this.state.updated}</p>
                        <ul className="keyword cfix">
                            {pills}
                        </ul>
                    </div>

                    <div className="itemBox-console-box">
                        Status:&nbsp;&nbsp;{_upButton} {_downButton} &nbsp;&nbsp;{_editButton}
                    </div>
                </Card>
            </div>
        );
    }
}