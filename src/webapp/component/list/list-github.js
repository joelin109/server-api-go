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

        let listItems = <div> </div>;
        if (this.props.resource.length > 0) {
            listItems = this.props.resource.map(item =>
                <ItemGithub key={item.id} value={item}
                    dispatch={this._dispatch.bind(this)}
                />);
        }

        return (
            <div className='root-list'>
                {listItems}
            </div>
        );
    }
};

export default ListGithub;