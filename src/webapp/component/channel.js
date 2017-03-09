import React, { Component } from 'react';
import { FlatButton, IconButton, RaisedButton, MenuItem } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import Style from './../util/style'


export default class Channel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueSingle: '3',
      valueMultiple: ['3', '5'],
    };
  }


  _linkHandler(e) {
    let value = e.target.innerHTML
    switch (value) {
      case "生活":
        this.props.onClick({ type: "channel" }, [8, 13])
        break;
      case "科技":
        this.props.onClick({ type: "github" }, [8, 13])
        break;
      case "语法":
        this.props.onClick({ type: "channel" }, [8, 13])
        break;
      default:
        this.props.onClick({ type: "channel" }, [13, 26])
        break;
    }
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
        <div style={Style.channel}>

          {this._newFlatButton("生活")}
          {this._newFlatButton("科技")}
          {this._newFlatButton("语法")}
          {this._newFlatButton("单词")}

        </div>
        <div style={{ height: 8, background: '#007E70', }}>
        </div>
      </div>
    );
  }
}