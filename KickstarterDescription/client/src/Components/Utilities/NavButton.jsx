import React, { Component} from 'react';
import $ from 'jquery';

class NavButton extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        if (this.props.currentTab === this.props.text.toLowerCase()) {
            this.refs.buttonText.style.fontWeight = 'bold';
        } else {
            this.refs.buttonText.style.fontWeight = '100';
        }
    }

    getPositionAndWidth() {
        let position = $(this.refs.buttonDiv).position();
        let width = $(this.refs.buttonDiv).width();
        return {position: position, width: width};
    }

    render() {
        return (
            <div className="navButtonDiv" 
                 onClick={ this.props.buttonTask }
                 ref="buttonDiv">
                <a href="javascript:void(0)">
                    <div className="navButton" ref="buttonText"> {this.props.text} </div>
                </a>
            </div>
        );
    }
}

export default NavButton;