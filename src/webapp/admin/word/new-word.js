import React from 'react'
import { Drawer, IconMenu, IconButton, MenuItem } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import * as act from './../../setting/action'
import { Button, Icon, SIcon } from './../../component/wui'

import WordTabBasic from './word-tab-basic'
import WordTabDesc from './word-tab-desc'
import WordTabPreview from './word-tab-preview'


export default class NewWord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            source: {},
            actionValue: 1,
            type: '-',
            sex: '-',
            unRegel: false,
            recommend: false,
        };

        this._dispatch_close = this._dispatch_close.bind(this);
        this._dispatch_save = this._dispatch_save.bind(this);
        this._dispatch_more = this._dispatch_more.bind(this);
        this._dispatch_tab_basic = this._dispatch_tab_basic.bind(this);
        this._dispatch_tab_desc = this._dispatch_tab_desc.bind(this);
        this._dispatch_tab_preview = this._dispatch_tab_preview.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.state.open = nextProps.open;
    }

    onEditorStateChange(value) {

    }


    //Action for menu
    _dispatch_close() {
        //this._dispatch_left_channel(act.Action_Admin_Channel_Type_Close);
        this.setState({ open: false });
        return false;
    }
    _dispatch_save() {
        //this._dispatch_left_channel(act.Action_Admin_Channel_Type_Close);

        return false;
    }
    _dispatch_more(event, value) {
        alert(value)
    }

    _isSafari() {
        let browser = navigator.appName;
        let _version = navigator.appVersion.toLowerCase();
        return _version.indexOf("applewebkit") > 0 && _version.indexOf("chrome/") <= 0;
    }

    _dispatch_tab_preview(tab) {
       
    }

    _dispatch_tab_basic(action) {

    }
    _dispatch_tab_desc(action) {

    }

    render() {

        let _className = this._isSafari() === false ? 'draw-detail-root' : '';
        let _classNameHeader = this.state.open ? 'draw-detail-root-container-header' : '';
        if (this.state.open === false) {
            return (<div></div>);
        }



        return (
            <div>
                <Drawer
                    className={_className}
                    containerClassName="draw-detail-root-container"
                    width={768}
                    open={this.state.open} docked={false}
                    onRequestChange={this._dispatch_close.bind(this)}>
                   
                    <div className={_classNameHeader}>
                        <Button id={'arrow_back'} onTouchTap={this._dispatch_close} />
                        <Button id={'add'} onTouchTap={this._dispatch_close} />
                        <Button id={'save'} onTouchTap={this._dispatch_save} />
                        <IconMenu
                            iconButtonElement={<IconButton><Icon id={'more_horiz'} /></IconButton>}
                            onChange={this._dispatch_more}
                            value={this.state.actionValue}
                            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}

                        >
                            <MenuItem value="1" primaryText="New" />
                            <MenuItem value="2" primaryText="Refresh" />
                            <MenuItem value="3" primaryText="Share" />
                        </IconMenu>
                    </div>

                    <div className="draw-detail-root-container-body">
                        <Tabs>
                            <Tab label="Basic Info" >
                                <WordTabBasic source={this.props.source} dispatch={this._dispatch_tab_basic} />
                            </Tab>
                            <Tab label="Description" >
                                <WordTabDesc source={this.props.source} dispatch={this._dispatch_tab_desc}/>
                            </Tab>
                            <Tab label="Preview" onActive={this._dispatch_tab_preview}>
                                <WordTabPreview source={this.props.source} />
                            </Tab>
                        </Tabs>
                    </div>
                </Drawer>
            </div>
        )
    }
}