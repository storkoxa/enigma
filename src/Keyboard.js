import React  from "react";
import "./keyboard.css";
import Xarrow from "react-xarrows";

const boxStyle = {border: "grey solid 2px", borderRadius: "10px", padding: "5px"};
const arrowProps = {
    dashness:{ animation: 1 },
    path: "grid",
    headSize: 4,
    showTail: true,
    tailSize: 4,
    headShape: "circle",
    tailShape: "circle",

}
const colors = ['#e6194BAA', '#3cb44bAA', '#ffe119AA', '#4363d8AA', '#f58231AA', '#911eb4AA', '#42d4f4AA', '#f032e6AA', '#bfef45AA', '#fabed4AA', '#469990AA', '#dcbeffAA', '#9A6324AA', '#fffac8AA', '#800000AA', '#aaffc3AA', '#808000AA', '#ffd8b1AA', '#000075AA', '#a9a9a9AA']



class Keyboard extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.letters = this.props.letters;
        this.state = { showPlugs: true, plugs: this.mapPlugs(this.props.plugs) }


        //TODO: IMPLEMENT UI TO ADD/EDIT LINKS
    }

    keyPressed(from) {
        console.log(
            `Keyboard: KEY PRESSED: ${from} replace with ${this.getPair(from)}`
        );
        this.props.onPressKey(this.getPair(from));
    }

    getPair(from) {
        return this.state.plugs.has(from) ? this.state.plugs.get(from) : from;
    }

    mapPlugs(list)  {
        let mapLetter = new Map();
        let letters = this.letters.flat()
        list.toUpperCase().split(" ").forEach(pairs => {
            if ((pairs.length >= 2) && (letters.includes(pairs[0])) && (letters.includes(pairs[1]))) {
                mapLetter.set(pairs[0], pairs[1])
                mapLetter.set(pairs[1], pairs[0])
            } else if ((pairs.length == 1) && (letters.includes(pairs[0]))) {
                mapLetter.set(pairs[0], pairs[0])
            }
        })
        return mapLetter
    }

    handleChange(event) {
        this.setState({plugs: this.mapPlugs(event.target.value)});
    }

    render() {
        let plugs = null;
        let plugsList = null

        if (this.state.showPlugs) {
            let uniqueKeys = Array.from(this.state.plugs.keys()).reduce((acc, k)  => { if (acc.indexOf(this.state.plugs.get(k)) == -1) acc.push(k); return acc } , [])
            let uniquePairs = uniqueKeys.map(k => k + this.state.plugs.get(k)).join(" ")
            plugsList = (<div>Edit: <input type={"text"} defaultValue={uniquePairs}  onChange={this.handleChange} /></div>)
            plugs = uniqueKeys.map((k, i) => {
               return (<Xarrow  key={k+this.getPair(k)} start={"letter-"+k} end={"letter-"+this.getPair(k)} color={colors[i]} {...arrowProps} />)
            })

        }

        return (

            <div className="allKeyboard">
                <div class="plugs">
                    <div>
                        <input className="checkbox" type="checkbox"  checked={this.state.showPlugs} />
                        <label htmlFor="toggle" className="switch" onClick={() => { this.setState({showPlugs: !this.state.showPlugs }) }}></label>
                        Show plugs
                    </div>
                    {plugsList}
                </div>
                <div className="keyboard-base">
                    {this.letters.map((line, index) => {
                        return (
                            <div className="line" key={index}>
                                {line.map((letter) => {
                                    return (
                                        <div
                                            key={letter}
                                            className={"key"}
                                            onClick={() => this.keyPressed(letter)}
                                        >
                                             <div id={"letter-"+letter} className={"innerKey"}></div>
                                            {letter}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                {plugs}
            </div>
        );
    }
}

export default Keyboard;
