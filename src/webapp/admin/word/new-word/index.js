import React from 'react'
import { Drawer } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';

import * as act from './../../../setting/action'
import WordHeader from './word-header'
import WordTabBasic from './word-tab-basic'
import WordTabDesc from './word-tab-content-editor'
import WordTabContentHtml from './word-tab-content-html'
import WordTabContentPreview from './word-tab-content-preview'
import * as convert from './word-convert'


export default class NewWord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            tabIndex: 0,
            source: {},
            editorContent: convert.toEditorContent('...'),
            actionValue: 1,
            type: '-',
            sex: '-',
            unRegel: false,
            recommend: false,
            stepIndex: 0,
        };

        this._dispatch_header = this._dispatch_header.bind(this);
        this._dispatch_tab_basic = this._dispatch_tab_basic.bind(this);
        this._dispatch_tab_content_editor = this._dispatch_tab_content_editor.bind(this);
        this._dispatch_tab_html = this._dispatch_tab_html.bind(this);
        this._dispatch_tab_content_html = this._dispatch_tab_content_html.bind(this);
        this._dispatch_tab_content_preview = this._dispatch_tab_content_preview.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.state.open = nextProps.open;
    }

    onEditorStateChange(value) {

    }

    //Action for menu
    _dispatch_header(action) {
        //this._dispatch_left_channel(act.Action_Admin_Channel_Type_Close);
        this.setState({ open: false });
        return false;
    }
    _dispatch_close(action) {
        //this._dispatch_left_channel(act.Action_Admin_Channel_Type_Close);
        this.setState({ open: false });
        return false;
    }

    _dispatch_tab_basic(action) {

    }

    _dispatch_tab_content_editor(action) {
        this.state.editorContent = action.data;
    }

    _dispatch_tab_html(tab) {
        this.setState({ tabIndex: 2 })
    }

    _dispatch_tab_content_html(action) {
        let _editorContent = convert.toEditorContent(action.data);
        this.setState({ editorContent: _editorContent })
    }

    _dispatch_tab_content_preview(tab) {
        this.setState({ tabIndex: 3 })
    }

    _isSafari() {
        let browser = navigator.appName;
        let _version = navigator.appVersion.toLowerCase();
        return _version.indexOf("applewebkit") > 0 && _version.indexOf("chrome/") <= 0;
    }

    render() {

        let _className = this._isSafari() === false ? 'draw-detail-root' : '';
        let _classNameHeader = this.state.open ? 'draw-detail-root-container-header' : '';
        if (this.state.open === false) {
            return (<div></div>);
        }

        let _html = convert.toHtml(this.state.editorContent);
        return (
            <div>
                <Drawer
                    className={_className}
                    containerClassName="draw-detail-root-container"
                    width={768}
                    open={this.state.open} docked={false}
                    >

                    <div className={_classNameHeader}>
                        <WordHeader dispatch={this._dispatch_header} />
                    </div>

                    <div className="draw-detail-root-container-body">
                        <Tabs className="draw-detail-tab" contentContainerClassName="draw-detail-tab-box">
                            <Tab label="Basic Info">
                                <WordTabBasic source={this.props.source} dispatch={this._dispatch_tab_basic} />
                            </Tab>

                            <Tab label="Description">
                                <WordTabDesc source={this.props.editorContent} dispatch={this._dispatch_tab_content_editor} />
                            </Tab>

                            <Tab label="Html"
                                onActive={this._dispatch_tab_html}>
                                <WordTabContentHtml
                                    source={_html}
                                    dispatch={this._dispatch_tab_content_html}
                                />
                            </Tab>
                            <Tab label="Preview"
                                onActive={this._dispatch_tab_content_preview}>
                                <WordTabContentPreview source={ _html} />
                            </Tab>
                        </Tabs>
                    </div>
                </Drawer>
            </div>
        )
    }
}