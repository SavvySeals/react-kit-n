import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import utilities from '../utilities/index';
import OutputStoreRow from './OutputStoreRow';
import OutputStoreEdit from './OutputStoreEdit';
import unboundActions from '../actions';
import store from '../reduxStore';

let actions = bindActionCreators(unboundActions, store.dispatch);

class OutputStoreForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeInput: JSON.stringify({})
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
      this.props.actions.setOutputStore(parsedNewStoreInput, 'STORE_FORM');
    } catch (error) {
      this.props.actions.setOutputStoreWarning(error.toString(), 'STORE_FORM');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.outputStore.lastUpdatedBy !== 'STORE_FORM') {
      this.setState({
        storeInput: JSON.stringify(nextProps.outputStore.outputStore)
      });
    }
  }

  handleClickAdd() {
    actions.toggleEditStoreModal(['newProperty']);
  }

  render() {
    return (
      <div className="col-lg-3">
        <div className="outputStoreSchemaHeading">
          <h4>Store Schema</h4>
          <i className="material-icons addButton pointer purple"
            onClick={this.handleClickAdd.bind(this)}>add</i>
        </div>
        <div className="outputStoreFormTextArea"> 
          {utilities.outputStore.generateStoreArray(this.props.outputStore.properties, OutputStoreRow, actions.toggleEditStoreModal)}
        </div>
        <OutputStoreEdit />
      </div>
    );
  }  
}

//this.props.outputStore.properties

OutputStoreForm = connect(
  (state) => (
    {outputStore: state.outputStore}
  )
)(OutputStoreForm);

export default OutputStoreForm;