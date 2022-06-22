import React from "react";
import "./rotor.css";
import { createRandomArray, circularNumber } from "./Util.js";

class Rotor extends React.Component {
    constructor(props) {
        super(props);
        this.mapIn = this.props.sequence;
        this.myRef = React.createRef();
        console.log(`Creating map for Rotor #${this.props.hash} = ${this.mapIn}`);
    }

    createMaps(hash) {
        return createRandomArray(26, hash);
    }

    getPair(position) {
        let posInRoter = circularNumber(position + this.props.value, 26);
        let positionOfConnector = circularNumber(
            this.mapIn[posInRoter] - this.props.value,
            26
        );

        console.log(
            `IN ROTOR: #${this.props.hash} - pos ${position} + rotation: ${this.props.value} = m[${posInRoter}] = ${this.mapIn[posInRoter]} connector: ${positionOfConnector}`
        );

        return positionOfConnector;
    }

    getPairBack(position) {
        let posInRoter = circularNumber(position + this.props.value, 26);
        let nOutputPosition = this.mapIn.indexOf(posInRoter);
        let positionOfConnector = circularNumber(
            nOutputPosition - this.props.value,
            26
        );
        console.log(
            `OUT ROTOR: #${this.props.hash} - pos ${position} + rotation: ${this.props.value}, find m[X] = ${posInRoter}, X=${nOutputPosition} - connector = ${positionOfConnector}`
        );

        return positionOfConnector;
    }

    render() {
        return (
            <div className="rotor">
                <div className="rotorItem">{((this.props.value + 24) % 26) + 1}</div>
                <div className="rotorItem">{((this.props.value + 25) % 26) + 1}</div>
                <div className="main rotorItem">
                    {((this.props.value + 26) % 26) + 1}
                </div>
                <div className="rotorItem">{((this.props.value + 27) % 26) + 1}</div>
                <div className="rotorItem">{((this.props.value + 28) % 26) + 1}</div>
            </div>
        );
    }
}

export default Rotor;
