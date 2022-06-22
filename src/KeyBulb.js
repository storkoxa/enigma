import React from "react";
import "./keybulb.css";

class KeyBulb extends React.Component {
    render() {
        return <div className="digital">{this.props.display}</div>;
    }
}

export default KeyBulb;
