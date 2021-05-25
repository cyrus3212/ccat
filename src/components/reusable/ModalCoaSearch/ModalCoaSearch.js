import React, { Fragment, Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CoaSearchForm from '../CoaSearchForm/CoaSearchForm';
import { PrivateContainerConsumer } from '../../containers/PrivateContainer/PrivateContainerContext';

class ModalCoaSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchVal: ''
    }

    this.baseState = this.state;
  }

  handleOnSelect = (accountNumber) => {
    this.props.onSelect(accountNumber);
  }

  handleOnClose = () => {
    this.props.onClose();
  }

  render () {
    return (
      <Fragment>
        <Modal.Header closeButton>
          <Modal.Title>COA Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PrivateContainerConsumer>
            { context => (
              <CoaSearchForm context={context} onSelect={this.handleOnSelect} onClose={this.handleOnClose} searchVal={this.props.searchVal}  />
            )}
          </PrivateContainerConsumer>
        </Modal.Body>
      </Fragment>
    )
  }
}

export default ModalCoaSearch;
