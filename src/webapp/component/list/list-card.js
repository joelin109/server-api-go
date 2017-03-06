import React from 'react';
import ItemCard from './item-card-mi';


class ListCard extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    _linkHandler(type, value) {
        this.props.onClick(type, value);
        return false;
    }

    render() {

        let listItems = <div style={{ height: 10, width: 1024 }}> </div>;
        if (this.props.value.length > 0) {
            listItems = this.props.value.map(item =>
                <ItemCard key={item.id} value={item}
                    onClick={this._linkHandler.bind(this)}
                />);
        }

        return (
            <div style={this.props.style}>
                {listItems}
            </div>
        );
    }
};

export default ListCard;