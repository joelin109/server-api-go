import React from 'react';
import { IconButton, FlatButton, FontIcon, FloatingActionButton } from 'material-ui';
const Style = {
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 8,
    },
}

export const Icon = ({ id }) => {
    let _color = 1 > 10 ? '#bdbdbd' : '#E0E0E0';
    let _hoverColor = '#EF5350';
    return <FontIcon className="material-icons" color={_color} hoverColor={_hoverColor}>{id}</FontIcon>;
}

export const SIcon = ({ id, selected = false }) => {
    let _color = selected ? '#EF5350' : '#757575';
    let _hoverColor = '#EF5350';
    return <FontIcon className="material-icons" color={_color} hoverColor={_hoverColor}>{id}</FontIcon>;
}

export const Button = ({ id, onTouchTap }) => {
    let _icon = <Icon id={id} />;
    return <IconButton className = "header-icon-button" onTouchTap={onTouchTap}>{_icon}</IconButton>
    //return <FlatButton style={Style.button} icon={_icon} onTouchTap={onTouchTap} />
}

export const TButton = ({ text, onTouchTap }) => {
    let _icon = <Icon id={id} />;
    return <FlatButton style={Style.button} label={text} onTouchTap={onTouchTap} />
}


export const Link = ({ id, to }) => {
    let _icon = <Icon id={id} />;
    //return <FlatButton style={Style.button} icon={_icon} href={to} />
    return <IconButton className = "header-icon-button-link" href={to} >{_icon}</IconButton>
}



