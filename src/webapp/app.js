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
            channel: { type: act.Action_Channel_Type_Github, data: [0, 8] },
            filter: "",
            min: 0,
            max: 30,
            products: [],
            total: 0,

        }
    }

    componentDidMount() {
        switch (this.state.channel.type) {
            case act.Action_Channel_Type_Github:
                this._github_findProducts();
                break;
            default:
                this._article_findProducts();
                break;
        }

    }


    //API
    _article_findProducts() {
        productService.findAll({ search: this.state.filter, min: this.state.min, max: this.state.max, page: 1 })
            .then(data => {
                this.setState({
                    products: data.products,
                    pageSize: data.pageSize,
                    total: data.total

                });
            });
    }

    _github_findProducts() {
        githubService.findAll({ search: this.state.filter, page: 1 })
            .then(data => {
                this.setState({
                    products: data.items,
                    pageSize: 30,
                    total: data.total_count
                });
            });
    }

    //Dispatch
    _dispatch_navigator(action, value) {
        switch (action.type) {
            case "filter_beer":
                this._action_list_changeRange(value)
                break;
            default:
                break;
        }
        return false;
    }

    _dispatch_channel(action) {
        this.state.filter = "";
        this.state.channel = action

        switch (action.type) {
            case act.Action_Channel_Type_Github:
                this._action_github_search(action.data)
                break;
            default:
                this._action_list_changeRange(action.data)
                break;
        }
        return false;
    }

    _dispatch_list(action, value) {
        switch (action.type) {
            case act.Action_List_Article_Tag:
                this._action_list_tag(action.data)
                break;
            case act.Action_List_Github_Author:
                window.open(action.data, '_blank');
                break;
            case act.Action_List_Github_Repository:
                window.open(action.data, '_blank');
                break;
            default:
                alert(action.type + "-" + value)
                break;
        }
        return false;
    }

    //Action
    _action_list_changeRange(values) {
        this.state.min = values[0];
        this.state.max = values[1];
        this._article_findProducts()
    }

    _action_list_tag(tag) {
        this.state.filter = tag;
        this._article_findProducts()
    }

    _action_github_search(language) {
        this.state.filter = language;
        this._github_findProducts()
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
                <Navigator title="Title" onClick={this._dispatch_navigator.bind(this)} />
                <Channel value={3} onClick={this._dispatch_channel.bind(this)} />
                <br />

                <div style={_style.root}>
                    <div style={_style.root2}>

                        <ListC value={this.state.products} displayStyle={displayType}
                            min={this.state.min} max={this.state.max}
                            total={this.state.total} filter={this.state.filter}
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