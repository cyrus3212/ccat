import React, { Fragment } from 'react';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

import commonTranslate from '../../../translation/common.json';

/**
 * onHide - Will hide the modal on clicking its background and button cancel
 * onClickDelete - Action to delete the item
 */

const DeleteRowModal = ({onClickDelete, onHide}) => {
  return (
    <Fragment>
      <Modal.Header closeButton>
        <Modal.Title>{commonTranslate.deleteCaps}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {commonTranslate.deleteItem}
      </Modal.Body>
      <Modal.Footer>
        <Button htmlId="ButtonLink" buttonStyle="link" onClick={onHide}>
          {commonTranslate.no}
        </Button>
        <Button htmlId="DeleteCompanyButton" onClick={onClickDelete} buttonStyle="primary">
          {commonTranslate.yes}
        </Button>
      </Modal.Footer>
    </Fragment>
  );
}

export default DeleteRowModal;
