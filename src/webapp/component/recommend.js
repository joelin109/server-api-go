import React from 'react';
import ReactDOM from 'react-dom';
import { cyan800, grey900, grey300, grey400 } from 'material-ui/styles/colors';

const _style = {
    test: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
    },
    test1: {
        height: 220,
        width: 320,
        background: '#424242', //cyan800,//'#BDBDBD',
        padding: 3,
    },
    test2: {

        width: 320,
        //background: '#616161', //#107A7B',//#757575',#007E70
        padding: 2,
    },
    test3: {

        width: 320,
        //background: '#757575',//#616161',
        padding: 2,
    },

    test4: {
        //height: 220,
        width: 320,
        //background: '#9E9E9E',//#616161',
        padding: 2,
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
        let demo1_src = 'asset/img/demo-chart11.png';
        let demo2_src = 'asset/img/demo-chart12.png';
        let demo3_src = 'asset/img/demo-chart13.png';
        return (
            <div className="recommend">
                <div style={_style.test2}>
                    <img className="recommend-1-img" src={demo1_src} />
                </div>
                <br />

                <div style={_style.test3}>
                    <img className="recommend-2-img" src={demo2_src} />
                </div>

                <br />
                <div style={_style.test4}>
                    <img className="recommend-2-img" src={demo3_src} />
                </div>
            </div>
        );
    }
};

export default Recommend;