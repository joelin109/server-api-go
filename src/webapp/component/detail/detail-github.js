import React from 'react';


const Image = ({ color }) =>
    <div style={{
        width: '100%',
        height: 400,
        background: color
    }}></div>


export default class DetailGithub extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            channel: '',
            // image: IMAGES[parseInt(props.match.params.id, 10)],
            history: props.history,
        }

    }


    back(e) {
        e.stopPropagation()
        this.state.history.goBack()
    }


    render() {
        
        window.scrollTo(0, 0);

        return (
            <div className = 'detail-root' onClick={this.back.bind(this)}>
                <div className='detail-root-body'>
                    <h1>dgdfgfdgdfgd</h1>
                    <Image color={'#00838F'} />
                    <button type='button' onClick={this.back.bind(this)}>
                        Close
                    </button>
                </div>
            </div>
        );
    }
};