import React, { Component} from 'react';
import moment from 'moment';
import Helpers from './Helpers.jsx';
import '../Style/Fonts/CooperLight/CooperLight.css';
import '../Style/Update.css';

class Update extends Component {
    constructor(props) {
        super(props);
    }

    drawBorder(direction) {
        if (this.refs.leftWall && this.refs.rightWall) {
            if (direction === 'right') {
                this.refs.leftWall.style.borderColor = 'transparent #f1eeea transparent transparent';
                this.refs.rightWall.style.borderColor = '#f1eeea transparent transparent transparent';
            } else {
                this.refs.leftWall.style.borderColor = '#f1eeea #f1eeea transparent transparent';
                this.refs.rightWall.style.borderColor = 'transparent transparent transparent transparent;';
            }
        }
    }

    displayUpdate(wantedDirection) {
        if (this.props.direction === wantedDirection) {
            this.drawBorder(wantedDirection);
            return (
                <React.Fragment>
                    <div className="datePosted"> <b> {this.props.date} </b> </div>
                    <div className="updateTitle"> <a href="javascript:void(0)"> {Helpers.CapitalizeEachLetter(this.props.event)} </a></div>
                    <div className="updateParagraph"> 
                        {this.props.paragraph}
                        <span className="readMore">
                        <a href="javascript:void(0)">Read More</a>
                        </span>
                    </div>
                    <div className="commentsAndLikes"> 
                        <div className="commentsDiv">
                            <a href="javascript:void(0)"> {this.props.comments} comments </a>
                        </div>
                        <div className="likesDiv">
                            <a href="javascript:void(0)"> {this.props.likes} likes </a>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }

    render() {
        return (
            <div className="updateGrow">
                <div className="updateContainer">
                    <div className="leftContainer">
                        {this.displayUpdate('left')}
                    </div>
                    <div className="containerWall" id="leftWall" ref="leftWall"></div>
                    <div className="containerWall" id="rightWall" ref="rightWall"></div>
                    <div className="rightContainer">
                        {this.displayUpdate('right')}
                    </div>
                </div>
            </div>
        );
    }
}

export default Update;