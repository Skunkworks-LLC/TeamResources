import React, { Component} from 'react';
import moment from 'moment';
import '../Style/Question.css';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAnswer: false
        }
    }

    toggleAnswer({style}) {
        let shouldShowAnswer = !this.state.showAnswer;
        style.display = (shouldShowAnswer) ? 'block' : 'none';
        this.setState({showAnswer: shouldShowAnswer});
    }

    render() {
        return (
            <div className="questionBox" onClick={() => {this.toggleAnswer(this.refs.answer)}}>
                <div className="questionContent">
                    <p className="questionText"> {this.props.inquiry} </p>
                    <div className="answer" ref="answer"> 
                        <p className="answerText"> {this.props.answer} </p>
                        <p className="answerDate"> {moment(this.props.lastUpdated).format('LL')} </p> 
                    </div>
                </div>
                <div className="arrowContainer"> > </div>
            </div>
        );
    }
}

export default Question;