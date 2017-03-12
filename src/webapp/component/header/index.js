import React from 'react'
import ReactDOM from 'react-dom'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import { AppBar, Drawer, MenuItem, Badge, FlatButton, RaisedButton, } from 'material-ui';
import HeaderRight from './nav-header-right'
import NavLeft from './nav-left'
import FilterBeer from './../popup/filter-list-beer'
import NewPropertyWindow from './../popup/NewPropertyWindow';


class Navigator extends React.Component {
    constructor() {
        super();
        this.state = {
            drawerVisible: false,
            accountVisible: false,
            filterVisible: false,
        };
    }



    _showDrawer() {
        this.setState({ drawerVisible: true });
    }

    _closeDrawer() {
        this.setState({ drawerVisible: false });
    }


    _saveHandler(e) {
        alert(e.address)
    }

    _cancelHandler() {
        this.setState({ accountVisible: false });
    }

    _dispatch_header_title_touch(type, value) {
        window.scrollTo(0, 0);
    }

    _dispatch_header_right(action, value) {
        switch (action.type) {
            case "login":
                this.setState({ accountVisible: true });
                break;
            case "filter":
                //this.setState({ filterVisible: true });
                break;
            default:
                break;
        }
        return false;
    }

    _dispatch_filter_beer(action) {

        switch (action.type) {
            case "Action_Filter_List_Article_Confirm":
                this.props.dispatch(action)
                break;
            default:
                break;
        }
        this.setState({ filterVisible: false });
        return false;
    }

    render() {
        return (
            <div>
                <AppBar title="Joe." zDepth={0}
                    iconElementRight={<HeaderRight onClick={this._dispatch_header_right.bind(this)} />}
                    onLeftIconButtonTouchTap={this._showDrawer.bind(this)}
                    onTitleTouchTap={this._dispatch_header_title_touch.bind(this)}
                    style={{ position: 'fixed', top: 0, left: 0, right: 0 }} />

                <Drawer open={this.state.drawerVisible} docked={false} onRequestChange={this._closeDrawer.bind(this)}>
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                </Drawer>
                <br />
                {this.state.accountVisible ? <NewPropertyWindow onSave={this._saveHandler.bind(this)} onCancel={this._cancelHandler.bind(this)} /> : ""}

                <FilterBeer open={this.state.filterVisible} dispatch={this._dispatch_filter_beer.bind(this)} />
            </div>
        )
    }
}


export default Navigator;