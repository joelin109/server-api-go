import React from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import staticData from './../../util/setting'
import Style from './../../util/style'
var Markdown = require('react-markdown');

const covers = staticData[0]
const thumbs = staticData[1]
const coverCount = covers.length

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
        this.props.dispatch("Author-", e.target.id)
    };

    _handleDetail(e) {
        this.props.dispatch("Detail-" + e.target.id, e.target.src)
    };

    _handleTag(e) {
        this.props.dispatch({ type: "tag" }, e.target.innerHTML)
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
            pills = tags.map(tag =>
                <FlatButton style={Style.itemTag} label={tag} onTouchTap={this._handleTag.bind(this)} />
            );
        }

        return (

            <div className="itemC">
                <Card className="itemBox">
                    <div className="itemBox-Img">

                        <img className="itemBox-Img-cover" id="im-user-id" src={coverID} onClick={this._handleDetail.bind(this)} />
                        <img className="itemBox-Img-author" id="123456789" src={userThumb} onClick={this._handleAuthor.bind(this)} />

                        <br /><br />
                    </div>

                    <CardTitle title={this.props.value.name} subtitle={parseFloat(this.props.value.alcohol)} />

                    <div style={{ paddingLeft: 10, paddingTop: -100, paddingBottom: 15,}}>
                        {this._markdownHtml()}
                    </div>

                    <CardActions>
                        {pills}
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default ItemCard;
