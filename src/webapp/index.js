import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blueGrey500, grey800, blue900, cyan500, cyan800, grey900, grey300, grey400 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import App from './app';

const ap_bg_color = cyan800 //"#007E70"//"#2D2D2D";//#107A7B";//cyan800;
const ap_height = 44;
const appTheme = getMuiTheme({
    palette: {
        primary1Color: ap_bg_color,
        accent1Color: grey400,
        textColor: grey900,
        canvasColor: "#F5F5F5",
    },
    appBar: {
        height: ap_height,
        textColor: grey300//"#44ADCB",
    },
    svgIcon: {
        color: grey400,
    },
    icon: {
        color: grey400,
    },
    tableRow: {
        hoverColor: '#9E9E9E',
        selectedColor: '#616161',
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