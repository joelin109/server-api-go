import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blueGrey500, grey800, blue900, cyan500, cyan800, grey900 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import App from './app';

const ap_bg_color = "#107A7B";//cyan800 //"#00838F";
const ap_height = 44;
const appTheme = getMuiTheme({
    palette: {
        primary1Color: ap_bg_color,
        textColor: grey900,
    },
    appBar: {
        height: ap_height,
    },
});

class Main extends React.Component {
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

ReactDOM.render(<Main />, document.getElementById("main"));