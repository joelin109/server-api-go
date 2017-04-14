import React from 'react';
import * as act from './../../setting/action'
import WordList from './word-list'
import WordListFilter from './word-list-filter'
import NewWord from './new-word'


export default class Word extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterVisible: false,
      editVisible: false,
      editObject: {},
    };

    this._dispatch_list = this._dispatch_list.bind(this);
    this._dispatch_list_filter = this._dispatch_list_filter.bind(this);
    this._dispatch_list_item = this._dispatch_list_item.bind(this);
    this._dispatch_list_item_update = this._dispatch_list_item_update.bind(this);

    this.state.filterVisible = props.open;
  }

  componentWillReceiveProps(nextProps) {
    this.state.filterVisible = nextProps.open;
  }


  _dispatch_list(action) {

    switch (action.type) {
      case act.Action_List_Article_Tag:
        this._action_list_article_tag(action.data)
        break;
      case act.Action_Admin_Word_List_Sort:
        alert(action.data)
        break;

      default:
        //this.props.dispatch(action, action.data)
        break;
    }
    return false;
  }

  _dispatch_list_filter(action) {
    this.setState({
      filterVisible: false,
      editVisible: false
    });

    return false;
  }

  _dispatch_list_item(action) {
    let _item = action.data;
    switch (action.type) {
      case act.Action_Admin_Word_List_Item_Modify:
        this.setState({
          filterVisible: false,
          editVisible: true,
        });
        break;

      default:
        //this.props.dispatch(action, action.data)
        break;
    }
    return false;
  }

  _dispatch_list_item_update(action) {

  }


  render() {
    let _filterVisible = this.state.filterVisible;
    let _editVisible = _filterVisible ? false : this.state.editVisible;
    let _willUpdate = !_filterVisible && !_editVisible;

    return (
      <div>
        <WordList
          source={this.props.source}
          pageSize={this.state.pageSize} total={this.state.total} page={this.state.page}
          dispatch={this._dispatch_list}
          dispatch_item={this._dispatch_list_item}
          refresh={_willUpdate} />

        <WordListFilter
          open={_filterVisible}
          dispatch_filter={this._dispatch_list_filter}
        />

        <NewWord
          open={_editVisible}
          source={this.state.editObject}
          dispatch_item_update={this._dispatch_list_item_update}
        />
      </div>
    );
  }
}