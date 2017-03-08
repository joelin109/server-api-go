import React from 'react';
import ReactDOM from 'react-dom';
import * as productService from './service/product-service';

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
            searchKey: "",
            min: 0,
            max: 30,
            products: [],
            total: 0
        }
    }

    componentDidMount() {
        this.findProducts();
    }

    findProducts() {
        productService.findAll({ search: this.state.searchKey, min: this.state.min, max: this.state.max, page: 1 })
            .then(data => {
                this.setState({
                    products: data.products,
                    pageSize: data.pageSize,
                    total: data.total
                });
            });
    }

    //Handler
    _handler_navigator(type, value) {
        switch (type) {
            case "filter_beer":
                this._action_list_changeRange(value)
                break;
            default:
                break;
        }
        return false;
    }

    //Action
    _actionSearchChannel(searchKey) {
        this.setState({ searchKey: searchKey, page: 1 }, this.findProducts);
    }

    _action_list_changeRange(values) {
        this.state.min = values[0];
        this.state.max = values[1];
        this.findProducts()
    }

    _action_list_tag(tag) {
        this.state.searchKey = tag;
        this.findProducts()
    }


    render() {
        let dd = [this.state.products[1], this.state.products[2], this.state.products[3]]
        return (
            <div >
                <Navigator title="Title" onClick={this._handler_navigator.bind(this)} />
                <br />
                <br />

                <div style={_style.root}>
                    <div style={_style.root2}>

                        <ListC value={this.state.products} listStyle="card"
                            min={this.state.min} max={this.state.max}
                            total={this.state.total} filter={this.state.searchKey}
                            onClickTag={this._action_list_tag.bind(this)} />
                        <br /><br />

                        <Recommend value={0} />
                    </div>
                </div>

                <div style={_style.recommend}>
                    <ListC value={dd} listStyle=""
                        min={this.state.min} max={this.state.max}
                        total={this.state.total} filter={this.state.searchKey}
                        onClickTag={this._action_list_tag.bind(this)} />

                </div>

            </div>
        );
    }
};

export default App;
//ReactDOM.render(<App />, document.getElementById("main"));