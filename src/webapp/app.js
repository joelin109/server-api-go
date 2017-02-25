import React from 'react';
import ReactDOM from 'react-dom';

import Header from './component/header';
import Channel from './component/channel';
import RangeSlider from './component/RangeSlider';
import ListContainer from './component/listContainer';
import * as productService from './service/product-service';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchKey: "",
            min: 0,
            max: 30,
            products: [],
            total: 0,
            page: 1
        }
    }

    componentDidMount() {
        this.findProducts();
    }

    findProducts() {
       productService.findAll({search: this.state.searchKey, min: this.state.min, max: this.state.max, page: this.state.page})
            .then(data => {
               // alert(data.total)
                this.setState({
                    products: data.products,
                    page: data.page,
                    pageSize: data.pageSize,
                    total: data.total
                });
            });
    }

    actionSearchKeyChange(searchKey) {
        this.setState({searchKey: searchKey, page: 1}, this.findProducts);
    }

    actionChangeRange(values) {
        this.setState({min: values[0], max: values[1], page: 1}, this.findProducts);
    }

    shouldComponentUpdate(nextProps, nextState) {
        //alert("props-" + this.props.products.length)
        //alert("nextProps-" + nextProps.products.length)
        return (this.state.total != nextState.total);
    }


    render() {
        //alert('aaaaa' + this.state.total)
        //alert("fdfgdf - " + this.state.products.length)
        return (
            <div>
                <Header text="Joe.com"/>
                <div className="slds-col">
                    <RangeSlider defaultValue={[0, 26]} min={0} max={26} step={.5} withBars={true}
                                 onChange={this.actionChangeRange.bind(this)}/>
                </div>
                <ListContainer value={this.state.products}
                               total={this.state.total} min={this.state.min} max={this.state.max} tag=""/>

            </div>
        );
    }
};

ReactDOM.render(<App/>, document.getElementById("main"));