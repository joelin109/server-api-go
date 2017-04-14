import React from 'react'
import { Drawer, Divider, IconMenu, IconButton, MenuItem } from 'material-ui';
import { TextField, RadioButtonGroup, RadioButton, Slider, Toggle, Checkbox } from 'material-ui';
import * as act from './../../setting/action'
import { Button, Icon, SIcon } from './../../component/wui'
import { Editor } from 'react-draft-wysiwyg';


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
        this._handle_type_choose = this._handle_type_choose.bind(this);
        this._handle_sex_choose = this._handle_sex_choose.bind(this);
        this._handle_togle_regel = this._handle_togle_regel.bind(this);
        this._handle_togle_recommend = this._handle_togle_recommend.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);


    }

    componentWillReceiveProps(nextProps) {
        this.state.open = nextProps.open;
    }

    onEditorStateChange(value) {

    }

    //Add or edit the word info.
    _handle_type_choose(event, value) {

    }

    _handle_sex_choose(event, value) {

    }
    _handle_togle_regel(event, value) {
        //this.setState({ unRegel: value });
    };
    _handle_togle_recommend(event, value) {
        //this.setState({ recommend: value });
    };


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

    render() {

        let _className = this._isSafari() === false ? 'draw-detail-root' : '';
        let _classNameHeader = this.state.open ? 'draw-detail-root-container-header' : '';
        if (this.state.open === false) {
            return (<div></div>);
        }

        let _detail = this.props.source;
        let _haveSex = (this.state.type === 'n');
        let _regelIcon = <SIcon id="add_alert" selected />

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

                    <div className='draw-detail-root-container-box'>
                        <div className='draw-detail-root-container-box-word'>
                            <TextField
                                className="root-text-field"
                                hintText="..."
                                floatingLabelText="Word"
                                floatingLabelFixed={true}
                            />
                            <TextField
                                className="root-text-field"
                                hintText="."
                                floatingLabelText="Plural"
                                floatingLabelFixed={true}
                            />
                            <TextField
                                className="root-text-field"
                                hintText="."
                                floatingLabelText="Zh"
                                floatingLabelFixed={true}
                            />
                            <div className="draw-content-line">
                                <p className="draw-content-text-title">Sex:&nbsp;&nbsp;</p>
                                <RadioButtonGroup
                                    className="draw-dialog-radio-group"
                                    onChange={this._handle_sex_choose}
                                    name="shipSpeed"
                                    defaultSelected={this.state.sex}>

                                    <RadioButton className="popup-dialog-radio"
                                        value="der"
                                        label="der"
                                        disabled={!_haveSex}
                                    />
                                    <RadioButton className="popup-dialog-radio"
                                        value="die"
                                        label="die"
                                        disabled={!_haveSex}
                                    />
                                    <RadioButton className="popup-dialog-radio"
                                        value="das"
                                        label="das"
                                        disabled={!_haveSex}
                                    />
                                    <RadioButton className="popup-dialog-radio"
                                        value="-"
                                        label="-"
                                        disabled={!_haveSex}
                                    />
                                </RadioButtonGroup>
                            </div>
                            <div className="draw-content-line">
                                <p className="draw-content-text-title">Type:</p>
                                <RadioButtonGroup className="draw-dialog-radio-group" onChange={this._handle_type_choose}
                                    name="shipSpeed" defaultSelected={this.state.type}>

                                    <RadioButton className="popup-dialog-radio"
                                        value="v"
                                        label="v"
                                    />
                                    <RadioButton className="popup-dialog-radio"
                                        value="n"
                                        label="n"
                                    />
                                    <RadioButton className="popup-dialog-radio"
                                        value="adj"
                                        label="adj"
                                    />
                                    <RadioButton className="popup-dialog-radio"
                                        value="-"
                                        label="-"
                                    />
                                </RadioButtonGroup>
                            </div>

                            <div className="draw-content-line">
                                <TextField
                                    className="root-text-field"
                                    hintText="."
                                    floatingLabelText="En"
                                    floatingLabelFixed={true}
                                />
                                <Checkbox
                                    className="draw-content-check-regel"
                                    label="regel"
                                    defaultChecked={true}
                                    onCheck={this._handle_togle_regel}
                                />
                                <Toggle
                                    className="root-text-toggle"
                                    name="Recommend"
                                    label="Recommend:"
                                    defaultToggled={this.state.recommend}
                                    onToggle={this._handle_togle_recommend}
                                />
                            </div>
                            <div className="draw-content-draft">
                                <p className="draw-content-text-title">Example:</p>
                                <Editor
                                    toolbarClassName="home-toolbar"
                                    wrapperClassName="home-wrapper"
                                    editorClassName="home-editor"
                                    onEditorStateChange={this.onEditorStateChange}
                                />
                            </div>

                        </div>
                    </div>
                </Drawer>
            </div>
        )
    }
}