import React, { Component } from 'react';
import './Drawcard.css';

class Drawcard extends Component {
    constructor(props) {
        super(props);

        this.drawcard = this.drawcard.bind(this);
    }

    drawcard() {
        this.props.drawcard();
    }

    render(props) {
        return (
            <div className="buttonContainer">
                <button className="btn" onClick={this.drawcard}>draw card</button>
            </div>
        )
    }
}

export default Drawcard;