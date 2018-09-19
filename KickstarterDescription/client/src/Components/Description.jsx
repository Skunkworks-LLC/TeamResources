import React, { Component} from 'react';
import $ from 'jquery';
import NavBar from './DescriptionNavBar.jsx';
import CampaignTab from './CampaignTab.jsx';
import FaqTab from './FaqTab.jsx';
import UpdatesTab from './UpdatesTab.jsx';
import CommentsTab from './CommentsTab.jsx';
import Velocity from 'velocity-animate';
import ServerManager from './ServerManager.jsx';
import './Style/Description.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.inTransition = false;
        this.tabRequest = null;
        this.state = {
            project: {},
            currentTab: 'campaign'
        }
    }

    componentDidMount() {
        ServerManager.getProject(this.props.projectID).then((project) => {
            this.setState({project: project});
        });
    }
    
    fadeIn(tab, callback) {
        let fadeIn = {opacity: 100, width: 100, flex: 1};
        Velocity($(tab), fadeIn, {
            display: 'block',
            duration: 1500,
            complete: callback
        }, 'ease-in-out');
    }

    fadeOut(tab, callback) {
        let fadeOut = {opacity: 0, width: '0px', flex: 0}
        Velocity($(tab), fadeOut, {
            display: 'none',
            duration: 500,
            complete: callback
        });
    }

    changeTab(newTabName) {
        if (this.state.currentTab === newTabName) return;

        if (!this.inTransition) {
            this.inTransition = true;
            let currentTab = this.refs[this.state.currentTab].refs.container;
            let newTab = this.refs[newTabName].refs.container;
            this.fadeOut(currentTab, () => {
                this.fadeIn(newTab, () => {
                    this.inTransition = false;
                    if (this.tabRequest) {
                        let wantedTabName = this.tabRequest;
                        this.tabRequest = null;
                        this.changeTab(wantedTabName);
                    }
                });
            });
            this.setState({currentTab: newTabName});
        } else {
            this.tabRequest = newTabName;
        }
    }

    render() {
        return (
            <div className="detailsContainer">
                <NavBar changeTab={this.changeTab.bind(this)}
                        currentTab={this.state.currentTab}/>
                <div className="informationDiv">
                    <CampaignTab ref="campaign"
                                 content={this.state.project.campaign}/>
                    <FaqTab ref="faq"
                            questions={this.state.project.faq}/>
                    <UpdatesTab ref="updates"
                                updates={this.state.project.updates}
                                launchDate={this.state.project.launchDate}/>
                    <CommentsTab ref="comments"
                                 comments={this.state.project.comments}
                                 changeTab={this.changeTab.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default App;