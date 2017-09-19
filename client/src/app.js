import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import reducer from './reducers';
import store from './reduxStore';
import OutputComponentList from './components/OutputComponentList';
import Tree from './components/Tree';
import OutputStoreForm from './components/OutputStoreForm';
import OutputActionsForm from './components/OutputActionsForm';
import SubmitForm from './components/SubmitForm';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { CSSTransitionGroup } from 'react-transition-group'

class ConnectedApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displays: 4,
      displayOutputComponentsList: true,
      displayTree: true,
      displayOutputStoreForm: true,
      displayOutputActionsForm: true
    };
  }

  handleClickComponents() {
    let displayOutputComponentsList = this.state.displayOutputComponentsList;
    let displays = displayOutputComponentsList ? this.state.displays - 1 : this.state.displays + 1;
    this.setState({displays, displayOutputComponentsList: !displayOutputComponentsList});
  }

  handleClickTree() {
    let displayTree = this.state.displayTree;
    let displays = displayTree ? this.state.displays - 1 : this.state.displays + 1;
    this.setState({displays, displayTree: !displayTree});
  }

  handleClickStore() {
    let displayOutputStoreForm = this.state.displayOutputStoreForm;
    let displays = displayOutputStoreForm ? this.state.displays - 1 : this.state.displays + 1;
    this.setState({displays, displayOutputStoreForm: !displayOutputStoreForm});
  }

  handleClickActions() {
    let displayOutputActionsForm = this.state.displayOutputActionsForm;
    let displays = displayOutputActionsForm ? this.state.displays - 1 : this.state.displays + 1;
    this.setState({displays, displayOutputActionsForm: !displayOutputActionsForm});
  }

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div className="container">
            <nav className="navbar navbar-toggleable-md navbar-custom">
              <button className="navbar-toggler navbar-toggler-right collapsed purple"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <h1 className="navbar-brand">
                <a href="" className="navbar-brand">Redux-Kit-N</a>
              </h1>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <div className="nav-link purple pointer"
                      onClick={this.handleClickComponents.bind(this)}>Components</div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-link purple pointer"
                      onClick={this.handleClickTree.bind(this)}>App Tree</div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-link purple pointer"
                      onClick={this.handleClickStore.bind(this)}>Store Schema</div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-link purple pointer"
                      onClick={this.handleClickActions.bind(this)}>Actions</div>
                  </li>
                </ul>
              </div>
            </nav>
            
            <CSSTransitionGroup className="row no-gutters pageContent"
                transitionName="pageSection"
                transitionEnterTimeout={500}
                transitionLeave={false}>
              {this.state.displayOutputComponentsList && 
                <OutputComponentList key={1} colWidth={`col-lg-${12 / this.state.displays} pageSection`} />}
              {this.state.displayTree && 
                <Tree key={2} colWidth={`col-lg-${12 / this.state.displays} pageSection`} />}
              {this.state.displayOutputStoreForm && 
                <OutputStoreForm key={3} colWidth={`col-lg-${12 / this.state.displays} pageSection`} />}
              {this.state.displayOutputActionsForm && 
                <OutputActionsForm key={4} colWidth={`col-lg-${12 / this.state.displays} pageSection`} />}
            </CSSTransitionGroup>
            
            <SubmitForm />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
};

ReactDOM.render(<ConnectedApp />, document.getElementById('root'));
