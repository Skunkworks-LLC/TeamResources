import React, { Component} from 'react';
import NavButton from './Utilities/NavButton.jsx';
import NavigationLine from './Utilities/NavigationLine.jsx';
import Heart from '../Images/Heart.png';
import $ from 'jquery';
import Velocity from 'velocity-animate';
import './Style/DescriptionNavBar.css';

class DescriptionNavBar extends Component {
    constructor(props) {
        super(props);
    }

    changeTab(newTab) {
        this.props.changeTab(newTab)
    }

    clickButton(button, amount) {
        Velocity($(button), {translateY: `-${amount}px`}, 80, 'easeInOut', () => {
            Velocity($(button), {translateY: "0px"}, 120, 'easeInOut');
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="detailsNav">
                    <div className="navSpace"></div>
                    <div className="lineAndButtonContainer">
                        <div className="navButtonsContainer">
                            <NavButton text="Campaign" 
                                    buttonTask={() => { this.changeTab('campaign')}}
                                    currentTab={this.props.currentTab}
                                    ref="campaignButton"/>
                            <NavButton text="FAQ" 
                                    buttonTask={() => { this.changeTab('faq')}}
                                    currentTab={this.props.currentTab}
                                    ref="faqButton"/>
                            <NavButton text="Updates" 
                                    buttonTask={() => { this.changeTab('updates')}}
                                    currentTab={this.props.currentTab}
                                    ref="updatesButton"/>
                            <NavButton text="Comments" 
                                    buttonTask={() => { this.changeTab('comments')}}
                                    currentTab={this.props.currentTab}
                                    ref="commentsButton"/>
                        </div>
                        <NavigationLine currentTab={this.props.currentTab}
                                buttons={this.refs}/>
                    </div>
                    <div className="backProjectContainer">
                        <div className="backProjectDiv">
                            <a href="javascript:void(0)" onClick={(e) => {this.clickButton(e.target, 60)}}>
                                    <div className="buttonDiv" ref="backProjectButton">
                                        <div className="backProjectButton">
                                                Back this project
                                        </div>
                                    </div>
                                </a>
                        </div>
                        <div className="remindMeDiv" onClick={(e) => {this.clickButton(e.target, 5)}}> 
                            <div className="remindMeButton" >
                                <img className="heartImg" src={Heart}></img>
                                <div className="remindMeText"> 
                                    <a href="javascript:void(0)">
                                        Remind me
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navSpace"></div>
                </div>
            </React.Fragment>
        );
    }
}

export default DescriptionNavBar;