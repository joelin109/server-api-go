import React from 'react';
import { Card, } from 'material-ui/Card';
import * as act from './../../setting/action';


export default class ItemArticle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            loading: true,
        };
    }

    componentDidMount() {
        this.state.loading = false
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;//(this.state.total != nextProps.total);
    }


    _handleDetail(e) {
        this.props.dispatch({ type: act.Action_List_Article_Detail, data: e.target.src })
    };


    _handleTag(e) {
        this.props.dispatch({ type: act.Action_List_Article_Tag, data: e.target.innerHTML })
    };




    render() {
        let _coverSrc = this.props.value.urlToImage;
        let _author = this.props.value.author === null ? '---' : this.props.value.author;
        let _title = this.props.value.title;
        let _pb = this.props.value.publishedAt;
        let _publish = _pb === null ? '' : _pb.replace("T", " . ").replace("Z", "");
        let pills = <li2 ><p className="word" onClick={this._handleTag.bind(this)}>{this.props.value.tag}</p></li2>;

        return (

            <div className="itemC">
                <Card className="itemBox">

                    <div className="itemBox-Img">
                        <img
                            className="itemBox-Img-cover" id="im-user-id"
                            src={_coverSrc}
                            onClick={this._handleDetail.bind(this)}
                        />
                        <div className="itemBox-Text-date">
                            <p className="itemBox-Text-subTitle">{_publish}</p>
                        </div>
                    </div>

                    <div className="itemBox-Text">
                        <p className="itemBox-Text-title">
                            <a href={this.props.value.url} target="_blank">{_title}</a>
                        </p>
                        <p className="itemBox-Text-subTitle">{_author}</p>
                        <p className="itemBox-Text-text">{this.props.value.description}</p>
                    </div>

                    <div className="itemBox-tag">
                        <ul className="keyword cfix">
                            {pills}
                        </ul>
                    </div>
                </Card>
            </div>
        );
    }
}
