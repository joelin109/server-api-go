import React from 'react'
import * as act from './../../../setting/action'
import { Button, FloatingButton } from './../../../component/wui'


export default class WordTabContentHtml extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: {},
            editorHtml: props.source,

        };
        this._dispatch_editor_change = this._dispatch_editor_change.bind(this);
        this._dispatch_editor_save = this._dispatch_editor_save.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.state.editorHtml = nextProps.source;
    }

    _dispatch_editor_change(event) {

        let _html = event.target.value;
        this.setState({
            editorHtml: _html
        });
    }

    _dispatch_editor_save() {

        let _action = {
            type: '',
            data: this.state.editorHtml
        };
        this.props.dispatch(_action);
    }

    render() {

        let _html = { __html: this.state.editorHtml };
        return (
            <div className="draw-detail-tab-content-html">
                <div className="draw-detail-tab-content-html-box">

                    <textarea
                        className="demo-content no-focus"
                        value={_html.__html}
                        onChange={this._dispatch_editor_change}
                    />

                </div>
                <FloatingButton
                    id="swap_horiz" className="left-b2"
                    onTouchTap={this._dispatch_editor_save} />

            </div>
        )
    }
}