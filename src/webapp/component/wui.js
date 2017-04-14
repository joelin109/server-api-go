import React from 'react';
import { IconButton, FlatButton, FontIcon, FloatingActionButton } from 'material-ui';
const Style = {
    button: {
        paddingTop: 8,
        paddingLeft: 8,
        paddingBottom: 8,
    },
}

export const Icon = ({ id }) => {
    let _color = 1 > 10 ? '#bdbdbd' : '#E0E0E0';
    let _hoverColor = '#EF5350';
    return <FontIcon className="material-icons" color={_color} hoverColor={_hoverColor}>{id}</FontIcon>;
}

const BIcon = ({ id, defaultColor=false }) => {
    let _color = defaultColor ? '#bdbdbd' : '#E0E0E0';
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
    return <IconButton className="header-icon-button" onTouchTap={onTouchTap}>{_icon}</IconButton>
    //return <FlatButton style={Style.button} icon={_icon} onTouchTap={onTouchTap} />
}

export const TButton = ({ label, onTouchTap }) => {
    let _hoverColor = "#EF5350"
    let _style = { color: '#EEEEEE', fontWeight: 'bold', paddingBottom: 10 }

    return <FlatButton
        labelStyle={_style} hoverColor={_hoverColor}
        label={label} onTouchTap={onTouchTap}
    />
}


export const SButton = ({ id, label, onTouchTap }) => {
    let _icon = <BIcon id={id} defaultColor={true} />;
    let _hoverColor = "#EF5350"
    let _labelStyle = { color: '#616161', fontWeight: 'normal', paddingBottom: 8}

    return <FlatButton
        style={Style.button}
        icon={_icon}
        labelStyle={_labelStyle}
        label={label} onTouchTap={onTouchTap}
    />
}


export const Link = ({ id, to }) => {
    let _icon = <Icon id={id} />;
    //return <FlatButton style={Style.button} icon={_icon} href={to} />
    return <IconButton className="header-icon-button-link" href={to} >{_icon}</IconButton>
}



