import React from 'react';
import _ from 'lodash';

class StoreForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeInput: JSON.stringify(props.store || {}),
      warning: ''
    };
    this.processTextArea = _.debounce(this.processTextArea.bind(this), 1000);
    this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
  }

  handleChangeTextArea(event) {
    this.setState({storeInput: event.target.value}, this.processTextArea);
  }

  processTextArea() {
    let newStoreInput = this.state.storeInput;
    try {
      var parsedNewStoreInput = JSON.parse(newStoreInput);
      // this.props.setStore(parsedNewStoreInput);
      this.setState({warning: ''});
    } catch (error) {
      // this.props.setWarning(error.toString());
      this.setState({warning: error.toString()});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lastUpdatedBy !== 'STORE_FORM') {
      this.setState({
        storeInput: JSON.stringify(nextProps.store)
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.warning}
        <textarea value={this.state.storeInput} onChange={this.handleChangeTextArea} ></textarea>
      </div>
    );
  }
}

export default StoreForm;