import React from 'react';
import { LinearProgress } from 'material-ui';
import * as tag from './../item/tag';
import ItemGithub from './../item/item-github-mi';
import ItemCard from './../item/item-card-mi';


export default class ListCard extends React.Component {

    _getItem(type, item) {
        let _item = ''
        switch (type) {
            case tag.List_Item_Github:
                _item = <ItemGithub key={item.id} value={item} dispatch={this.props.dispatch} />;
                break;

            case tag.List_Item_Card:
                _item = <ItemCard key={item.id} value={item} dispatch={this.props.dispatch} />
                break;

            default:
                break;
        }
        return _item
    }

    render() {

        let _itemTag = this.props.itemTag;
        let listItems = <div className='root-list-default'>
            <div className='root-list-default-loading'>
                <LinearProgress mode="indeterminate" />
            </div>
        </div>;

        if (this.props.resource.length > 0) {
            listItems = this.props.resource.map(item =>
                this._getItem(_itemTag, item)
            );
        }

        return (
            <div className='root-list'>
                {listItems}
            </div>
        );
    }
};
