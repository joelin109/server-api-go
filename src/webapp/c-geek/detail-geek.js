import React from 'react'
import ReactDOM from 'react-dom'
import { Drawer, Divider, Avatar, FlatButton, RaisedButton } from 'material-ui';
import ListItem from 'material-ui/List/ListItem';
import * as act from './../setting/action'
import { Button } from './../component/wui'

/* Modified for Drawer
width: this.props.width < 1024 ? this.props.width || theme.width : '100%',
left: this.props.width < 1024 ? 0 : 'auto',
top: this.props.open ? 0 : -10000,
*/

class DetailGeek extends React.Component {
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

    _dispatch_left_channel(actionType) {
        this.props.dispatch({ type: actionType });
    }

    _dispatch_close() {
        //this._dispatch_left_channel(act.Action_Admin_Channel_Type_Close);
        this.setState({ open: false });
        return false;
    }

    _dispatch_left_channel_word() {
        this._dispatch_left_channel(act.Action_Admin_Channel_Type_Word);
        return false;
    }

    _dispatch_left_channel_article() {
        this._dispatch_left_channel(act.Action_Admin_Channel_Type_Article);
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
        let _coverID = this.props.resource.coverSrc;
        window.scrollTo(0, 0);

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
                        <ListItem className="draw-detail-root-container-header-thumb"
                            leftAvatar={<Avatar src="http://www.material-ui.com/images/uxceo-128.jpg" />}
                        >
                            AuthorName
                        </ListItem>
                        <Button id={'refresh'} onTouchTap={this._dispatch_close.bind(this)} />
                    </div>
               
                    <div className='draw-detail-root-container-box'>
                        <img className="draw-detail-root-container-box-cover" src={_coverID} />

                        <div className='draw-detail-root-container-box-body-2'>
                            2222222
                         </div>
                        <div className='draw-detail-root-container-box-body-3'>
                            3333
                         </div>
                    </div>
          
                    <div className='draw-detail-root-container-footer'>
                        jnfdkjhngjfdnghjdfhgnjfdjkhg
                    </div>
                </Drawer>
            </div>
        )
    }
}


export default DetailGeek;