import React, { Component} from 'react';
import $ from 'jquery';
import Velocity from 'velocity-animate';
import '../Style/NavigationLine.css';

class NavigationLine extends Component {
    constructor(props) {
        super(props);
        this.hasLoaded = false;
    }

    componentDidMount() {
        $(window).resize(() => {
            this.changeDimensions();
        });
    }

    componentDidUpdate() {
        this.animateDimensions();
    }

    getWantedDimensions({currentTab, buttons}) {
        if (currentTab && buttons) {
            let button = buttons[`${currentTab}Button`].getPositionAndWidth();
            let pos = button.position.left + 15;
            let width = button.width + 15;
            if (!this.hasLoaded) {              // For some reason the line starts to the right upon loading
                pos-=6;
                this.hasLoaded = true;
            }
            return {pos: pos, width: width};
        }
    }

    changeDimensions() {
        let {pos, width} = this.getWantedDimensions(this.props);
        if (pos && width) {
            $(this.refs.navLine).css({  left: `${pos}px`,
                                        width:`${width}px`});
        }
    }

    animateDimensions() {
        let {pos, width} = this.getWantedDimensions(this.props);
        if (pos && width) {
            Velocity($(this.refs.navLine), {  left: `${pos}px`,
                                              width:`${width}px` });
        }
    }

    render() {
        return (
            <div className="navigationLineDiv" ref="navLineDiv">
                <div className="navLine" ref="navLine">
                </div>
            </div>
        );
    }
}

export default NavigationLine;