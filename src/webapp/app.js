import React from 'react';
import ReactDOM from 'react-dom';
import * as productService from './service/product-service';
import * as githubService from './service/github-service';

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
            channel: "github",
            filter: "",
            min: 0,
            max: 30,
            products: [],
            total: 0,

        }
    }

    componentDidMount() {
        switch (this.state.channel) {
            case "github":
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

    _dispatch_channel(action, value) {
        this.state.filter = "";
        this.state.channel = "article"

        switch (action.type) {
            case "channel":
                this._action_list_changeRange(value)
                break;
            case "github":
                this.state.channel = "github"
                this._action_github_search(value)
                break;
            default:
                break;
        }
        return false;
    }

    _dispatch_list(action, value) {
        switch (action.type) {
            case "tag":
                this._action_list_tag(value)
                break;
            case "github":
                window.open(value, '_blank'); 
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

        let listType = "card";
        switch (this.state.channel) {
            case "article":
                listType = "article"
                break;
            case "github":
                listType = "github";
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

                        <ListC value={this.state.products} listStyle={listType}
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