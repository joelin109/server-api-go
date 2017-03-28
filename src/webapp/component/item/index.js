import React from 'react';


class ListItem extends React.Component {

    _dispatch(action) {
        this.props.dispatch(action);
        return false;
    }

    render() {

        let _listItem = ''
    

        return (

            { _listItem }

        );
    }
};

export default ListItem;