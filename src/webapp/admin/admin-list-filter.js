import React from 'react';
import * as act from './../setting/action';
import WordListFilter from './word/word-list-filter'


class AdminListFilter extends React.Component {
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
            case act.Action_Admin_Channel_Type_Word:
                filter = <WordListFilter open={this.props.open} data={this.state.data}
                    dispatch={this._dispatch.bind(this)} />
                break;

            default:
                filter = <WordListFilter open={this.props.open} data={this.state.data}
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


export default AdminListFilter;