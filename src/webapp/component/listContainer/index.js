import React from 'react';
import List from './list';
import Paginator from './paginator';
import * as requestProduct from './../../service/product-service';


class ListContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            total: 0,
            page: 1,
            tag: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        this.state.results = nextProps.value;
        this.state.total = nextProps.total;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }


    //Action
    actionPagePrevious() {
        this.state.page = this.state.page - 1;
        this.apiRequest()
    }

    actionPageNext() {
        this.state.page = this.state.page + 1;
        this.apiRequest()
    }

    actionSearchTag(e) {
        this.state.tag = e;
        this.state.page = 1;
        this.apiRequest()
        return false;
    }


    //API Request&Response
    apiRequest() {
        let filter = {
            search: this.state.tag,
            min: this.props.min,
            max: this.props.max,
            page: this.state.page
        }

        requestProduct.findAll(filter)
            .then(result => {
                this.apiResponse(result)
            });
    }

    apiResponse(result) {
        this.setState({
            results: result.products,
            page: result.page,
            total: result.total
        });
    }


    render() {
        //alert("ListContainer render-" + this.state.results.length)
        let size = this.state.results.length
        return (
            <div>
                <div>
                    <List value={this.state.results} itemStyle="deutsch" onClickTag={this.actionSearchTag.bind(this)}/>
                </div>

                <div>
                    <Paginator page={this.state.page} pageSize={size} total={this.state.total}
                               onPrevious={this.actionPagePrevious.bind(this)}
                               onNext={this.actionPageNext.bind(this)}/>
                </div>

            </div>
        );
    }


}
;

export default ListContainer;
