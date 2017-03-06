import React from 'react';
import ReactDOM from 'react-dom';

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
        background: '#BDBDBD',
        padding: 6,
    },
    test2: {
        height: 520,
        width: 320,
        background: '#757575',
        padding: 6,
    },
    test3: {
        height: 520,
        width: 320,
        background: '#616161',
        padding: 6,
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