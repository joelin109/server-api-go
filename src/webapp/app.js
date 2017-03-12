import React from 'react';
import ReactDOM from 'react-dom';
import * as productService from './service/product-service';
import * as githubService from './service/github-service';
import * as act from './action';

import Navigator from './component/header';
import Channel from './component/channel';
import Recommend from './Component/recommend';
import ListC from './component/list';

const _style = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    root2: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: 1024 + 320 + 40,
    },
    filter: {
        display: 'flex',
        justifyContent: 'center',
        width: 1024,
    },
    recommend: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        background: '#FAFAFA',
    },

};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            channel: { type: act.Action_Channel_Type_Github, data: [0, 8], filter: "javascript" },
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

    _dispatch_list(action, value) {
        switch (action.type) {
            case act.Action_List_Github_Author:
                window.open(action.data, '_blank');
                break;
            case act.Action_List_Github_Repository:
                window.open(action.data, '_blank');
                break;
            case act.Action_List_Article_Detail:
                window.open(action.data, '_blank');
                break;
            default:
                alert(action.type + "-" + action.data)
                break;
        }
        return false;
    }


    render() {

        let displayType = act.Action_Display_List_Article;
        switch (this.state.channel.type) {
            case act.Action_Channel_Type_Github:
                displayType = act.Action_Display_List_Github;
                break;
            default:
                break;
        }

        return (
            <div >
                <Navigator title="Title" dispatch={this._dispatch_navigator.bind(this)} />
                <Channel value={3} dispatch={this._dispatch_channel.bind(this)} />
                <br />

                <div style={_style.root}>
                    <div style={_style.root2}>

                        <ListC value={this.state.products} displayStyle={displayType}
                            channel={this.state.channel}
                            dispatch={this._dispatch_list.bind(this)} />
                        <br /><br />

                        <Recommend value={0} />
                    </div>
                </div>


            </div>
        );
    }
};

export default App;
//ReactDOM.render(<App />, document.getElementById("main"));