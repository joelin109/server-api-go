
import React from 'react'
import ReactDOM from 'react-dom'
import { Drawer, Divider, MenuItem, Avatar, FlatButton, RaisedButton, FontIcon } from 'material-ui';
import ListItem from 'material-ui/List/ListItem';
import * as act from './../setting/action'
import { Button } from './../component/wui'

/* Modified for Drawer
width: this.props.width < 1024 ? this.props.width || theme.width : '100%',
left: this.props.width < 1024 ? 0 : 'auto',
top: this.props.open ? 0 : -10000,
*/

class DetailGeek extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: '',
            open: false,
        };

        this.state.open = props.open;
    }


    componentWillReceiveProps(nextProps) {
        this.state.open = nextProps.open;
    }

    handleOpen() {
        this.setState({ open: true });
    };

    _dispatch_left_channel(actionType) {
        this.props.dispatch({ type: actionType });
    }

    _dispatch_close() {
        //this._dispatch_left_channel(act.Action_Admin_Channel_Type_Close);
        this.setState({ open: false });
        return false;
    }

    _dispatch_left_channel_word() {
        this._dispatch_left_channel(act.Action_Admin_Channel_Type_Word);
        return false;
    }

    _dispatch_left_channel_article() {
        this._dispatch_left_channel(act.Action_Admin_Channel_Type_Article);
        return false;
    }

    _fontIcon(id, color = '#757575') {
        let _hoverColor = "#EF5350"
        return <FontIcon className="material-icons" color={color} hoverColor={_hoverColor}>{id}</FontIcon>;
    }
    render() {
        let _className = 'draw-detail-root';
        let _classNameHeader = this.state.open ? 'draw-detail-root-container-header' : '';
        if (this.state.open) {
            let browser = navigator.appName;
            let b_version = navigator.appVersion.toLowerCase();
            if (b_version.indexOf("applewebkit") > 0 && b_version.indexOf("chrome/") <= 0) {
                _className = '';
            }

        }
        return (
            <div>
                <Drawer
                    className={_className}
                    containerClassName="draw-detail-root-container"
                    width={1024}
                    open={this.state.open} docked={false}
                    onRequestChange={this._dispatch_close.bind(this)}>
                    <div className={_classNameHeader}>
                        <Button id={'arrow_back'} onTouchTap={this._dispatch_close.bind(this)} />
                        <ListItem className = "draw-detail-root-container-header-thumb"
                            leftAvatar={<Avatar src="http://www.material-ui.com/images/uxceo-128.jpg" />}
                        >
                            AuthorName
                        </ListItem>
                        <Button id={'refresh'} onTouchTap={this._dispatch_close.bind(this)} />
                    </div>
                    <Divider />
                    <div className='draw-detail-root-container-body'>
                        fdgd
                    </div>
                    <Divider />
                    jnfdkjhngjfdnghjdfhgnjfdjkhg

                </Drawer>
            </div>
        )
    }
}


export default DetailGeek;