import React from 'react'
import { IconMenu, IconButton, MenuItem } from 'material-ui';
import { Button, Icon, SIcon } from './../../../component/wui'
import * as act from './../../../setting/action'

export default class WordHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            source: {},
            actionValue: 1,
        };

        this._dispatch_close = this._dispatch_close.bind(this);
        this._dispatch_save = this._dispatch_save.bind(this);
        this._dispatch_more = this._dispatch_more.bind(this);


    }

    componentWillReceiveProps(nextProps) {
        this.state.open = nextProps.open;
    }


    //Action for menu
    _dispatch_close() {
        this.props.dispatch({ type: act.Action_Admin_Channel_Type_Close })
        return false;
    }
    _dispatch_save() {

        this.props.dispatch({ type: act.Action_Admin_Channel_Type_Close })
        return false;
    }
    _dispatch_more(event, value) {
        alert(value)
    }

    render() {

        return (

            <div className="draw-detail-root-container-header-box">
                <div className="w-limit-60">
                    <div className="float-button colr-dark loc-top-1">
                        <Button id={'arrow_back'} onTouchTap={this._dispatch_close} />
                    </div>
                </div>

                <div className="w-limit-60">
                    <div className="float-button colr-dark loc-top-1">
                        <IconMenu
                            iconButtonElement={<IconButton><Icon id={'more_horiz'} /></IconButton>}
                            onChange={this._dispatch_more}
                            value={this.state.actionValue}
                            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}

                        >
                            <MenuItem value="1" primaryText="New" />
                            <MenuItem value="2" primaryText="Save" />
                            <MenuItem value="3" primaryText="Save & New" />
                            <MenuItem value="2" primaryText="Refresh" />
                            <MenuItem value="3" primaryText="Share" />
                        </IconMenu>
                    </div>
                </div>
            </div>
        )
    }
}