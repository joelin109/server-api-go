import React from 'react'
import { TextField, RadioButtonGroup, RadioButton, Toggle, Checkbox, DropDownMenu, MenuItem } from 'material-ui';
import * as act from './../../../setting/action'
import { Button, SIcon } from './../../../component/wui'


export default class ArticleTabBasic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: {},
            actionValue: 1,
            type: '-',
            sex: '-',
            unRegel: false,
            recommend: false,
        };

        this._handle_type_choose = this._handle_type_choose.bind(this);
        this._handle_sex_choose = this._handle_sex_choose.bind(this);
        this._handle_togle_regel = this._handle_togle_regel.bind(this);
        this._handle_togle_recommend = this._handle_togle_recommend.bind(this);

    }

    componentWillReceiveProps(nextProps) {

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

    _handle_status() {

    }





    render() {

        let _detail = this.props.source;
        let _haveSex = (this.state.type === 'n');
        let _regelIcon = <SIcon id="add_alert" selected />
        let _fieldClassName = 'root-text-field-full';

        return (

            <div className="draw-detail-tab-content-basic">
                <div className="draw-detail-tab-content-basic-box" tabindex="0">
                    <div className="draw-content-line">

                        <div className="itemBox-img-cover"></div>
                        <Toggle
                            className="root-text-toggle"
                            name="Recommend"
                            label="Recommend:"
                            defaultToggled={this.state.recommend}
                            onToggle={this._handle_togle_recommend}
                        />
                        Status:
                        <DropDownMenu value={'pending'} onChange={this._handle_status.bind(this)}>
                            <MenuItem value={'pending'} primaryText="Pending" />
                            <MenuItem value={'accepted'} primaryText="Accepted" />
                            <MenuItem value={'rejected'} primaryText="Rejected" />
                        </DropDownMenu>
                    </div>

                    <TextField
                        className={_fieldClassName}
                        hintText="Image link"
                        floatingLabelText="Cover Src"
                        floatingLabelFixed={true}
                    />
                    <TextField
                        className="root-text-field"
                        hintText="."
                        floatingLabelText="Cover Thumbnail Src"
                        floatingLabelFixed={true}
                    />
                    <TextField
                        className={_fieldClassName}
                        hintText="..."
                        floatingLabelText="Title"
                        floatingLabelFixed={true}
                    />
                    <TextField
                        className={_fieldClassName}
                        hintText="."
                        floatingLabelText="SubTitle"
                        floatingLabelFixed={true}
                    />
                    <div className="draw-content-line">
                        Channel:
                        <DropDownMenu value={'pending'} onChange={this._handle_status.bind(this)}>
                            <MenuItem value={'pending'} primaryText="Pending" />
                            <MenuItem value={'accepted'} primaryText="Accepted" />
                            <MenuItem value={'rejected'} primaryText="Rejected" />
                        </DropDownMenu>
                        Tag:
                           <DropDownMenu value={'pending'} onChange={this._handle_status.bind(this)}>
                            <MenuItem value={'pending'} primaryText="Pending" />
                            <MenuItem value={'accepted'} primaryText="Accepted" />
                            <MenuItem value={'rejected'} primaryText="Rejected" />
                        </DropDownMenu>
                    </div>

                    <TextField
                        className={_fieldClassName}
                        hintText="."
                        floatingLabelText="Original Resource"
                        floatingLabelFixed={true}
                    />
                    <TextField
                        className={_fieldClassName}
                        hintText="."
                        floatingLabelText="Desc"
                        floatingLabelFixed={true}
                    />
                    <div className="draw-content-line">
                        <p className="draw-content-text-title">Format Type:&nbsp;&nbsp;</p>
                        <RadioButtonGroup
                            className="draw-dialog-radio-group"
                            onChange={this._handle_sex_choose}
                            name="shipSpeed"
                            defaultSelected={this.state.sex}>

                            <RadioButton className="popup-dialog-radio"
                                value="Html"
                                label="Html"
                                disabled={!_haveSex}
                            />
                            <RadioButton className="popup-dialog-radio"
                                value="die"
                                label="Markdown"
                                disabled={!_haveSex}
                            />
                            <RadioButton className="popup-dialog-radio"
                                value="das"
                                label="JSon"
                                disabled={!_haveSex}
                            />
                            <RadioButton className="popup-dialog-radio"
                                value="-"
                                label="Xml"
                                disabled={!_haveSex}
                            />
                        </RadioButtonGroup>
                    </div>


                    <div className="draw-content-line">

                        <Checkbox
                            className="draw-content-check-regel"
                            label="Original"
                            defaultChecked={true}
                            onCheck={this._handle_togle_regel}
                        />
                     
                        Updated: 2017-04-21 . 11:06
                  
                    </div>

                </div>
            </div>

        )
    }
}