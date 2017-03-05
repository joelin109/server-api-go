import React from 'react';
import ItemCardExample from './item-card-mi';

const _style = {
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        maxWidth: 1024,

    },

};


class CardListExample extends React.Component {
    shouldComponentUpdate(nextProps, nextState){
        return true
    }
    render() {

        return (
                <div style={_style.list}>
                    <br />
                    <br />
                    <br />
                    <ItemCardExample src={this.props.value}/>
                    <ItemCardExample src={this.props.value}/>
                    <ItemCardExample src={this.props.value}/>
                    <ItemCardExample src={this.props.value}/>
                    <ItemCardExample src={this.props.value}/>
                    <ItemCardExample src={this.props.value}/>
                    <ItemCardExample src={this.props.value}/>
                    <ItemCardExample src={this.props.value}/>
                     <ItemCardExample src={this.props.value}/>
                    <ItemCardExample src={this.props.value}/>
                     <ItemCardExample src={this.props.value}/>
                    <ItemCardExample src={this.props.value}/>
                     <ItemCardExample src={this.props.value}/>
                    <ItemCardExample src={this.props.value}/>

                    <br />
                    <br />
                    <br />
                </div>

        );
    }
};

export default CardListExample;