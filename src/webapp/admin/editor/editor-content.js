import React from 'react'
import * as act from './../../setting/action'
import { Button, FloatingButton } from './../../component/wui'
import { Editor } from 'react-draft-wysiwyg';

export default class EditorContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: {},
            value: '',
            editorContents: {},

        };
    
        this._setEditorContent(props.source);

        this._dispatch_editor_change = this._dispatch_editor_change.bind(this);
        this._dispatch_editor_save = this._dispatch_editor_save.bind(this);
        this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.change) {
            this._setEditorContent(nextProps.source)
        }

    }
    componentDidUpdate() {

        let _action = {
            type: 'componentDidUpdate',
            data: this.state.editorContents[0]
        };

        this.props.dispatch(_action);
    }

    _setEditorContent(source) {
        let editorContent = source;

        let editorContents = this.state.editorContents;
        editorContents[0] = editorContent;
        editorContents = [...editorContents];

        this.setState({
            editorContents,
        });
    }

    _dispatch_editor_change(index, editorContent) {
        let editorContents = this.state.editorContents;
        editorContents[index] = editorContent;
        editorContents = [...editorContents];

        this.setState({
            editorContents,
        });

    }

    uploadImageCallBack(file) {

    }
    _dispatch_editor_save() {
        //let _html = convert.toHtml(this.state.editorContents[0]);
        //alert(_html)

        let _action = {
            type: '',
            data: this.state.editorContents[0]
        };
        this.props.dispatch(_action);
    }


    render() {

        return (
            <div className="draw-detail-tab-content-editor">
                <div className="draw-detail-tab-content-editor-box">
                    <Editor
                        hashtag={{}}
                        editorState={this.state.editorContents[0]}
                        onEditorStateChange={this._dispatch_editor_change.bind(this, 0)}
                        toolbarClassName="demo-toolbar"
                        wrapperClassName="demo-wrapper-wide"
                        editorClassName="demo-editor"
                        toolbar={{
                            options: ['inline', 'blockType', 'fontFamily', 'list', 'textAlign', 'history', 'link', 'image', 'emoji', 'colorPicker'],
                            inline: {
                                options: ['bold', 'italic', 'strikethrough'],
                            },
                            fontFamily: {
                                options: ['Tahoma', 'Verdana'],
                            },
                            list: {
                                options: ['unordered', 'ordered'],
                            },
                            textAlign: {
                                options: ['left', 'center', 'right', 'justify'],
                            },
                            image: { uploadCallback: this.uploadImageCallBack }
                        }}
                    />
                </div>

                <FloatingButton id="translate" className="colr-light loc-btm-4" onTouchTap={this._dispatch_editor_save} />
            </div>
        )
    }
}