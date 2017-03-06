import React from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import covers from './../../util/setting'

const coverCount = covers.length
const coverHeight = 200
const _style = {
    item: {
        minWidth: 258,
        maxWidth: 318,
        minHeight: 518,
        overflowY: 'auto',
        padding: 6,
    },
    itemCover: {
        height: coverHeight,
        width: '100%',
        cursor: 'pointer',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemAuthor: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: coverHeight - 20,
        left: 10,
        color: '#4CAF50',
        borderRadius: 30
    },
    itemTag: {
        color: '#00838F',
        border: '1px solid #00838F'
    },
    itemTest: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
    },
};

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


    _handleAuthor(e) {
        this.props.onClick("Author-", e.target.id)
    };

    _handleDetail(e) {
        this.props.onClick("Detail-"+e.target.id, e.target.src)
    };


    render() {
        let coverID = covers[Math.floor(Math.random() * coverCount)]//this.props.src
        let userThumb = "http://www.material-ui.com/images/jsa-128.jpg"

        let pills;
        if (this.props.value.tags) {
            let tags = this.props.value.tags.split(', ');
            pills = tags.map(tag =>
                <FlatButton style={_style.itemTag} label={tag} />
            );
        }

        return (

            <div style={_style.item} >
                <Card className="itemCSS">
                    <div style={{ position: 'relative' }}>

                        <img id="im-user-id" style={_style.itemCover} src={coverID} onClick={this._handleDetail.bind(this)} />


                        <img style={_style.itemAuthor} src={userThumb} id="123456789"
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
