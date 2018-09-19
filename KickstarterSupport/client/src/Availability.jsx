import React from 'react';

class Availability extends React.Component {
  constructor(props) {
    super(props);

    const { availability, numBackers } = this.props;
    this.state = {
      isPledgeAvailable: availability,
      numBackers,
    };
  }

  render() {
    const { isPledgeAvailable, numBackers } = this.state;
    const Status = isPledgeAvailable
      ? (<div></div>)
      : (
        <div className="pledgeTextFont" id="pledgeNotAvailable">Reward no longer available</div>
      );

    return (
      <div className="pledgeSubheaderFont pledgeBoxComponentSizing alignLeft">
        {Status}
        <div className="pledgeBoxComponentSizing" style={{ 'marginBottom': '10px' }}>
          {numBackers + ' '}
          <span> backers</span>
        </div>
      </div>
    );
  }
}

export default Availability;


// const Status = isPledgeAvailable
//       ? (
//         <div className="pledgeSubheaderFont pledgeBoxComponentSizing shippingInfoContainer" id="pledgeAvailable">
//           {numBackers + ' '}
//           <span> backers</span>
//         </div>
//       )
//       : (
//         <div className="pledgeBoxComponentSizing">
//           <div className="pledgeTextFont" id="pledgeNotAvailable">Reward no longer available</div>
//         </div>
//       );