import React from 'react';


class DeutschListItem extends React.Component {

    _linkHandler(e) {
        this.props.dispatch("tag", e.target.innerHTML);
        return false;
    }

    render() {
        let pills;
        if (this.props.value.tags) {
            let tags = this.props.value.tags.split(', ');
            pills = tags.map(tag =>
                <span className="slds-pill" key={this.props.value.id + '-' + tag}>
                    <a href="#" className="slds-pill__label" onClick={this._linkHandler.bind(this)}>{tag}</a>
                </span>
            );
        }

        return (
            <div key={this.props.value.id}>
                <div>
                    <img src={"pics/" + this.props.value.image} />
                    <span>{this.props.value.name}</span>
                    <p className="level">{parseFloat(this.props.value.alcohol)}</p>
                </div>
                <div>


                    <a href="#"
                        onClick={this._linkHandler.bind(this)}>{this.props.value.brewery}</a>
                    <p>{pills}</p>

                </div>
            </div>
        );
    }
};

export default DeutschListItem;