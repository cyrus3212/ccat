import React, { Component, Fragment } from 'react';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import commonTranslate from '../../../translation/common.json';
import PropTypes from 'prop-types';
import "./_messageAlertModal.scss";

const ConfirmationModal = ({ confirmationMessage, onConfirm, title }) => {
    return (
      <Fragment>
        <Modal.Header>
          <Modal.Title>{title === '' ? commonTranslate.confirm : title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert-modal-body">
            <p>{confirmationMessage || commonTranslate.completeItem}</p>
            <p>{commonTranslate.clickToProceed}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button htmlId="noButton" onClick={(event) => onConfirm('no')} buttonStyle="link">
            {commonTranslate.no}
          </Button>
          <Button htmlId="yesButton" onClick={(event) => onConfirm('yes')} buttonStyle="primary">
            {commonTranslate.yes}
          </Button>
        </Modal.Footer>
      </Fragment>
    );
};

ConfirmationModal.propTypes = {
  onHide: PropTypes.func,
  messageAlert: PropTypes.string,
  title: PropTypes.string
};

export default ConfirmationModal;
