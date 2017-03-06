import React from 'react';

class Paginator extends React.Component {

    render() {
        let pages = Math.ceil(this.props.total / this.props.pageSize);
        if (pages > 1) {
            return (
                <div style={this.props.style}>

                    <button className={"slds-button slds-button--neutral" + (this.props.page <= 1 ? " slds-hide" : "")}
                            onClick={this.props.onPrevious}>
                        Previous
                    </button>

                    <div className="legend">{this.props.total} beers • page {this.props.page}/{pages}</div>


                    <button
                        className={"slds-button slds-button--neutral" + (this.props.page >= pages ? " slds-hide" : "")}
                        onClick={this.props.onNext}>
                        Next
                    </button>

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