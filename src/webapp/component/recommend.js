import React from 'react';
import ReactDOM from 'react-dom';
import {cyan800, grey900, grey300, grey400 } from 'material-ui/styles/colors';

const _style = {
    test: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
    },
    test1: {
        height: 520,
        width: 320,
        background: cyan800,//'#BDBDBD',
        padding: 3,
    },
    test2: {
        height: 520,
        width: 320,
        background: '#107A7B',//#757575',#007E70
        padding: 3,
    },
    test3: {
        height: 520,
        width: 320,
        background: '#2D2D2D',//#616161',
        padding: 3,
    },

};

class Recommend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: [0, 26]
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;//(this.state.total != nextProps.total);
    }

    render() {

        return (
            <div className="recommend">
                <div style={_style.test1}>
                </div>
                <br/> <br/>
                <div style={_style.test2}>
                </div>
                 <br/> <br/>
                <div style={_style.test3}>
                </div>
            </div>
        );
    }
};

export default Recommend;