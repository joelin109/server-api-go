import React from 'react';
import { Dialog, RaisedButton, FlatButton } from 'material-ui';
import { Step, Stepper, StepButton, } from 'material-ui/Stepper';


class FilterBeer extends React.Component {
    constructor() {
        super();
        this.state = {
            stepIndex: 0,
            stepValue: [0, 10],
        };
    }


    _handleCancel() {
        this.props.onClick({type:"cancel"}, false)
    };

    _handleConfirm() {
        this.props.onClick({type:"confirm"}, this.state.stepValue)
    };

    _handleStep1() {
        this.setState({ stepIndex: 0, stepValue: [0, 8] })
    };
    _handleStep2() {
        this.setState({ stepIndex: 1, stepValue: [8, 13] })
    };
    _handleStep3() {
        this.setState({ stepIndex: 2, stepValue: [13, 26] })
    };


    render() {
        const title = "Sort & Filter"
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this._handleCancel.bind(this)}
            />,
            <FlatButton
                label="Confirm"
                primary={true}
                onTouchTap={this._handleConfirm.bind(this)}
            />,
        ];

        let content = <div style={{ width: '100%', maxWidth: 700, margin: 'auto', height: 400, }}>
            <Stepper linear={false} activeStep={this.state.stepIndex}  orientation="vertical">
                <Step>
                    <StepButton onClick={this._handleStep1.bind(this)}>
                        [0 - 8]
                        </StepButton>
                </Step>
                <Step>
                    <StepButton onClick={this._handleStep2.bind(this)}>
                        [8 - 13]
                        </StepButton>
                </Step>
                <Step>
                    <StepButton onClick={this._handleStep3.bind(this)}>
                        [13 - 26]
                         </StepButton>
                </Step>
            </Stepper>
        </div>


        return (
            <div>
                <Dialog modal={false} open={this.props.open} title={title}
                    actions={actions}
                    autoScrollBodyContent={true}
                    onRequestClose={this._handleCancel.bind(this)}
                >
                    {content}
                </Dialog>
            </div>
        )
    }
}


export default FilterBeer;