import React from "react";
import Keyboard from "./Keyboard";
import KeyBulb from "./KeyBulb";
import Rotors from "./Rotors";
import Display from "./Display";

class Enigma extends React.Component {
    constructor(props) {
        super(props);
        this.config = this.props.config;
        this.state = { lastSignal: "", output: "", encrypted: "", original: "", canPress: true };
        this.keyBoard = React.createRef();
        this.sentence = "";
    }

    onKeyboardPressKey = (letter) => {
        if (this.state.canPress) {
            this.setState({
                canPress: false,
                lastKey: letter,
                lastTimeKeyPressed: Date.now()
            });
        }
    };

    onRotorsFinish = (key) => {
        let letter = this.keyBoard.current.getPair(String.fromCharCode(65 + key));
        let original = this.keyBoard.current.getPair(this.state.lastKey);
        console.log(
            `Keyboard Switch ${String.fromCharCode(65 + key)} to ${letter}`
        );
        this.setState({
            canPress: true,
            output: letter,
            encrypted: this.state.encrypted + letter,
            original: this.state.original + original
        });
    };

    render() {
        return (
            <div className="Enigma">
                <Display encrypted={this.state.encrypted} original={this.state.original}/>

                <KeyBulb display={this.state.output} />
                <Rotors
                    reflector={this.config.reflector}
                    rotors={this.config.rotors}
                    rotorsPositions={this.config.rotorsPositions}
                    keyPressed={this.state.lastKey}
                    lastTimeKeyPressed={this.state.lastTimeKeyPressed}
                    onRotorsFinish={this.onRotorsFinish}
                />
                <Keyboard
                    ref={this.keyBoard}
                    onPressKey={this.onKeyboardPressKey}
                    letters={this.config.letters}
                    plugs={this.config.plugs}
                />
            </div>
        );
    }
}

export default Enigma;
