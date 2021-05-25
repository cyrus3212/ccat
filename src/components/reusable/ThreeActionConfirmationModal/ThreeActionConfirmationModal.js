import React, { Fragment } from 'react';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import commonTranslate from '../../../translation/common.json';
import PropTypes from 'prop-types';
import "./_messageAlertModal.scss";

class ThreeActionConfirmationModal extends React.Component {

  state = {
  };

  handleOnNoClick = (event) => {
    if (typeof this.props.onNoClick !== 'undefined' || typeof this.props.onNoClick === 'function') {
      this.props.onNoClick(event, 'no');
    }
  }

  handleOnYesClick = (event) => {
    if (typeof this.props.onYesClick !== 'undefined' || typeof this.props.onYesClick === 'function') {
      this.props.onYesClick(event, 'yes');
    }
  }

  onConfirmFilter = (event, action) => {
    this.props.onConfirmFilter(action)
  }

  render() {
    const messageAlert = this.props.messageAlert || commonTranslate.successMessage;

    return (
      <Fragment>
        <Modal.Header>
          <Modal.Title>{commonTranslate.confirm}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert-modal-body">
            <p>
              Changes will be lost. Do you want to save?
            </p>
            <p>
              {commonTranslate.clickToProceed}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button htmlId="noButton" onClick={(event) => this.onConfirmFilter(event, 'no')} buttonStyle="primary">
            {commonTranslate.no}
          </Button>
          <Button htmlId="yesButton" onClick={(event) => this.onConfirmFilter(event, 'yes')} buttonStyle="primary">
            {commonTranslate.yes}
          </Button>
        </Modal.Footer>
      </Fragment>
    );
  }
}

ThreeActionConfirmationModal.propTypes = {
  onHide: PropTypes.func,
  messageAlert: PropTypes.string,
};

export default ThreeActionConfirmationModal;
