import React from 'react'
import ReactDOM from 'react-dom'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import { AppBar, Drawer, MenuItem, Badge, FlatButton, RaisedButton, } from 'material-ui';
import HeaderRight from './nav-header-right'
import NavLeft from './nav-left'
import FilterBeer from './../popup/filter-beer'
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

    _linkHandler(type, value) {
         alert("onTitleTouchTap")
    }


    saveHandler(e) {
        alert(e.address)
    }

    cancelHandler() {
        this.setState({ accountVisible: false });
    }

    _dispatch_header_right(action, value) {
        switch (action.type) {
            case "login":
                this.setState({ accountVisible: true });
                break;
            case "filter":
                this.setState({filterVisible: true });
                break;
            default:
                break;
        }
        return false;
    }

    _dispatch_filter_beer(action, value) {

        switch (action.type) {
            case "cancel":
                this.setState({ filterVisible: false });
                break;
            case "confirm":
                this.setState({ filterVisible: false });
                this.props.onClick({type:"filter_beer"}, value)
                break;
            default:
                break;
        }
        return false;
    }

    render() {
        return (
            <div>
                <AppBar title="Joe De" zDepth={0}
                    iconElementRight={<HeaderRight onClick={this._dispatch_header_right.bind(this)} />}
                    onLeftIconButtonTouchTap={this._showDrawer.bind(this)}
                    onTitleTouchTap={this._linkHandler.bind(this)}
                    style={{ position: 'fixed', top: 0, left: 0, right: 0 }} />

                <Drawer open={this.state.drawerVisible} docked={false} onRequestChange={this._closeDrawer.bind(this)}>
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                </Drawer>
                <br />
                {this.state.accountVisible ? <NewPropertyWindow onSave={this.saveHandler.bind(this)} onCancel={this.cancelHandler.bind(this)} /> : ""}

                <FilterBeer open={this.state.filterVisible} onClick={this._dispatch_filter_beer.bind(this)} />
            </div>
        )
    }
}


export default Navigator;