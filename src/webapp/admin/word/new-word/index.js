import React from 'react'
import { Drawer } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import { FloatingButton } from './../../../component/wui'
import * as act from './../../../setting/action'
import WordHeader from './word-header'
import WordTabBasic from './word-tab-basic'
import WordTabDesc from './word-tab-content-editor'
import WordTabContentHtml from './word-tab-content-html'
import WordTabContentPreview from './word-tab-content-preview'
import * as convert from './word-convert'
import * as util from './../../../util'


export default class NewWord extends React.Component {
    constructor(props) {
        super(props);

        let _html = '...';
        this.state = {
            open: props.open,
            source: {},
            editorHtml: _html,
            editorContent: convert.toEditorContent(_html),
            editorChange: false,

            tabIndex: 0,
            type: '-',
            sex: '-',
            unRegel: false,
            recommend: false,

        };

        this._dispatch_header = this._dispatch_header.bind(this);
        this._dispatch_tab_basic = this._dispatch_tab_basic.bind(this);
        this._handle_tab_editor = this._handle_tab_editor.bind(this);
        this._handle_tab_html = this._handle_tab_html.bind(this);
        this._handle_tab_preview = this._handle_tab_preview.bind(this);
        this._dispatch_tab_content_editor = this._dispatch_tab_content_editor.bind(this);
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

    _handle_tab_editor(tab) {
        this.setState({ tabIndex: 1 })
    }
    _handle_tab_html(tab) {
        this.setState({ tabIndex: 2 })
    }
    _handle_tab_preview(tab) {
        this.setState({ tabIndex: 3 })
    }

    _dispatch_tab_basic(action) {

    }

    _dispatch_tab_content_editor(action) {
        if (action.type !== 'componentDidUpdate') {
            let _editorContent = action.data;
            this.state.editorContent = _editorContent;
            this.state.editorHtml = convert.toHtml(_editorContent);
        }

        this.state.editorChange = false;
    }

    _dispatch_tab_content_html(action) {
        let _html = action.data;
        this.state.editorHtml = _html;
        this.state.editorContent = convert.toEditorContent(_html);
        this.state.editorChange = true;
    }

    _dispatch_tab_content_preview(tab) {
    }


    render() {

        let _className = util.isSafari() === false ? 'draw-detail-root color-dark' : '';
        let _classNameHeader = this.state.open ? 'draw-detail-root-container-header-admin limit-808' : '';
        if (this.state.open === false) {
            return (<div></div>);
        }

        return (
            <div>
                <Drawer
                    className={_className}
                    containerClassName="limit-808"
                    width={808}
                    open={this.state.open} docked={false}
                >
                    <div className={_classNameHeader}>
                        <WordHeader dispatch={this._dispatch_header} />
                    </div>

                    <div className="draw-detail-root-container-main">
                        <div className="draw-detail-tab-container">
                            <Tabs className="draw-detail-tab">
                                <Tab label="Basic Info">
                                    <WordTabBasic source={this.props.source} dispatch={this._dispatch_tab_basic} />
                                </Tab>

                                <Tab label="Description" onActive={this._handle_tab_editor}>
                                    <WordTabDesc
                                        source={this.state.editorContent} change={this.state.editorChange}
                                        dispatch={this._dispatch_tab_content_editor}
                                    />
                                </Tab>

                                <Tab label="Html" onActive={this._handle_tab_html}>
                                    <WordTabContentHtml
                                        source={this.state.editorHtml}
                                        dispatch={this._dispatch_tab_content_html}
                                    />
                                </Tab>

                                <Tab label="Preview" onActive={this._handle_tab_preview}>
                                    <WordTabContentPreview source={this.state.editorHtml} />
                                </Tab>
                            </Tabs>
                        </div>

                    </div>

                    <div>
                        <FloatingButton onTouchTap={this._dispatch_close} />
                    </div>
                </Drawer>
            </div>
        )
    }
}