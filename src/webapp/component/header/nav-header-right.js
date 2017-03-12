import React, { Component } from 'react';
import { FlatButton, IconButton, RaisedButton, MenuItem, IconMenu, Badge } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import Style from './../../util/style'


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
    this.props.onClick({type:"login"}, "hello")
  }
  _linkHandler2(e) {
    this.props.onClick({type:"filter"}, "hello")
  }

  _newFontIcon(id) {
    let color = "#bdbdbd"
    let hoverColor = "#EF5350"
    return <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>{id}</FontIcon>;
  }

  render() {
    let color = "#bdbdbd"
    let hoverColor = "#EF5350"
    let search = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>search</FontIcon>;
    let more = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>more_horiz</FontIcon>;
    let favorite = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>favorite</FontIcon>;
    let share = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>share</FontIcon>;
    let thumb_up = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>thumb_up</FontIcon>;

    return (
      <div style={Style.headerRight}>

        <FlatButton icon={this._newFontIcon("search")}
          onTouchTap={this._linkHandler2.bind(this)} />

        <FlatButton icon={this._newFontIcon("person")}
          onTouchTap={this._linkHandler.bind(this)} />

        <FlatButton icon={this._newFontIcon("home")}
          href="https://github.com/callemall/material-ui"
          target="_blank" />


      </div>
    );
  }
}