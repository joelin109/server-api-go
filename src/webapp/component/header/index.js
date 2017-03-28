import React from 'react'
import ReactDOM from 'react-dom'
import { AppBar } from 'material-ui';
import HeaderRight from './nav-header-right'
import NavLeft from './nav-left'
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
        //window.scrollTo(0, 0);
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

    _dispatch_nav_left(action) {
        this.props.dispatch(action)
        this._closeDrawer()
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

                <NavLeft open={this.state.drawerVisible} login={0}
                    dispatch={this._dispatch_nav_left.bind(this)} />

                {this.state.accountVisible ? <NewPropertyWindow onSave={this._saveHandler.bind(this)} onCancel={this._cancelHandler.bind(this)} /> : ""}

            </div>
        )
    }
}


export default Navigator;