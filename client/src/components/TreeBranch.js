import React from 'react';
import Popover from 'material-ui/Popover';
import store from '../reduxStore';
import unboundActions from '../actions';
import {bindActionCreators} from 'redux';
import TreeBranchPropOrAction from './TreeBranchPropOrAction';
import _ from 'lodash';

let actions = bindActionCreators(unboundActions, store.dispatch);

class TreeBranch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      expanded: false,
      connectStoreError: false,
    };

    this.handleClickConnect = this.handleClickConnect.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }


  handleDragOver(event) {
    event.preventDefault();
  }

  handleDrop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData('text');
    actions.addChildComponent({parent: this.props.id, child: data});
  }

  handleClickEdit() {
    actions.openEditComponentModel(this.props.id, this.props.availableProps);
  }

  handleMouseEnter() {
    this.setState({hover: true});
  }

  handleMouseLeave() {
    this.setState({hover: false});
  }

  handleClickConnect() {
    if (this.props.connectionCanBeToggled) {
      actions.toggleComponentConnection(this.props.id);
    } else {
      this.setState({connectStoreError: true}, function() {
        setTimeout(this.hideConnectStoreError.bind(this), 1500);
      });
    }
  }

  hideConnectStoreError() {
    this.setState({connectStoreError: false});
  }

  handleSelectAction(event) {
    this.setState({selectedAction: event.target.value});
  }

  getActionIcons() {
    let showConnectIcon = (
      (
        this.state.hover ||
        this.state.expanded
      ) &&
      !this.props.outputComponent.connected &&
      !this.props.inheritsConnection
    );
    let showDisconnectIcon = this.props.outputComponent.connected;
    let showEditIcon = this.state.hover;

    let actionIcons = [
      {show: showDisconnectIcon, class: 'reactBlue', onClick: this.handleClickConnect, icon: 'link'},
      {show: showConnectIcon, onClick: this.handleClickConnect, icon: 'link'},
      {show: showEditIcon, onClick: this.handleClickEdit, icon: 'edit'},
    ];

    return actionIcons.map((icon, i) => {
      if (icon.show) {
        return (
          <i
            key={i}
            className={'material-icons pointer ' + (icon.class || '')}
            onClick={icon.onClick}
          >
            {icon.icon}
          </i>
        );
      }
    });
  }

  getProps() {
    if (this.props.outputComponent.connected) {
      return (
        <div>
          <b> Props From Store: </b>
        </div>
      );
    } else if (this.props.inheritsConnection) {
      return (
        <div>
          <b> Inherited Props: </b>
        </div>
      );
    } else {
      return null;
    }
  }

  getActions() {
    let actions = this.props.outputActions
      //.filter(
      // action => (action.id in this.props.outputComponent.actions)
      //)
      .map( action => action.name );

    return (
      <div>
        <b>Exposed Actions:</b>
        <ul>
          {
            actions.map(action => <li>{action}</li>)
          }
        </ul>
      </div>
    );
  }

  render() {
    let divStyle = {
      marginLeft: this.props.indent + 'px'
    };
    let underline = this.props.inheritsConnection ? ' purpleUnderline' : '';

    return (
      <div>
        <div
          style={divStyle}
          className="treeBranchNameRow"
          onMouseEnter={this.handleMouseEnter.bind(this)}
          onMouseLeave={this.handleMouseLeave.bind(this)}
          ref={row => this.anchor = row}
        >
          <div
            className={`treeBranchName${underline}`}
            onDragOver={this.handleDragOver.bind(this)}
            onDrop={this.handleDrop.bind(this)}
          >
            {this.props.outputComponent.name}
          </div>

          { this.getActionIcons() }

          {
            this.state.connectStoreError &&
            <div className="red">Only connect 1 tree level</div>
          }
        </div>

        {
          this.anchor &&
          <Popover
            open={this.state.hover}
            anchorEl={this.anchor}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            useLayerForClickAway={false}
            canAutoPosition={false}
            animated={false}
          >
            <div
              style={{ padding: '8px 12px' }}
            >
              {this.getProps()}
              {this.getActions()}
            </div>
          </Popover>
        }
      </div>
    );
  }
}

export default TreeBranch;
