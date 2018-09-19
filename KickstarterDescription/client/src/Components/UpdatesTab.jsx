import React, { Component} from 'react';
import moment from 'moment';
import Update from './Utilities/Update.jsx';
import Helpers from './Utilities/Helpers.jsx';
import './Style/UpdatesTab.css';

class UpdatesTab extends Component {
    constructor(props) {
        super(props);
    }

    displayUpdates({updates}) {
        if (updates) {
            let direction = 'right';
            updates.sort((a, b) =>
                moment.utc(b.date).diff(moment.utc(a.date))
            );
            return updates.map((update) => {
                if (direction === 'right') {
                    direction = 'left'
                } else {
                    direction = 'right';
                }
                return (
                    <Update event={update.event}
                            title={update.title}
                            date={moment(update.date).format('LL')}
                            paragraph={Helpers.createCliffHanger(update.paragraph)}
                            comments={update.comments}
                            likes={update.likes} 
                            direction={direction}/>
                );
            });
        }
    }

    render() {
        return (
            <div className="updatesTabContainer" ref="container"> 
                <div className="updatesGrowDiv">
                    <div className="updatesMainDiv">
                        <div className="allUpdates">
                            <div className="spaceDiv">
                                <div id="leftLine"></div>
                                <div id="rightLine"></div>
                            </div>
                            {this.displayUpdates(this.props)}
                        </div>
                        <div className="projectLaunchDiv">
                            <div className="projectLaunchDate"> {moment(this.props.launchDate).format('LL')}  </div>
                            <div className="projectLaunchText"> Project launched  </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdatesTab;