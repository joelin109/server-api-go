/**
 * Created by joe on 2/24/17.
 */
import React from 'react';
import DeutschListItem from './item-article';
import ArticleListItem from './item-deutsch';


class ListDefault extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            style: ""
        }
    }

    _linkHandler(e) {
        this.props.onClick("tag", e);
        return false;
    }

    render() {
        let style = this.props.itemStyle;
        let listItems = ""
        switch (style) {
            case "deutsch":
                listItems = this.props.value.map(item =>
                    <DeutschListItem key={item.id} value={item} onClick={this._linkHandler.bind(this)}/>);

                break;
            case "article":
                listItems = this.props.value.map(item =>
                    <ArticleListItem key={item.id} value={item} onClick={this._linkHandler.bind(this)}/>);
                break;
            default:
                break;
        }

        return (
            <div  style={this.props.style}>
                {listItems}
            </div>
        );
    }


}
;

export default ListDefault;