import React, { Component} from 'react';
import Script from 'react-load-script';
import './Style/CampaignTab.css';

class CampaignTab extends Component {
    constructor(props) {
        super(props);
    }

    displayContent({content}) {
        let sections = [];
        if (content) {
            sections.push(this.createSection(content.aboutSection));
            content.otherSections.forEach((section, index) => {
                sections.push(this.createSection(section, index));
            });
        }
        return sections;
    }

    createSection(section, index) {
        return (
            <div className="sectionContainer" key={index + Math.random()}>
                <p className="sectionTitle"> <b> {section.title} </b>  </p> 
                <img src={section.image} className="sectionImage"></img>
                <p className="sectionParagraph"> 
                    {section.paragraph}
                </p>
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                <div className="campaignTabContainer" ref="container"> 
                    <div className="campaignDivider">
                        <div className="contentDiv">
                            <div className="aboutText"> About </div>
                            {this.displayContent(this.props)}
                        </div>
                        <div id="supportDiv">
                            <div id="supportText"> Support </div>
                            <div id="support"></div>
                        </div>
                        <Script url="http://127.0.0.1:3005/dist/bundle.js" />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CampaignTab;