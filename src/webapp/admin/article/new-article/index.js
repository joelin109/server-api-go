import React from 'react'
import * as service from './../../../service/article';
import { Drawer } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import { FloatingButton } from './../../../component/wui'
import * as act from './../../action'
import * as util from './../../../util'
import DetailHeader from './../../detail-header'
import ArticleTabBasic from './article-tab-basic'
import RichTextEditor from './../../editor/'
import * as convert from './../../editor/e-convert'


export default class NewArticle extends React.Component {
    constructor(props) {
        super(props);

        let _html = '<p></p><img src="https://cdn.arstechnica.net/wp-content/uploads/2016/09/Colossal-1-760x380.jpg " style="float:none;height: auto;width: 100%"/>';
        this.state = {
            open: props.open,
            source: props.source,
            editorHtml: _html,
            editorContent: convert.toEditorContent(_html),
            willSave: false,

            tabIndex: 1,
            type: '-',
            sex: '-',
            unRegel: false,
            recommend: false,

        };

        //this.state.editorContent = _contentState;


        this._handle_tab_save = this._handle_tab_save.bind(this);
        this._handle_tab_basic = this._handle_tab_basic.bind(this);
        this._handle_tab_desc = this._handle_tab_desc.bind(this);
        this._dispatch_header = this._dispatch_header.bind(this);
        this._dispatch_tab_basic = this._dispatch_tab_basic.bind(this);
        this._dispatch_tab_desc = this._dispatch_tab_desc.bind(this);


    }

    componentWillReceiveProps(nextProps) {
        this.state.open = nextProps.open;
        this.state.source = nextProps.source;
    }


    _save() {
        let _data = this.state.source;
        _data.body_text = this.state.editorHtml;

        service.update(_data)
            .then(data => {

                alert('save successful')
            });

    }

    _handle_tab_save() {
        this.setState({ willSave: true });
        return false;
    }

    _handle_tab_basic(tab) {
        this.state.tabIndex = 1;
        this.setState({ willSave: false });
    }

    _handle_tab_desc(tab) {
        this.state.tabIndex = 2;
        this.setState({ willSave: false });
    }


    //Action for menu
    _dispatch_header(action) {
        this.state.willSave = false;

        switch (action.type) {
            case act.Action_Handle_Cancel:
                this.setState({ open: false });
                break;

            case act.Action_Handle_Save:
                this._save();
                break;

            default:
                break;
        }

        return false;
    }

    _dispatch_tab_basic(action) {
        switch (action.type) {
            case act.Action_Handle_Save:
                this.state.source = action.data;
                //alert(this.state.source.title)
                break;

            default:
                break;
        }

    }

    _dispatch_tab_desc(action) {
        switch (action.type) {
            case act.Action_Handle_Save:
                this.state.editorContent = action.data;
                this.state.editorHtml = convert.toHtml(action.data);
                //alert(this.state.editorHtml)
                break;

            default:
                break;
        }

    }

    render() {
        let _blank = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
        let _className = util.isSafari() === false ? 'draw-detail-root color-dark' : '';
        let _classNameHeader = this.state.open ? 'w-limit-xx8' : '';
        if (this.state.open === false) {
            this.state.tabIndex = 1;
            return (<div></div>);
        }

        return (
            <div>
                <Drawer
                    className={_className}
                    containerClassName="w-limit-808"
                    width={808}
                    open={this.state.open} docked={false}
                >

                    <div className={_classNameHeader}>
                        <DetailHeader dispatch={this._dispatch_header} />
                    </div>

                    <div className="draw-detail-root-container w-limit-808">
                        <div className="draw-detail-tab-container">
                            <Tabs className="draw-detail-tab">
                                <Tab label="Basic Info" onActive={this._handle_tab_basic}>
                                    <ArticleTabBasic
                                        source={this.state.source}
                                        dispatch={this._dispatch_tab_basic}
                                        onSave={this.state.willSave}
                                    />
                                </Tab>

                                <Tab label="Description" onActive={this._handle_tab_desc}>
                                    <RichTextEditor
                                        show={this.state.tabIndex === 2}
                                        source={this.state.editorContent}
                                        dispatch={this._dispatch_tab_desc}
                                        onSave={this.state.willSave}
                                    />
                                </Tab>
                                <Tab label="Preview &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" onActive={this._handle_tab_desc}>

                                </Tab>
                            </Tabs>
                        </div>

                    </div>

                    <div>
                        <FloatingButton onTouchTap={this._handle_tab_save} />
                    </div>
                </Drawer>
            </div>
        )
    }
}