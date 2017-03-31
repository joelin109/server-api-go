import React from 'react'
import ReactDOM from 'react-dom'
import { Drawer, Divider, MenuItem, Badge, FontIcon } from 'material-ui';
import * as act from './../../setting/action'

class NavLeft extends React.Component {
    constructor() {
        super();
        this.state = {
            login: true,
            channel: '',
        };
    }



    _dispatch_left_channel(actionType) {
        this.props.dispatch({ type: actionType });
    }

    _dispatch_close() {
        this._dispatch_left_channel(act.Action_Admin_Channel_Type_Close);
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
        return (
            <div>
                <Drawer
                    open={this.props.open} docked={false} 
                    onRequestChange={this._dispatch_close.bind(this)}>
                    <div className='nav-left-header'></div>
                    <Divider />
                    <MenuItem leftIcon={this._fontIcon('dashboard')}>Dashboard</MenuItem>
                    <Divider />
                    <MenuItem leftIcon={this._fontIcon('people')}>Account</MenuItem>
                    <MenuItem leftIcon={this._fontIcon('visibility')}>Channel</MenuItem>
                    <MenuItem leftIcon={this._fontIcon('flag')}>Tag</MenuItem>
                    <Divider />
                    <MenuItem leftIcon={this._fontIcon('local_library')} onTouchTap={this._dispatch_left_channel_article.bind(this)}>Article</MenuItem>
                    <MenuItem leftIcon={this._fontIcon('text_fields')} onTouchTap={this._dispatch_left_channel_word.bind(this)}>Word</MenuItem>
                    <Divider />
                    <MenuItem leftIcon={this._fontIcon('settings')}>Setting</MenuItem>
                    <MenuItem leftIcon={this._fontIcon('settings_power')}>Logout</MenuItem>

                </Drawer>
            </div>
        )
    }
}


export default NavLeft;
