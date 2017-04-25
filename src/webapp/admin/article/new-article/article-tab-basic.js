import React from 'react'
import { TextField, RadioButtonGroup, RadioButton, Toggle, Checkbox, DropDownMenu, MenuItem } from 'material-ui';
import * as act from './../../../setting/action'
import { SButton, Button, SIcon } from './../../../component/wui'


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
        this._handle_item_recommend = this._handle_item_recommend.bind(this);
        this._handle_item_approval = this._handle_item_approval.bind(this);
        this._handle_item_unapproval = this._handle_item_unapproval.bind(this);

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
    _handle_item_recommend(event, value) {
        //this.setState({ recommend: value });
    };
    _handle_item_approval(event, value) {
        //this.setState({ recommend: value });
    };
    _handle_item_unapproval(event, value) {
        //this.setState({ recommend: value });
    };

    _handle_status() {

    }





    render() {
        let _fieldClassName = 'root-text-field-full';

        let _detail = this.props.source;
        let _coverSrc = '';
        let _isNew = true;

        let _recommend = true;
        let _recommendButton = <SButton id={_recommend ? 'favorite' : 'favorite_border'} selected={_recommend} onTouchTap={this._handle_item_recommend} />;
        let _status = 1;
        let _upButton = <SButton id="thumb_up" selected={_status === 1} onTouchTap={this._handle_item_approval} />;
        let _downButton = <SButton id="thumb_down" selected={_status === -1} onTouchTap={this._handle_item_unapproval} />;

        return (

            <div className="draw-detail-tab-content-basic">
                <div className="draw-detail-tab-content-basic-box" tabindex="0">
                    <div className="content-line">

                        <div className="itemBox-img-box">
                            <img className="itemBox-img-cover" src={_coverSrc} />
                            <div className="itemBox-recommend">
                                {_recommendButton}
                            </div>
                        </div>
                        <div className="draw-content-box">
                            <div className="content-line">
                                Status: &nbsp;&nbsp;{_upButton} {_downButton}
                            </div>
                            <div className="content-line">
                                Channel:
                        <DropDownMenu value={'pending'} onChange={this._handle_status.bind(this)}>
                                    <MenuItem value={'pending'} primaryText="Pending" />
                                    <MenuItem value={'accepted'} primaryText="Accepted" />
                                    <MenuItem value={'rejected'} primaryText="Rejected" />
                                </DropDownMenu>
                            </div>
                            <div className="content-line">
                                Tag:
                           <DropDownMenu value={'pending'} onChange={this._handle_status.bind(this)}>
                                    <MenuItem value={'pending'} primaryText="Pending" />
                                    <MenuItem value={'accepted'} primaryText="Accepted" />
                                    <MenuItem value={'rejected'} primaryText="Rejected" />
                                </DropDownMenu>
                            </div>
                        </div>



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
                    <div className="content-line">
                        <p className="draw-content-text-title">Format Type:&nbsp;&nbsp;</p>
                        <RadioButtonGroup
                            className="content-line w-limit-600"
                            onChange={this._handle_sex_choose}
                            name="shipSpeed"
                            defaultSelected={'html'}>

                            <RadioButton className="popup-dialog-radio"
                                value="html"
                                label="Html"
                                disabled={_isNew}
                            />
                            <RadioButton className="popup-dialog-radio"
                                value="markdown"
                                label="Markdown"
                                disabled={_isNew}
                            />
                            <RadioButton className="popup-dialog-radio"
                                value="json"
                                label="JSon"
                                disabled={_isNew}
                            />
                            <RadioButton className="popup-dialog-radio"
                                value="xml"
                                label="Xml"
                                disabled={_isNew}
                            />
                        </RadioButtonGroup>
                    </div>


                    <div className="content-line">

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