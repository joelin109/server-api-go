import React from 'react'
import * as act from './../../setting/action'
import { Button } from './../../component/wui'
import { Editor } from 'react-draft-wysiwyg';


export default class WordTabDesc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: {},
            value: ''
        };

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.uploadImageCallBack = this.uploadImageCallBack.bind(this);

    }

    componentWillReceiveProps(nextProps) {
    }

    onEditorStateChange(value) {

    }

    uploadImageCallBack(file) {

    }

    render() {

        return (
            <div className="draw-detail-content-tab-draft">
                <div className="draw-detail-content-draft-editor">
                    <Editor
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
            </div>
        )
    }
}