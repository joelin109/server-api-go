import React from 'react';
import ReactDOM from 'react-dom';
import * as act from './action';

import Navigator from './component/header';
import Channel from './component/channel';
import Home from './Component/home';
import AdminList from './admin/admin-list';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            channel: { type: act.Action_Admin_Channel_Type_Word, data: [0, 8], filter: "javascript" },
        }
    }

    componentDidMount() {
        /*switch (this.state.channel.type) {
            case act.Action_Channel_Type_Github:
                this._github_findProducts();
                break;
            default:
                this._article_findProducts();
                break;
        }*/

    }

    //Dispatch
    _dispatch_navigator(action) {
        switch (action.type) {
            case act.Action_Filter_List_Article_Confirm:
                alert(action.data)
                break;
            case act.Action_Admin_Channel_Type_Word:
                this.setState({ channel: action });
                break;
            default:
                break;
        }
        return false;
    }

    _dispatch_channel(action) {
        //this.state.filter = "";
        this.setState({
            channel: action
        });
        return false;
    }


    render() {

        let _switchAdmin = false;
        switch (this.state.channel.type) {
            case act.Action_Admin_Channel_Type_Word:
                _switchAdmin = true;
                break;
            default:
                break;
        }

        let _adminHome = <div className='root-body'>
            <AdminList channel={this.state.channel} />
        </div>;
        let _home = <div className='root-body'>
            <Home channel={this.state.channel} />
        </div>;

        return (
            <div >
                <Navigator title="Title" dispatch={this._dispatch_navigator.bind(this)} />

                <Channel value={3} dispatch={this._dispatch_channel.bind(this)} />
                <br />

                <div className='root'>
                    {_switchAdmin === true ? _adminHome : _home}
                </div>
            </div>
        );
    }
};

export default App;
//ReactDOM.render(<App />, document.getElementById("main"));