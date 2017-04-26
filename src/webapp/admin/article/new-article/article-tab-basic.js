import React from 'react'
import { TextField, RadioButtonGroup, RadioButton, Toggle, Checkbox, DropDownMenu, MenuItem } from 'material-ui';
import * as act from './../../../setting/action'
import { SButton, Button, SIcon } from './../../../component/wui'


export default class ArticleTabBasic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNew: true,
            item: {},
            recommend: false,
            status: 0,
            channel: '',
            tag: '',
            coverSrc: '',
            coverThumbSrc: '',
            title: '',
            subTitle: '',
            originalResource: '',
            desc: '',
            formatType: 'html',
            isOriginal: true,
        };


        this._handle_item_recommend = this._handle_item_recommend.bind(this);
        this._handle_item_approval = this._handle_item_approval.bind(this);
        this._handle_item_unapproval = this._handle_item_unapproval.bind(this);
        this._handle_item_channel = this._handle_item_channel.bind(this);
        this._handle_item_tag = this._handle_item_tag.bind(this);

        this._handle_item_coverSrc = this._handle_item_coverSrc.bind(this);
        this._handle_item_conver_thumbSrc = this._handle_item_conver_thumbSrc.bind(this);
        this._handle_item_title = this._handle_item_title.bind(this);
        this._handle_item_subTitle = this._handle_item_subTitle.bind(this);
        this._handle_item_desc = this._handle_item_desc.bind(this);
        this._handle_type_choose = this._handle_type_choose.bind(this);
        this._handle_togle_original = this._handle_togle_original.bind(this);

    }

    componentWillReceiveProps(nextProps) {

    }


    _handle_item_recommend(event, value) {
        //this.setState({ recommend: value });
    };
    _handle_item_approval(event, value) {
        //this.setState({ recommend: value });
    };
    _handle_item_unapproval(event, value) {
        //this.setState({ recommend: value });
    };
    _handle_item_channel() {

    }
    _handle_item_tag() {

    }

    //Add or edit the word info.
    _handle_item_coverSrc(event, newValue) {

    }
    _handle_item_conver_thumbSrc(event, newValue) {

    }
    _handle_item_title(event, newValue) {

    }
    _handle_item_subTitle(event, newValue) {

    }
    _handle_item_desc(event, newValue) {

    }

    _handle_type_choose(event, value) {

    }
    _handle_togle_original(event, value) {
        //this.setState({ unRegel: value });
    };



    render() {
        let _fieldClassName = 'root-text-field-full';

        let _isNew = this.props.source === null;
        let _item = this.props.source;
        let _coverSrc = _isNew ? '' : _item.urlToImage;
        let _recommend = _isNew ? false : _item.is_recommend === 1;
        let _status = _isNew ? 1 : _item.valid_status;
        let _title = _isNew ? '' : _item.title;
        let _originalLink = _isNew ? '' : _item.url;
        let _desc = _isNew ? '' : _item.description;


        let _recommendButton = <SButton id={_recommend ? 'favorite' : 'favorite_border'} selected={_recommend} onTouchTap={this._handle_item_recommend} />;
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
                                 <DropDownMenu value={'pending'} onChange={this._handle_item_channel}>
                                    <MenuItem value={'pending'} primaryText="Pending" />
                                    <MenuItem value={'accepted'} primaryText="Accepted" />
                                    <MenuItem value={'rejected'} primaryText="Rejected" />
                                </DropDownMenu>
                            </div>
                            <div className="content-line">
                                Tag:
                                 <DropDownMenu value={'pending'} onChange={this._handle_item_tag}>
                                    <MenuItem value={'pending'} primaryText="Pending" />
                                    <MenuItem value={'accepted'} primaryText="Accepted" />
                                    <MenuItem value={'rejected'} primaryText="Rejected" />
                                </DropDownMenu>
                            </div>
                        </div>



                    </div>

                    <TextField
                        onChange={this._handle_item_coverSrc}
                        defaultValue={_coverSrc}
                        className={_fieldClassName}
                        hintText="Image link"
                        floatingLabelText="Cover Src"
                        floatingLabelFixed={true}
                    />
                    <TextField
                        defaultValue={_coverSrc}
                        className={_fieldClassName}
                        hintText="."
                        floatingLabelText="Cover Thumbnail Src"
                        floatingLabelFixed={true}
                    />
                    <TextField
                        onChange={this._handle_item_title}
                        defaultValue={_title}
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
                        defaultValue={_originalLink}
                        disabled={true}
                        className={_fieldClassName}
                        hintText="."
                        floatingLabelText="Original Resource"
                        floatingLabelFixed={true}
                    />
                    <TextField
                        defaultValue={_desc}
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
                                disabled={true}
                            />
                            <RadioButton className="popup-dialog-radio"
                                value="markdown"
                                label="Markdown"
                                disabled={true}
                            />
                            <RadioButton className="popup-dialog-radio"
                                value="json"
                                label="JSon"
                                disabled={true}
                            />
                            <RadioButton className="popup-dialog-radio"
                                value="xml"
                                label="Xml"
                                disabled={true}
                            />
                        </RadioButtonGroup>
                    </div>


                    <div className="content-line">

                        <Checkbox
                            disabled={true}
                            className="draw-content-check-regel"
                            label="Original"
                            defaultChecked={_originalLink === ''}
                            onCheck={this._handle_togle_regel}
                        />

                        Updated: 2017-04-21 . 11:06

                    </div>

                </div>
            </div>

        )
    }
}