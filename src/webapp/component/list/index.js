import React from 'react';
import Paginator from './paginator';
import * as requestProduct from './../../service/product-service';
import ListCard from './list-card';
import ListDefault from './list-default';

const _style = {
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        maxWidth: 1024,
    },

    page: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        alignContent: 'center',
        maxWidth: 1024,
        minWidth: 320,
        minHeight: 100,
    },

};

export default class ListC extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            page: 1
        }
    }

    componentWillReceiveProps(nextProps) {
        this.state.results = nextProps.value;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;//(this.state.total != nextProps.total);
    }


    //Acton
    _actionPagePrevious() {
        this.state.page = this.state.page - 1;
        this.apiRequest()
    }

    _actionPageNext() {
        this.state.page = this.state.page + 1;
        this.apiRequest()
    }


    //API Request&Response
    apiRequest() {
        let filter = {
            search: this.props.filter,
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
            page: result.page
        });
    }

    _handlerList(type, value) {
        switch (type) {
            case "tag":
                this.props.onClickTag(value)
                break;
            default:
                alert(type + ":    " + value)
                break;
        }
        return false;
    }


    render() {
        let size = this.state.results.length

        let list
        switch (this.props.listStyle) {
            case "card":
                list = <ListCard value={this.state.results} style={_style.list}
                    onClick={this._handlerList.bind(this)} />
                break;
            default:
                list = <ListDefault value={this.state.results} style={_style.list} itemStyle="deutsch"
                    onClick={this._handlerList.bind(this)} />
                break;
        }

        return (
            <div>
                {list}

                <br />  <br />

                <Paginator style={_style.page}
                    page={this.state.page} pageSize={size} total={this.props.total}
                    onPrevious={this._actionPagePrevious.bind(this)}
                    onNext={this._actionPageNext.bind(this)} />

            </div>
        );
    }


}
;

