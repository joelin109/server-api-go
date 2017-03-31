import React from 'react';
import { FlatButton, FontIcon } from 'material-ui';
const Style = {
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 6,
    },
}

export const Icon = ({ id }) => {
    let _color = '#bdbdbd';
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
    return <FlatButton style={Style.button} icon={_icon} onTouchTap={onTouchTap} />
}

export const Link = ({ id, to }) => {
    let _icon = <Icon id={id} />;
    return <FlatButton style={Style.button} icon={_icon} href={to} />
}

