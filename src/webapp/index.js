import React from 'react'
import { ReactDOM, render } from 'react-dom';
import {
    BrowserRouter as Router, Route, browserHistory
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from './app';
import { appTheme } from './theme'
//import Home from './Component/home';
//import AdminList from './admin/admin-list';

class Index extends React.Component {

    _getBaseName() {

        let _basename = '';
        let _href = window.location.href
        if (_href.indexOf("e://") > 0) {
            window.location.hash = '/';
            _basename = window.location.href.replace("file://", "");
        }
        return _basename;
    }

    render() {
        let _basename = this._getBaseName()

        return (
            <div>

                <Router basename={_basename}>
                    <MuiThemeProvider muiTheme={appTheme} >
                        <Route name="main" path="/" component={App}>
                        </Route>
                    </MuiThemeProvider>
                </Router>

            </div>
        );
    }
};

render(<Index />, document.getElementById("main"));