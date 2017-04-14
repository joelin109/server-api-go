//this.state.scrollToY = window.pageYOffset;
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as act from './setting/action';
import Header from './component/header';
import AdminList from './admin/admin-list';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { appTheme } from './theme'


class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            previousLocation: props.location,
        }
    }

    componentDidMount() {
    }

    componentWillUpdate(nextProps) {
        const { location } = this.props
        if (nextProps.history.action !== 'POP' &&
            (!location.state || !location.state.modal)) {

            this.state.previousLocation = this.props.location
        }
    }


    //Dispatch
    _dispatch_header_navigator(action) {
        switch (action.type) {
            case act.Action_Filter_List_Article_Confirm:
                alert(action.data)
                break;

            case act.Action_Admin_Channel_Type_Word:
                //this.setState({ channel: action });
                this._dispatch_route_link_to(action)
                break;

            case act.Action_Admin_Channel_Type_Article:
                this._dispatch_route_link_to(action)
                break;

            case act.Action_Header_Right_Auth:
                let _link = window.location.href.replace("admin.html", "index.html");
                window.open(_link, '_blank');
                break;

            default:
                break;
        }
        return false;
    }


    //for Testing
    _dispatch_route_link_to(action) {
        let _types = action.type.split("_");
        let _type = _types[_types.length - 1].toLowerCase();
        let _link = `/admin?_t=${_type}`;

        switch (action.type) {
            case act.Action_Channel_Type_Word:
                _link = `/deutsch?_t=${_type}`;
                break;

            case act.Action_Channel_Type_Article:
                _link = `/article?_s=${_type}`;
                break;

            case act.Action_Admin_Channel_Type_Word:
                _link = `/admin?_t=${_type}`;
                break;

            default:
                break;
        }

        let _link_to = {
            pathname: _link,
            state: {
                channel: action
            }
        }
        this.props.history.push(_link_to)
    }



    render() {

        return (
            <div >
                <Header title="Title" dispatch={this._dispatch_header_navigator.bind(this)} />
                <div className='root'>
                    <div className='root-body'>
                        <div className='root-list'>

                            <Switch>
                                <Route exact path='/' component={AdminList} />
                                <Route path='/admin?_t=:channel' component={AdminList} />
                            </Switch>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
};


class AdminIndex extends React.Component {

    _getBaseName() {

        let _basename = '';
        let _href = window.location.href;
        if (_href.toLowerCase().indexOf("e://") > 0) {
            window.location.hash = '/';
            _basename = window.location.href.replace("file://", "");
        }
        return _basename;
    }

    render() {
        let _basename = this._getBaseName()

        return (
            <div>
                <MuiThemeProvider muiTheme={appTheme} >

                    <Router basename={_basename}>
                        <Route name="main" path="/" component={Admin}>
                        </Route>
                    </Router>

                </MuiThemeProvider>
            </div>
        );
    }
};

ReactDOM.render(<AdminIndex />, document.getElementById("main"));