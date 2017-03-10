import React from 'react';
import Paginator from './paginator';
import * as requestProduct from './../../service/product-service';
import ListCard from './list-card';
import ListDefault from './list-default';
import ListGithub from './list-github'
import Style from './../../util/style'
import * as act from './../../action';

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
        // alert(this.props.filter + "-" + this.props.min + "-" + this.props.max + "-" + this.state.page)
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

    _dispatch_list(action) {
        this.props.dispatch(action, action.data)
        return false;
    }


    render() {
        let size = this.state.results.length

        let list
        switch (this.props.displayStyle) {
            case act.Action_Display_List_Article:
                list = <ListCard value={this.state.results} style={Style.list}
                    dispatch={this._dispatch_list.bind(this)} />
                break;
            case act.Action_Display_List_Github:
                list = <ListGithub value={this.state.results} style={Style.list}
                    dispatch={this._dispatch_list.bind(this)} />
                break;
            default:
                list = <ListDefault value={this.state.results} style={Style.list} itemStyle="deutsch"
                    dispatch={this._dispatch_list.bind(this)} />
                break;
        }

        return (
            <div>
                {list}

                <br />  <br />

                <Paginator style={Style.paginator}
                    page={this.state.page} pageSize={size} total={this.props.total}
                    onPrevious={this._actionPagePrevious.bind(this)}
                    onNext={this._actionPageNext.bind(this)} />

            </div>
        );
    }


}
;

