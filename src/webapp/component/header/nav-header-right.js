import React, { Component } from 'react';
import { FlatButton, IconButton, RaisedButton, MenuItem, IconMenu, Badge } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';

const _style = {
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    height: 44,
  },

};

export default class HeaderRight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueSingle: '3',
      valueMultiple: ['3', '5'],
    };
  }


  handleChangeSingle(event, value) {
    this.setState({
      valueSingle: value,
    });
  };

  handleChangeMultiple(event, value) {
    this.setState({
      valueMultiple: value,
    });
  };

  handleOpenMenu() {
    this.setState({
      openMenu: true,
    });
  }

  handleOnRequestChange(value) {
    this.setState({
      openMenu: value,
    });
  }

  _linkHandler(e) {
    this.props.onClick("login", "hello")
  }
  _linkHandler2(e) {
    this.props.onClick("filter", "hello")
  }

  _newFontIcon(id) {
    let color = "#bdbdbd"
    let hoverColor = "#FF9800"
    return <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>{id}</FontIcon>;
  }

  render() {
    let color = "#bdbdbd"
    let hoverColor = "#FF9800"
    let home = this._newFontIcon("home");
    let search = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>search</FontIcon>;
    let filter = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>filter_list</FontIcon>;
    let account = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>person</FontIcon>;
    let more = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>more_horiz</FontIcon>;

    let favorite = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>favorite</FontIcon>;
    let share = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>share</FontIcon>;
    let thumb_up = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>thumb_up</FontIcon>;

    return (
      <div style={_style.right}>

        <FlatButton icon={this._newFontIcon("filter_list")}
          onTouchTap={this._linkHandler2.bind(this)} />
        <FlatButton icon={account}
          onTouchTap={this._linkHandler.bind(this)} />

        <FlatButton icon={this._newFontIcon("home")}
          href="https://github.com/callemall/material-ui"
          target="_blank" />


      </div>
    );
  }
}