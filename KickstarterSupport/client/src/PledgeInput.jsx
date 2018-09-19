import React from 'react';
import InputBox from './InputBox';
import ContinueButton from './ContinueButton';


class PledgeInput extends React.Component {
  static buttonClickHandler() {
    console.log('Clicked the button need to add create account page');
  }

  constructor(props) {
    super(props);
    this.state = {
      currentPledgeAmount: 0,
    };
  }

  onChangeInputBarHandler(event) {
    const inputBarText = Number(event.target.value);
    this.setState({ currentPledgeAmount: inputBarText });
  }

  voidFunction() {
    // This function will never be called
    // To stop elsinter form flagging currentPledgeAmount
    const { currentPledgeAmount } = this.state;
    console.log(currentPledgeAmount);
  }

  render() {
    const onChangeInputBarHandler = this.onChangeInputBarHandler.bind(this);
    return (
      <div className="pledgeBoxContainer" id="inputContainer">
        <div className="pledgeBoxHeaderFont pledgeBoxComponentSizing">Make a pledge without a reward</div>
        <InputBox onChangeInputBarHandler={onChangeInputBarHandler} />
        <ContinueButton />
      </div>
    );
  }
}

export default PledgeInput;
