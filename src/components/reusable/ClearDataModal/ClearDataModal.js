import React, { Fragment } from 'react';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import commonTranslate from '../../../translation/common.json';
import PropTypes from 'prop-types';
import "./_clearDataModal.scss";
import { PrivateContainerConsumer } from "../../containers/PrivateContainer/PrivateContainerContext";

const ClearDataModal = ({ messageAlert, onConfirm, title }) => {
  return (
    <PrivateContainerConsumer>
      {context => (
      <Fragment>
        <Modal.Header closeButton>
          <Modal.Title>Clear Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to clear the data on this page?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button htmlId="noButton" onClick={(event) => onConfirm(context, 'no')} buttonStyle="link">
            {commonTranslate.no}
          </Button>
          <Button htmlId="yesButton" onClick={(event) => onConfirm(context, 'yes')} buttonStyle="primary">
            {commonTranslate.yes}
          </Button>
        </Modal.Footer>
      </Fragment>
      )}
    </PrivateContainerConsumer>
  )
}

ClearDataModal.propTypes = {
  onHide: PropTypes.func,
  messageAlert: PropTypes.string,
  title: PropTypes.string
};

export default ClearDataModal;
