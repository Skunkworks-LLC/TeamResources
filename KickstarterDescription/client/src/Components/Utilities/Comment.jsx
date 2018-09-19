import React, { Component} from 'react';
import moment from 'moment';
import '../Style/Comment.css';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getWidth() {
        let width = this.props.width || 95;
        return {width: `${width}%`};
    }

    displayChildComments({childComments}) {
        if (childComments && childComments.length) {
            return childComments.map((comment, i) => {
                return <Comment text={comment.text}
                                date={comment.date}
                                userIcon={comment.icon}
                                username={comment.username}
                                childComments={comment.childComments}
                                width={this.props.width - 5}
                                key={i} 
                        />
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="commentDiv" ref="container" style={this.getWidth()}>
                    <div className="commentBox">
                        <div className="userDiv">
                            <div className="userInfo">
                                <div className="iconDiv">
                                    <img className="userIcon" src={this.props.userIcon}></img>
                                </div>
                                <div className="nameAndDateDiv">
                                    <div className="nameDiv"> {this.props.username} </div>
                                    <div className="dateDiv"> 
                                        {moment(this.props.date).fromNow()} 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="textDiv">
                            <div className="commentText">
                                { this.props.text }
                            </div>
                        </div>
                    </div>
                </div>
            {this.displayChildComments(this.props)}
            </React.Fragment>
        );
    }
}

export default Comment;