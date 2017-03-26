import React from 'react';
import ReactDOM from 'react-dom';
import * as act from './../action';

import Recommend from './recommend';
import ListC from './list';


export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            channel: { type: act.Action_Channel_Type_Github, data: [0, 8], filter: "javascript" },
            willNeedUpdate: false,
        };

        this.state.channel = props.channel;
    }

    componentWillReceiveProps(nextProps) {
        // alert("componentWillReceiveProps - " + nextProps.channel.type)
        this.state.willNeedUpdate = false;
        if (this.state.channel.type !== nextProps.channel.type) {
            this.state.channel = nextProps.channel;
            this.state.willNeedUpdate = true;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        return this.state.willNeedUpdate;
    }



    render() {
        let _channel = this.state.channel;
        return (
            <div className='root-body'>
                <ListC channel={_channel} />
                <br />
                <Recommend value={0} />
            </div>
        );
    }
};

