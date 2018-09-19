import React from 'react';

class ContinueButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <button
        className="inputButton pledgeBoxComponentSizing"
        id="continueButton"
        type="button"
      >
        Continue
      </button>
    );
  }
}

export default ContinueButton;
