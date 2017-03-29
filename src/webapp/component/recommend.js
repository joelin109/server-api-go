import React from 'react';
import ReactDOM from 'react-dom';
import { cyan800, grey900, grey300, grey400 } from 'material-ui/styles/colors';
import Widget from './widget';

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
                <div className="recommend-widget-c">
                    <Widget heading="Empfehlen" imageSrc={demo1_src} />
                </div>
                <div className="recommend-widget-c">
                    <Widget heading="Anzeige" imageSrc={demo2_src} />
                </div>
                <div className="recommend-widget-c">
                    <Widget heading="Werbung" imageSrc={demo3_src} />
                </div>
            </div>
        );
    }
};

export default Recommend;