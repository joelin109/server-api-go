import React from 'react'
import * as act from './../../setting/action'
import { Button } from './../../component/wui'


export default class WordTabPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: {},

        };

    }

    componentWillReceiveProps(nextProps) {
    }



    render() {

        return (
            <div className="draw-detail-content-tab-preview">

            </div>
        )
    }
}