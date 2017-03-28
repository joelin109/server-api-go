import React from 'react';


class ArticleListItem extends React.Component {

    linkHandler(e) {
        this.props.onClick(e.target.innerHTML);
        return false;
    }

    render() {
        let pills;
        if (this.props.value.tags) {
            let tags = this.props.value.tags.split(', ');
            pills = tags.map(tag =>
                <span className="slds-pill" key={this.props.value.id + '-' + tag}>
                    <a href="#" className="slds-pill__label" onClick={this.linkHandler.bind(this)}>{tag}</a>
                </span>
            );
        }

        return (
            <div key={this.props.value.id}>
                <div>
                    <img src={"pics/" + this.props.value.image}/>
                    <span>{this.props.value.name}</span>
                    <p className="level">{parseFloat(this.props.value.alcohol)}</p>
                </div>
                <div>


                    <a href="#"
                       onClick={this.linkHandler.bind(this)}>{this.props.value.brewery}</a>
                    <p>{pills}</p>

                </div>
            </div>
        );
    }
};

export default ArticleListItem;