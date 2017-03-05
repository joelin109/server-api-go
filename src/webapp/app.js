import React from 'react';
import ReactDOM from 'react-dom';

import * as productService from './service/product-service';
import Navigator from './component/header';
import Channel from './component/channel';
import RangeSlider from './component/RangeSlider';
import ListContainer from './component/list';
import CardListExample from './component/list/cardlist';

const _style = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    filter: {
        display: 'flex',
        justifyContent: 'center',
        width: 1024,
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


    //Action
    actionSearchChannel(searchKey) {
        this.setState({ searchKey: searchKey, page: 1 }, this.findProducts);
    }

    actionChangeRange(values) {
        this.state.min = values[0];
        this.state.max = values[1];
        this.findProducts()
    }

    actionSearchTag(tag) {
        this.state.searchKey = tag;
        this.findProducts()
    }


    render() {
        return (
            <div >
                <Navigator title="Title" />
                <br />

                <div style={_style.root}>

                    <div style={_style.filter}>
                        <RangeSlider defaultValue={[0, 26]} min={0} max={26} step={.5} withBars={true}
                            onChange={this.actionChangeRange.bind(this)} />
                    </div>
                    <br />
                    <br />
                    <br />
                </div>

                <div style={_style.root}>
                    <CardListExample value="dgdfgdf" />
                    <br />
                    <br />
                    <br />

                    <ListContainer value={this.state.products}
                        total={this.state.total} min={this.state.min} max={this.state.max} filter={this.state.searchKey}
                        onClickTag={this.actionSearchTag.bind(this)} />


                </div>

            </div>
        );
    }
};

export default App;
//ReactDOM.render(<App />, document.getElementById("main"));