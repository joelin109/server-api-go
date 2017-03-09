import React from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import { FlatButton, FontIcon } from 'material-ui';
import staticData from './../../util/setting'
import Style from './../../util/style'

const covers = staticData[0]
const thumbs = staticData[1]
const coverCount = covers.length

class ItemGithub extends React.Component {

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
        this.props.dispatch({ type: "github" }, e.target.id)
    };

    _handleDetail(e) {
        this.props.dispatch({ type: "github" }, e.target.id)
    };

    _handleTag(e) {
        this.props.dispatch({ type: "tag" }, e.target.innerHTML)
    };


    render() {
        let coverID = covers[Math.floor(Math.random() * coverCount)]//this.props.src
        let userThumb = this.props.value.owner.avatar_url;
        let dateRange = this.props.value.created_at.substring(2, 10) + " ~ " + this.props.value.updated_at.substring(2, 10);

        let color = "#bdbdbd"
        let hoverColor = "#EF5350"
        let favorite = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>favorite</FontIcon>;
        let share = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>share</FontIcon>;
        let thumb_up = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>thumb_up</FontIcon>;

        let labelStyle = { color: '#616161', fontWeight: 'normal', };
        let test = <a href={this.props.value.html_url} target="_blank">{this.props.value.name}</a>

        return (

            <div style={Style.item} >
                <Card className="itemCSS">
                    <div style={{ position: 'relative' }}>

                        <img id={this.props.value.html_url} style={Style.itemCover}
                            src={coverID} onClick={this._handleDetail.bind(this)} />


                        <img id={this.props.value.owner.html_url} style={Style.itemAuthor}
                            src={userThumb} onClick={this._handleAuthor.bind(this)} />

                        <label style={Style.itemDate}>{dateRange}</label>
                    </div>

                    <br /><br />

                    <CardTitle title={test} />

                    <div style={Style.itemDesc}>
                        {this.props.value.description}
                    </div>


                    <div>
                        <FlatButton icon={thumb_up} label={this.props.value.stargazers_count} labelStyle={labelStyle} />
                        <FlatButton icon={share} label={this.props.value.forks} labelStyle={labelStyle} />
                    </div>
                    <div style={{ height: 12 }}> </div>

                </Card>
            </div>
        );
    }
}

export default ItemGithub;