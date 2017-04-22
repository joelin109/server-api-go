import React from 'react';
import { Card, } from 'material-ui/Card';
import { SButton } from './../../component/wui'
import * as act from './../action';


export default class ArticleListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            loading: true,
        };

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


    _handleDetail(e) {
        //this.props.dispatch({ type: act.Action_List_Article_Detail, data: e.target.src })
    };


    _handleTag(e) {
        //this.props.dispatch({ type: act.Action_List_Article_Tag, data: e.target.innerHTML })
    };

    _handle_item_recommend() {

    };
    _handle_item_approval() {

    };
    _handle_item_unapproval() {

    };
    _handle_item_edit() {
        this.props.dispatch({ type: 'edit', data: this.props.value })
    };




    render() {
        let _coverSrc = this.props.value.urlToImage;
        let _author = this.props.value.author === null ? '---' : this.props.value.author;
        let _title = this.props.value.title;
        let _pb = this.props.value.publishedAt;
        let _publish = _pb === null ? '' : _pb.replace("T", " . ").replace("Z", "");
        let pills = <li2 ><p className="word" onClick={this._handleTag.bind(this)}>{this.props.value.tag}</p></li2>;

        let _recommend = this.props.value.is_recommend === 1;
        let _recommendButton = <SButton id={_recommend ? 'favorite' : 'favorite_border'} selected={_recommend} onTouchTap={this._handle_item_recommend} />;
        let _status = this.props.value.valid_status;
        let _statusDesc = _status === 0 ? 'pending' : '';
        let _upButton = <SButton id="thumb_up" selected={_status === 1} onTouchTap={this._handle_item_approval} />;
        let _downButton = <SButton id="thumb_down" selected={_status === -1} onTouchTap={this._handle_item_unapproval} />;
        let _editButton = <SButton id="edit" onTouchTap={this._handle_item_edit} />;

        return (

            <div className="itemC">
                <Card className="itemBox">

                    <div className="itemBox-img-box">
                        <img
                            className="itemBox-img-cover" id="im-user-id"
                            src={_coverSrc}
                            onClick={this._handleDetail.bind(this)}
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
                            <a href={this.props.value.url} target="_blank">{_title}</a>
                        </p>
                        <p className="itemBox-text-subTitle">{_publish}</p>
                        <ul className="keyword cfix">
                            {pills}
                        </ul>
                    </div>

                    <div className="itemBox-console-box">
                        {_status === 0 ? 'pending' : <div>&nbsp;&nbsp;</div>}&nbsp;&nbsp;{_upButton} {_downButton} &nbsp;&nbsp;{_editButton}
                    </div>
                </Card>
            </div>
        );
    }
}