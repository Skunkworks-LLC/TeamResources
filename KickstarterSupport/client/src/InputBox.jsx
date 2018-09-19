import React from 'react';

class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { onChangeInputBarHandler } = this.props;
    return (
      <div className="inputBarContainer pledgeBoxComponentSizing" style={{ 'marginTop': '5px' }}>
        <div className="inputCurrency" id="currency">$</div>
        <input
          className="pledgeInputBar"
          id="input"
          onChange={e => onChangeInputBarHandler(e)}
          defaultValue={10}
        />
      </div>
    );
  }
}

export default InputBox;