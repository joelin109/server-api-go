import React from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { itemCovers, userThumbs } from './../../setting/data'
import * as act from './../../setting/action';


import Style from './../../util/style'
var Markdown = require('react-markdown');

const covers = itemCovers
const thumbs = userThumbs
const coverCount = itemCovers.length

class ItemCard extends React.Component {

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
        return false;//(this.state.total != nextProps.total);
    }


    _handleAuthor(e) {
        this.props.dispatch({ type: act.Action_List_Article_Author, data: e.target.id })
    };

    _handleDetail(e) {
        this.props.dispatch({ type: act.Action_List_Article_Detail, data: e.target.src })
    };

    _handleTag(e) {
        this.props.dispatch({ type: act.Action_List_Article_Tag, data: e.target.innerHTML })
    };

    _markdownHtml() {
        let markdownSrc = [
            '# ---\nChanges are automatically rendered as you type.\n\n* Follows the ',
            '[CommonMark](http://commonmark.org/) spec\n* Renders actual, "native" React DOM ',
            'elements',
            '\n* If you escape or skip the HTML, no `dangerouslySetInnerHTML` is used! Yay!',
            '\n* :scissors: Modern :clipboard:'
        ].join('')

        return <Markdown source={markdownSrc} />;
    }


    render() {
        let coverID = covers[Math.floor(Math.random() * coverCount)]//this.props.src
        let userThumb = thumbs[Math.floor(Math.random() * thumbs.length)]

        let pills;
        if (this.props.value.tags) {
            let tags = this.props.value.tags.split(', ');
            pills = tags.map((tag,i) =>
                <li2 key={i}><p className="word" onClick={this._handleTag.bind(this)}>{tag}</p></li2>
            );
        }
        // <FlatButton style={Style.itemTag} label={tag} onTouchTap={this._handleTag.bind(this)} />

        return (

            <div className="itemC">
                <Card className="itemBox">
                    <div className="itemBox-Img">

                        <img className="itemBox-Img-cover" id="im-user-id" src={coverID} onClick={this._handleDetail.bind(this)} />
                        <img className="itemBox-Img-author" id="123456789" src={userThumb} onClick={this._handleAuthor.bind(this)} />

                        <br /><br />
                    </div>

                    <CardTitle title={this.props.value.name} subtitle={parseFloat(this.props.value.alcohol)} />

                    <div style={{ paddingLeft: 10, paddingTop: -100, paddingBottom: 15, }}>
                        {this._markdownHtml()}
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

export default ItemCard;
