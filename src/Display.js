import React from "react";
import "./display.css";

class Display extends React.Component {
    render() {
        let encrypted = this.props.encrypted.match(/.{0,5}/g).join(" ")
        return (<div className="display">
            <div className="box"><p className="title">Original:</p><p className="message">{this.props.original}</p></div>
            <div className="box"><p className="title">Encrypted:</p><p className="message">{encrypted}</p></div>
        </div>);
    }
}

export default Display;
