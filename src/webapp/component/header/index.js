import React from 'react'
import ReactDOM from 'react-dom'

import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import { AppBar, Drawer, FlatButton, IconButton, RaisedButton, MenuItem, IconMenu, Checkbox, Badge } from 'material-ui';
import HeaderRight from './nav-header-right'
import NavLeft from './nav-left'


class Navigator extends React.Component {
    constructor() {
        super();
        this.state = { drawerVisible: false };
        this._showDrawer = this._showDrawer.bind(this);
        this._closeDrawer = this._closeDrawer.bind(this);
    }

    _showDrawer() {
        this.setState({ drawerVisible: true });
    }

    _closeDrawer() {
        this.setState({ drawerVisible: false });
    }

    _linkHandler(e) {
        alert("onTitleTouchTap")
    }

    render() {
        return (
            <div>
                <AppBar title="Joe Lin" zDepth={2}
                    iconElementRight={<HeaderRight />}
                    onLeftIconButtonTouchTap={this._showDrawer}
                    onTitleTouchTap={this._linkHandler.bind(this)}
                    style={{ position: 'fixed', top: 0, left: 0, right: 0 }} />

                <Drawer open={this.state.drawerVisible} docked={false} onRequestChange={this._closeDrawer}>
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                </Drawer>
                <br />

            </div>
        )
    }
}


export default Navigator;