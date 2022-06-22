import React from "react";
import "./keyboard.css";

class Keyboard extends React.Component {
    constructor(props) {
        super(props);
        this.letters = this.props.letters;

        this.lettersMap = new Map();

        //TODO: REMOVE HARD CODE
        this.addMap("A", "B");
        this.addMap("F", "L");
        this.addMap("P", "J");

        //TODO: IMPLEMENT UI TO ADD/EDIT LINKS
    }

    keyPressed(from) {
        console.log(
            `Keyboard: KEY PRESSED: ${from} replace with ${this.getPair(from)}`
        );
        this.props.onPressKey(this.getPair(from));
    }

    addMap(from, to) {
        this.lettersMap.set(from, to);
        this.lettersMap.set(to, from);
    }

    getPair(from) {
        return this.lettersMap.has(from) ? this.lettersMap.get(from) : from;
    }

    render() {
        return (
            <div className="keyboard-base">
                {this.letters.map((line, index) => {
                    return (
                        <div className="line" key={index}>
                            {line.map((letter) => {
                                return (
                                    <div
                                        key={letter}
                                        className={"key letter-" + letter}
                                        onClick={() => this.keyPressed(letter)}
                                    >
                                        {letter}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
                <div className="line">
                    <div className="key space" onClick={this.addLine}>
                        Space
                    </div>
                    <div className="key delete">Delete</div>
                    <div className="key return">Return</div>
                </div>
            </div>
        );
    }
}

export default Keyboard;
