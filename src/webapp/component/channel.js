import React, { Component } from 'react';
import { FlatButton, IconButton, RaisedButton, MenuItem } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import * as act from './../action';


export default class Channel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueSingle: '3',
      valueMultiple: ['3', '5'],
    };
  }


  _linkHandler(e) {
    let _value = e.target.innerHTML
    let _data = [0, 8];
    let _type = act.Action_Channel_Type_Article;
    let _filter = ""

    switch (_value) {
      case "生活":
        _data = [0, 8];
        _type = act.Action_Channel_Type_Article;
        break;

      case "科技":
        _type = act.Action_Channel_Type_Github;
        _filter = "javascript"
        break;

      case "语法":
        _type = act.Action_Channel_Type_Grammar;
        _data = [8, 13];
        break;

      case "单词":
        _type = act.Action_Channel_Type_Word;
        _data = [8, 13];
        break;

      default:
        _data = [13, 26];
        break;
    }
    this.props.dispatch({ type: _type, data: _data, filter: _filter })
    return false;
  }


  _newFlatButton(text) {
    let color = "#bdbdbd"
    let hoverColor = "#EF5350"
    return <FlatButton labelStyle={{ color: '#EEEEEE', fontWeight: 'bold', }} hoverColor={hoverColor} label={text}
      onTouchTap={this._linkHandler.bind(this)} />;
  }

  render() {

    return (
      <div>
        <div className="channel">

          {this._newFlatButton("生活")}
          {this._newFlatButton("科技")}
          {this._newFlatButton("语法")}
          {this._newFlatButton("单词")}

        </div>

      </div>
    );
  }
}