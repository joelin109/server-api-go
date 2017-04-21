import React from 'react';
import { IconButton, FlatButton, FontIcon, FloatingActionButton } from 'material-ui';
const Style = {
    button: {
        paddingTop: 8,
        paddingLeft: 8,
        paddingBottom: 8,
    },
}
const _hoverColor = '#EF5350';

export const Icon = ({ id }) => {
    let _color = 1 > 10 ? '#bdbdbd' : '#E0E0E0';
    return <FontIcon className="material-icons" color={_color} hoverColor={_hoverColor}>{id}</FontIcon>;
}

const BIcon = ({ id, defaultColor = false }) => {
    let _color = defaultColor ? '#bdbdbd' : '#E0E0E0';
    return <FontIcon className="material-icons" color={_color} hoverColor={_hoverColor}>{id}</FontIcon>;
}

export const SIcon = ({ id, selected = false }) => {
    let _color = selected ? '#EF5350' : '#757575';
    return <FontIcon className="material-icons" color={_color} hoverColor={_hoverColor}>{id}</FontIcon>;
}

export const SButton = ({ id, selected = false, onTouchTap }) => {
    let _icon = <SIcon id={id} selected={selected} />
    return <IconButton className="base-button" onTouchTap={onTouchTap}>{_icon}</IconButton>
    //return <FlatButton style={Style.button} icon={_icon} onTouchTap={onTouchTap} />
}

export const ColorButton = ({ id, color, onTouchTap }) => {

    let _icon = <FontIcon className="material-icons" color={color} hoverColor={_hoverColor}>{id}</FontIcon>;
    return <IconButton className="base-button" onTouchTap={onTouchTap}>{_icon}</IconButton>
}

export const Button = ({ id, onTouchTap }) => {
    let _icon = <Icon id={id} />
    return <IconButton className="base-button" onTouchTap={onTouchTap}>{_icon}</IconButton>
    //return <FlatButton style={Style.button} icon={_icon} onTouchTap={onTouchTap} />
}

export const TButton = ({ label, onTouchTap }) => {
    let _hoverBgColr = '#E57373';
    let _style = { color: '#BDBDBD', fontWeight: 'bold', paddingBottom: 10 }
    return <FlatButton
        labelStyle={_style} hoverColor={_hoverBgColr}
        label={label} onTouchTap={onTouchTap}
    />
}


export const SuperButton = ({ id, label, onTouchTap }) => {
    let _icon = <BIcon id={id} defaultColor={true} />;
    let _labelStyle = { color: '#616161', fontWeight: 'normal', paddingBottom: 8 }

    return <FlatButton
        style={Style.button}
        icon={_icon}
        labelStyle={_labelStyle}
        label={label} onTouchTap={onTouchTap} />

}

export const FloatingButton = ({ id = 'save', className = 'colr-dark loc-btm-1', onTouchTap }) => {
    let _className = `float-button ${className}`;
    let _colorButton = <ColorButton id={id} color={'#00838F'} onTouchTap={onTouchTap} />
    let _button = <Button id={id} onTouchTap={onTouchTap} />


    return <div className="loc-left-box">
        <div className={_className}>

            {_className.indexOf('colr-light') > 0 ? _colorButton : _button}

        </div>
    </div>
}


export const Link = ({ id, to }) => {
    let _icon = <Icon id={id} />;
    //return <FlatButton style={Style.button} icon={_icon} href={to} />
    return <IconButton className="header-icon-button-link" href={to} >{_icon}</IconButton>
}



