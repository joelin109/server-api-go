import React from 'react';
import * as act from './../../action';
import FilterBeer from './../popup/filter-list-beer'
import FilterListGithub from './../popup/filter-list-github'


class PopupFilterList extends React.Component {
    constructor() {
        super();
        this.state = {
            stepIndex: 0,
            channel: {},
            data: {},
        };
    }



    _dispatch(action) {
        this.props.dispatch(action)
        return false;
    }

    render() {

        let filter;
        switch (this.props.channel.type) {
            case act.Action_Channel_Type_Github:
                filter = <FilterListGithub open={this.props.open} data={this.state.data}
                    dispatch={this._dispatch.bind(this)} />

                break;
            default:
                filter = <FilterBeer open={this.props.open} data={this.state.data}
                    dispatch={this._dispatch.bind(this)} />
                break;
        }

        return (

            <div>
                {filter}
            </div>
        )
    }
}


export default PopupFilterList;