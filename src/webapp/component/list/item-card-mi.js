import React from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import staticData from './../../util/setting'
import Style from './../../util/style'

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
        this.props.dispatch({type:"tag"}, e.target.innerHTML)
    };


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

            <div style={Style.item} >
                <Card className="itemCSS">
                    <div style={{ position: 'relative' }}>

                        <img id="im-user-id" style={Style.itemCover} src={coverID} onClick={this._handleDetail.bind(this)} />


                        <img style={Style.itemAuthor} src={userThumb} id="123456789"
                            onClick={this._handleAuthor.bind(this)} />

                        <br /><br />
                    </div>

                    <CardTitle title={this.props.value.name} subtitle={parseFloat(this.props.value.alcohol)} />

                    <div style={{ padding: 10 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi...Victotest Day in
                                t it is like to be a software engineer and the path that got her there. ................
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
