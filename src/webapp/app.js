import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router, Route, Switch
} from 'react-router-dom'
import * as act from './setting/action';
import Navigator from './component/header';
import HeaderChannel from './component/channel';
import Recommend from './component/recommend';

import Channel from './c-channel';
import Geek from './c-geek';
import Deutsch from './c-deutsch'
import DetailGithub from './Component/detail/detail-github';
import AdminList from './admin/admin-list';



export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            previousLocation: props.location,
        }
    }

    componentDidMount() {
    }

    componentWillUpdate(nextProps) {
        const { location } = this.props
        // set previousLocation if props.location is not modal
        if (
            nextProps.history.action !== 'POP' &&
            (!location.state || !location.state.modal)
        ) {
            this.state.previousLocation = this.props.location
        }
    }


    //Dispatch
    _dispatch_navigator(action) {
        switch (action.type) {
            case act.Action_Filter_List_Article_Confirm:
                alert(action.data)
                break;

            case act.Action_Admin_Channel_Type_Word:
                //this.setState({ channel: action });
                this._dispatch_route_link_to(action)
                break;

            case act.Action_Admin_Channel_Type_Article:
                this._dispatch_route_link_to(action)
                break;

            default:
                break;
        }
        return false;
    }

    _dispatch_channel(action) {
        this._dispatch_route_link_to(action)
        return false;
    }


    //for Testing
    _dispatch_route_link_to(action) {
        let _types = action.type.split("_");
        let _type = _types[_types.length - 1].toLowerCase();
        let _link = `/admin?_t=${_type}`;

        switch (action.type) {
            case act.Action_Channel_Type_Github:
                _link = '/';
                break;

            case act.Action_Channel_Type_Word:
                _link = `/deutsch?_t=${_type}`;
                break;

            case act.Action_Channel_Type_Article:
            case act.Action_Channel_Type_Grammar:
                _link = `/channel?_t=${_type}`;
                break;

            case act.Action_Admin_Channel_Type_Word:
                //this.setState({ channel: action });
                _link = `/admin?_t=${_type}`;
                break;

            default:
                break;
        }

        let _link_to = {
            pathname: _link,
            state: {
                channel: action
            }
        }
        this.props.history.push(_link_to)
    }



    render() {

        let _switchAdmin = (window.location.href.indexOf("admin?_t") > 0);

        const { location } = this.props
        const isUnInitial = (this.state.previousLocation !== location) //not initial render
        const isStateModal = (location.state && location.state.modal)
        const isModal = !!(isStateModal && isUnInitial)

        return (
            <div >
                <Navigator title="Title" dispatch={this._dispatch_navigator.bind(this)} />
                <HeaderChannel value={3} hidden={isModal} dispatch={this._dispatch_channel.bind(this)} />

                <div className='root'>
                    <div className='root-body'>
                        <div className='root-list'>
                            <Switch location={isModal ? this.state.previousLocation : location}>
                                <Route exact path='/' component={Geek} />
                                <Route path='/channel?_t=:id' component={Channel} />
                                <Route path='/deutsch?_t=:channel' component={Deutsch} />
                                <Route path='/admin?_t=:channel' component={AdminList} />

                            </Switch>
                            <Route path='/detail?_v=:id' component={DetailGithub} />
                        </div>

                        {_switchAdmin ? "" : <Recommend value={0} />}

                    </div>
                </div>
            </div>
        );
    }
};
