import React, { Component} from 'react';
import Comment from './Utilities/Comment.jsx';
import './Style/CommentsTab.css';

class CommentsTab extends Component {
    constructor(props) {
        super(props);
    }

    displayComments({comments}) {
        if (comments) {
            return comments.map((comment, i) => {
                return <Comment text={comment.text}
                                date={comment.date}
                                userIcon={comment.icon}
                                username={comment.username}
                                childComments={comment.childComments}
                                width={95}
                                key={i} 
                        />
            });
        }
    }

    render() {
        return (
            <div className="commentsTabContainer" ref="container"> 
                <div className="expansionDiv">
                    <div className="mainCommentsDiv">
                        <div className="commentsContainer">
                            <div className="allCommentsBox">
                                <div className="allComments">
                                    { this.displayComments(this.props) }
                                </div>
                            </div>
                        </div>
                        <div className="useThisSpaceContainer">
                            <div className="useThisSpaceDiv">
                                <div className="useThisSpaceBox">
                                    <div className="cheerCreator">
                                    Use this space to cheer the creator along, and talk to your fellow backers.
                                    </div>
                                    <div className="haveAQuestion">
                                    <p> Have a question? </p>
                                    <p className="checkoutFAQ"> 
                                        <a href="javascript:void(0)" id="faqLink"
                                                    onClick={()=>{this.props.changeTab('faq')}}> 
                                            Checkout the FAQ. 
                                        </a>
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentsTab;