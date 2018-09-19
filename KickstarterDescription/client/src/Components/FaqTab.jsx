import React, { Component} from 'react';
import Question from './Utilities/Question.jsx';
import './Style/FaqTab.css';

class FaqTab extends Component {
    constructor(props) {
        super(props);
    }

    displayQuestions({questions}) {
        if (questions) {
            return questions.map((question, index) => 
                <Question inquiry={question.inquiry}
                        answer={question.answer}
                        lastUpdated={question.lastUpdated}
                        id={index}
                        key={index}/>
            );
        }
    }

    render() {
        return (
            <div className="faqTabContainer" ref="container"> 
                <div className="faqContainer">
                    <div className="questionsDisplay">
                        <p className="faqTitle"> Frequently Asked Questions </p>
                        { this.displayQuestions(this.props) }
                    </div>
                    <div className="askQuestionContainer">
                        <p className="askQuestionText"> 
                            Don't see the answer to your question? 
                            Ask the project creator directly.
                        </p>
                            <div className="askAQuestionButtonDiv">
                                    <button className="askQuestionButton">
                                        <a href="javascript:void(0)">
                                            Ask a question 
                                        </a>
                                    </button> 
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FaqTab;