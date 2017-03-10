import React from 'react';
import ItemGithub from './item-github-mi';


class ListGithub extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    _dispatch(action) {
        this.props.dispatch(action);
        return false;
    }

    render() {

        let listItems = <div style={{ height: 10, width: 1024 }}> </div>;
        if (this.props.value.length > 0) {
            listItems = this.props.value.map(item =>
                <ItemGithub key={item.id} value={item}
                    dispatch={this._dispatch.bind(this)}
                />);
        }

        return (
            <div style={this.props.style}>
                {listItems}
            </div>
        );
    }
};

export default ListGithub;