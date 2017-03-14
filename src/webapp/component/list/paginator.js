import React from 'react';
import { FlatButton } from 'material-ui';

class Paginator extends React.Component {



    render() {
        let pages = Math.ceil(this.props.total / this.props.pageSize);
        let hoverColor = "#EF5350"
        let style = { color: '#EEEEEE' }
        if (pages > 1) {
            return (
                <div style={this.props.style}>

                    <FlatButton labelStyle={style} hoverColor={hoverColor}
                        backgroundColor={(this.props.page <= 1 ? 'transparent' : '#00838F')}
                        label={'Previous'} disabled={(this.props.page <= 1)}
                        onTouchTap={this.props.onPrevious} />


                    <div className="legend">{this.props.total}  • page {this.props.page}/{pages}</div>


                    <FlatButton labelStyle={style} hoverColor={hoverColor}
                        backgroundColor={(this.props.page >= pages ? 'transparent' : '#00838F')}
                        label={'Next'} disabled={(this.props.page >= pages)}
                        onTouchTap={this.props.onNext} />

                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }
}
;

export default Paginator;