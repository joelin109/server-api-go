/**
 * Created by joe on 2/24/17.
 */
import React from 'react';
import DeutschListItem from './deutschListItem';


class List extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            style: ""
        }
    }

    linkHandler(e) {
        this.props.onClickTag(e);
        return false;
    }

    render() {
        let style = this.props.itemStyle;
        switch (style) {
            case "deutsch":
                let listItems = this.props.value.map(item =>
                    <DeutschListItem key={item.id} value={item} onClickTag={this.linkHandler.bind(this)}/>
                );
                return (
                    <div>
                        {listItems}
                    </div>

                );
                break;
            default:
                return (
                    "Error Here"
                );
                break;
        }

    }


}
;

export default List;