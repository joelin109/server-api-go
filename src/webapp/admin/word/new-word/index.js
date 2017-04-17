import React from 'react'
import { Drawer } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import { FloatingButton } from './../../../component/wui'
import * as act from './../../../setting/action'
import * as util from './../../../util'
import WordHeader from './word-header'
import WordTabBasic from './word-tab-basic'
import RichTextEditor from './../../editor/'


export default class NewWord extends React.Component {
    constructor(props) {
        super(props);

        let _html = '...';
        this.state = {
            open: props.open,
            source: {},
            editorHtml: _html,

            tabIndex: 0,
            type: '-',
            sex: '-',
            unRegel: false,
            recommend: false,

        };

        this._dispatch_header = this._dispatch_header.bind(this);
        this._handle_tab_desc = this._handle_tab_desc.bind(this);
        this._dispatch_tab_basic = this._dispatch_tab_basic.bind(this);
        this._dispatch_tab_desc = this._dispatch_tab_desc.bind(this);


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

    _handle_tab_desc(tab) {
        // this.setState({ tabIndex: 1 })
    }

    _dispatch_tab_basic(action) {

    }

    _dispatch_tab_desc(action) {

    }

    render() {

        let _className = util.isSafari() === false ? 'draw-detail-root color-dark' : '';
        let _classNameHeader = this.state.open ? 'w-limit-xx8' : '';
        if (this.state.open === false) {
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
                        <WordHeader dispatch={this._dispatch_header} />
                    </div>

                    <div className="draw-detail-root-container w-limit-808">
                        <div className="draw-detail-tab-container">
                            <Tabs className="draw-detail-tab">
                                <Tab label="Basic Info">
                                    <WordTabBasic
                                        source={this.props.source}
                                        dispatch={this._dispatch_tab_basic}
                                    />
                                </Tab>

                                <Tab label="Description" onActive={this._handle_tab_desc}>
                                    <RichTextEditor
                                        source={this.state.editorContent}
                                        dispatch={this._dispatch_tab_desc}
                                    />
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