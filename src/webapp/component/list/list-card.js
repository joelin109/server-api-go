import React from 'react';
import ItemCard from './item-card-mi';


class ListCard extends React.Component {
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
                <ItemCard key={item.id} value={item}
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

export default ListCard;