import React from 'react'

import { Tabs, Tab } from 'material-ui/Tabs';
import { FloatingButton } from './../../component/wui'
import * as act from './e-action'
import * as convert from './e-convert'
import EditorContent from './editor-content'
import EditorContentHtml from './editor-content-html'
import EditorContentPreview from './editor-content-preview'



export default class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);

        let _html = '<img src="https://cdn.arstechnica.net/wp-content/uploads/2016/09/ArsColossal-640x375.jpg " style="float:none;height: auto;width: auto"/>';
        this.state = {
            open: props.open,
            source: {},
            editorHtml: _html,
            editorContent: convert.toEditorContent(_html),
            editorChange: false,
            tabIndex: 0,


        };

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




    _handle_tab_editor(tab) {
        this.setState({ tabIndex: 1 })
    }
    _handle_tab_html(tab) {
        this.setState({ tabIndex: 2 })
    }
    _handle_tab_preview(tab) {
        this.setState({ tabIndex: 3 })
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

        /* if (this.state.open === false) {
             return (<div></div>);
         }*/
        return (
            <div className="draw-detail-editor-container">
                <Tabs className="draw-detail-tab">
                    <Tab label="Editor" onActive={this._handle_tab_editor}>
                        <EditorContent
                            source={this.state.editorContent} change={this.state.editorChange}
                            dispatch={this._dispatch_tab_content_editor}
                        />
                    </Tab>

                    <Tab label="Html" onActive={this._handle_tab_html}>
                        <EditorContentHtml
                            source={this.state.editorHtml}
                            dispatch={this._dispatch_tab_content_html}
                        />
                    </Tab>

                    <Tab label="Preview" onActive={this._handle_tab_preview}>
                        <EditorContentPreview source={this.state.editorHtml} />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}