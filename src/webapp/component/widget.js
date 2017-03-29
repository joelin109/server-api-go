import React from 'react';
import spacing from 'material-ui/styles/spacing';
import transitions from 'material-ui/styles/transitions';
import typography from 'material-ui/styles/typography';
import { grey400 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import withWidth, { MEDIUM, LARGE } from 'material-ui/utils/withWidth'

const desktopGutter = spacing.desktopGutter;
const desktopKeylineIncrement = spacing.desktopKeylineIncrement;
const Style = {
    widget: {
        width: '100%',
        height: 'auto',
        background: '#EEEEEE',
        margin: 0,
        padding: 0,
    },
    heading: {
        fontSize: 20,
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
        fontWeight: typography.fontWeightMedium,
        color: typography.textDarkBlack,
        backgroundColor: grey400,
        textAlign: 'center',
        margin: 0,
        padding: 0,
        lineHeight: `${desktopKeylineIncrement}px`
    },

};

export default class Widget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            zDepth: 0
        };
    }

    handleMouseEnter() {
        this.setState({
            zDepth: 4
        });
    }

    handleMouseLeave() {
        this.setState({
            zDepth: 0
        });
    }

    render() {

        return (
            <Paper
                style={Style.widget}
                zDepth={this.state.zDepth}
                onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseLeave={this.handleMouseLeave.bind(this)}
            >
                <h3 style={Style.heading}>{this.props.heading}</h3>
                <div className="recommend-widget-img-c">
                    <img className="recommend-widget-img" src={this.props.imageSrc} />
                </div>
            </Paper>
        );
    }

}

