import React from 'react'
import { Drawer, Divider, FlatButton } from 'material-ui';
import * as act from './../../setting/action'
import { Button } from './../../component/wui'


export default class NewWord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            resource: {},
        };

        this.state.open = props.open;
    }

    componentWillReceiveProps(nextProps) {
        this.state.open = nextProps.open;
    }

    handleOpen() {
        this.setState({ open: true });
    };


    _dispatch_close() {
        //this._dispatch_left_channel(act.Action_Admin_Channel_Type_Close);
        this.setState({ open: false });
        return false;
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
        let _coverSrc = 'https://a0.muscache.com/im/pictures/bc34fd09-adf1-434a-8028-6913e3bc2177.jpg';
        let _date = 'this._test(_detail)';
        let _title = "美墨之間的「長城」，就聳立在我的眼前──看得見、與看不見的壁壘";

        return (
            <div>
                <Drawer
                    className={_className}
                    containerClassName="draw-detail-root-container"
                    width={768}
                    open={this.state.open} docked={false}
                    onRequestChange={this._dispatch_close.bind(this)}>
                    <div className={_classNameHeader}>
                        <Button id={'arrow_back'} onTouchTap={this._dispatch_close.bind(this)} />
                        <Button id={'refresh'} onTouchTap={this._dispatch_close.bind(this)} />
                        <Button id={'add'} onTouchTap={this._dispatch_close.bind(this)} />
                        <Button id={'save'} onTouchTap={this._dispatch_close.bind(this)} />
                        <Button id={'more_horiz'} onTouchTap={this._dispatch_close.bind(this)} />

                    </div>

                    <div className='draw-detail-root-container-box'>
                        <img className="draw-detail-root-container-box-cover" src={_coverSrc} />
                        <label className="">{_date}</label>
                        <div>
                            <p className="itemBox-Text-title">{_title}</p>
                        </div>

                    </div>
                </Drawer>
            </div>
        )
    }
}