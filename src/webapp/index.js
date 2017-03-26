import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from './app';
import { appTheme } from './theme'

class Index extends React.Component {
    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={appTheme} >
                    <App />
                </MuiThemeProvider>
            </div>
        );
    }
};

ReactDOM.render(<Index />, document.getElementById("main"));