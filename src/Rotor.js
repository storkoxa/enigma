import React from "react";
import "./rotor.css";
import { circularNumber } from "./Util.js";

class Rotor extends React.Component {
    constructor(props) {
        super(props);

        this.sequence = this.props.config.sequence
        this.notch =  this.props.config.notchPosition
        this.state = {rotation: this.props.config.currentRotation}

        this.cascadeRotation = this.props.cascadeRotation.bind(this)
        this.rotationFinished = this.props.rotationFinished.bind(this)


        console.log(`Connecting Rotor #${this.props.rotorPosition} = ${this.sequence}/${this.notch} into rottors - initial rotation: ${this.state.rotation}`);
    }

    getPair(position) {
        let posInRotor = circularNumber(position + this.state.rotation, 26);
        let positionOfConnector = circularNumber(
            this.sequence[posInRotor] - this.state.rotation,
            26
        );

        console.log(
            `IN ROTOR: #${this.props.rotorPosition} - get from ${position} + rotation: ${this.state.rotation} = m[${posInRotor}] = ${this.sequence[posInRotor]} connector: ${positionOfConnector}`
        );

        return positionOfConnector;
    }

    getPairBack(position) {
        let posInRotor = circularNumber(position + this.state.rotation, 26);
        let nOutputPosition = this.sequence.indexOf(posInRotor);
        let positionOfConnector = circularNumber(
            nOutputPosition - this.state.rotation,
            26
        );
        console.log(
            `OUT ROTOR: #${this.props.rotorPosition} - get from ${position} + rotation: ${this.state.rotation}, find m[X] = ${posInRotor}, X=${nOutputPosition} - connector = ${positionOfConnector}`
        );

        return positionOfConnector;
    }

    rotate(direction, notifyParent = true) {
        var newRotation = circularNumber(this.state.rotation + direction, 26)
        this.setState({rotation: newRotation})
        if (notifyParent) {
            if (newRotation == this.notch)
                this.cascadeRotation(this.props.rotorPosition + 1)
            else
                this.rotationFinished()
        }
    }


    render() {
        return (
            <div className="rotor">
                <div className="rotorItem" onClick={() => this.rotate(-1, false)}><i className="arrowUp"></i> </div>
                <div className="rotorItem">{circularNumber(this.state.rotation + 24, 26) + 1}</div>
                <div className="rotorItem">{circularNumber(this.state.rotation + 25, 26) + 1}</div>
                <div className="main rotorItem">
                    {circularNumber(this.state.rotation + 26, 26) + 1}
                </div>
                <div className="rotorItem">{circularNumber(this.state.rotation + 27, 26) + 1}</div>
                <div className="rotorItem">{circularNumber(this.state.rotation + 28, 26) + 1}</div>
                <div className="rotorItem" onClick={() => this.rotate(+1, false)}><i className="arrowDown"></i> </div>
            </div>
        );
    }
}

export default Rotor;
export const RotorObj = (sequence, notchPosition, currentRotation) => { return { sequence: sequence, notchPosition: notchPosition, currentRotation: currentRotation } }
