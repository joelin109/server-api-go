import React from 'react';
import * as _tag from './tag';
import ItemGithub from './item-github-mi';
import ItemCard from './item-card-mi';
import ItemArticle from './item-article';

const Item = ({ tag, value, dispatch }) => {
    switch (tag) {
        case _tag.List_Item_Github:
            return <ItemGithub key={value.id} value={value} dispatch={dispatch} />;
            break;

        case _tag.List_Item_Card:
            return <ItemCard key={value.id} value={value} dispatch={dispatch} />
            break;

        case _tag.List_Item_Article:
            return <ItemArticle value={value} dispatch={dispatch} />
            break;

        default:
            return <div></div>
            break;
    }

}

export default Item;