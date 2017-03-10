import React from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import { FlatButton, FontIcon } from 'material-ui';
import staticData from './../../util/setting'
import Style from './../../util/style'

const covers = staticData[0]
const thumbs = staticData[1]
const coverCount = covers.length

const Action_List_Github_Repository = 'Action_Github_Repository'
const Action_List_Github_Author = 'Action_Github_Author'
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
        return false; //(this.state.total != nextProps.total);
    }


    _handleDetail(e) {
        let action = {
            type: Action_List_Github_Repository,
            data: e.target.id
        }
        this.props.dispatch(action)
    };
    _handleAuthor(e) {
        let action = {
            type: Action_List_Github_Author,
            data: e.target.id
        }
        this.props.dispatch(action)
    };

    render() {
        let coverID = covers[Math.floor(Math.random() * coverCount)] //this.props.src
        let userThumb = this.props.value.owner.avatar_url;
        let dateRange = this.props.value.created_at.substring(2, 10) + " ~ " + this.props.value.updated_at.substring(2, 10);

        let color = "#bdbdbd"
        let hoverColor = "#EF5350"
        let favorite = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>favorite</FontIcon>;
        let share = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>share</FontIcon>;
        let thumb_up = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>thumb_up</FontIcon>;

        let labelStyle = { color: '#616161', fontWeight: 'normal', };

        return (

            <div className="itemC">
                <Card className="itemBox">

                    <div className="itemBox-Img">
                        <img className="itemBox-Img-cover" id={this.props.value.html_url} src={coverID}
                            onClick={this._handleDetail.bind(this)} />

                        <img className="itemBox-Img-author" id={this.props.value.owner.html_url} src={userThumb}
                            onClick={this._handleAuthor.bind(this)} />

                        <label style={Style.itemDate}>{dateRange}</label>
                    </div>
                    <br />

                    <div className="itemBox-Text">
                        <p className="itemBox-Text-title"><a href={this.props.value.html_url} target="_blank">{this.props.value.name}</a></p>
                        <p className="itemBox-Text-subTitle">{dateRange}</p>
                        <p className="itemBox-Text-text"> {this.props.value.description}</p>
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