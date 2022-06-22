import React from "react";
import Rotor from "./Rotor";
import "./rotor.css";

class Rotors extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rotors: this.props.rotorPositions, rotationFinished: true };
        this.rotorsRefs = this.state.rotors.map(() => React.createRef());
        this.reflector = this.props.reflector;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lastTimeKeyPressed !== this.props.lastTimeKeyPressed) {
            this.setState({ rotationFinished: false }, () => {
                this.rotate(0);
            });
        }
    }

    getSecretKey() {
        if (this.props.keyPressed) {
            let keyCode = this.props.keyPressed.charCodeAt(0) - 65;
            let resultIn = this.rotorsRefs.reduce(
                (keyCode, rotorRef) => rotorRef.current.getPair(keyCode),
                keyCode
            );

            let reflector = this.reflector[resultIn];

            console.log(
                `Reflector: ${resultIn} (${String.fromCharCode(
                    65 + resultIn
                )}) out ${reflector} (${String.fromCharCode(65 + reflector)})`
            );

            let resultOut = [...this.rotorsRefs]
                .reverse()
                .reduce(
                    (keyCode, rotorRef) => rotorRef.current.getPairBack(keyCode),
                    reflector
                );
            this.props.onRotorsFinish(resultOut);
        }
    }

    rotate(position) {
        let rotors = [...this.state.rotors];
        let notchPosition = this.props.rotors[position].notchPosition;
        let item = rotors[position];
        item = (item + 1) % 26;
        rotors[position] = item;
        console.log(`Rotate ROTOR #${position} = to ${item}`);
        this.setState({ rotors }, (results) => {
            let nextPosition = position + 1;
            if (nextPosition >= this.state.rotors.length || item !== notchPosition) {
                this.setState({ rotationFinished: true }, () => {
                    this.getSecretKey();
                });
            } else if (item === notchPosition) this.rotate(position + 1);
        });
    }

    render() {
        return (
            <div className="rotors">
                {this.state.rotors.map((rotor, index) => {
                    return (
                        <Rotor
                            ref={this.rotorsRefs[index]}
                            key={index}
                            value={rotor}
                            sequence={this.props.rotors[index]}
                            notch={this.props.rotors[index].notchPosition}
                        />
                    );
                })}
            </div>
        );
    }
}

export default Rotors;
