import React from 'react';

class ShippingInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { estimatedShipping, shipsToAnywhere } = this.props;

    const shipsTo = shipsToAnywhere
      ? <span style={{ 'color': 'black' }}>Anywhere in the world</span>
      : <span style={{ 'color': 'black' }}>Only certain countries</span>;
    return (
      <div className="shippingInfoContainer pledgeBoxComponentSizing">
        <div className="shippingInfo" id="estimatedShipping">
          <div className="pledgeSubheaderTitle noBottomMargin">ESTIMATED DELIVERY</div>
          <span syle={{ 'color': 'black' }}>{estimatedShipping}</span>
        </div>
        <div className="shippingInfo">
          <div className="pledgeSubheaderTitle noBottomMargin">SHIPS TO</div>
          {shipsTo}
        </div>
      </div >
    );
  }
}

export default ShippingInfo;
