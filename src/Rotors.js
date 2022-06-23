import React from "react";
import Rotor from "./Rotor";
import "./rotor.css";

class Rotors extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rotationFinished: true };
        this.rotorsRefs = this.props.rotors.map(() => React.createRef());
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
        console.log("" + this.props.keyPressed)
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

    rotate(rotorIndex) {
        let rotor = this.rotorsRefs[rotorIndex]
        if (!rotor) {
            this.getSecretKey()
            return
        }
        rotor.current.rotate(+1)
    }

    render() {
        return (
            <div className="rotors">
                {this.props.rotors.map((rotor, index) => {
                    return (
                        <Rotor
                            ref={this.rotorsRefs[index]}
                            key={index}
                            rotorPosition={index}
                            config={this.props.rotors[index]}

                            cascadeRotation={(position) => this.rotate(position)}
                            rotationFinished={() => this.getSecretKey()}
                        />
                    );
                })}
            </div>
        );
    }
}

export default Rotors;
