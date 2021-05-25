import React, { Fragment } from 'react';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import commonTranslate from '../../../translation/common.json';
import PropTypes from 'prop-types';
import "./_messageAlertModal.scss";

class MessageAlertModal extends React.Component {

  state = {
  };

  render() {
    const messageAlert = this.props.messageAlert || commonTranslate.successMessage;
    const { messageType, messageTip } = this.props;

    return (
      <Fragment>
        <Modal.Body>
          <div className="alert-modal-body">
            <p>
              { messageType == 'success' ?
                <span className="text-alert--green"><i className="fas fa-check"/> {messageAlert}</span>
                :
                <span className="text-alert--red"><i className="fas fa-exclamation-triangle"/> {messageAlert}</span>
              }
            </p>
            <p>
              { messageTip ? messageTip : commonTranslate.clickProceed }
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button htmlId="okButton" onClick={this.props.onHide} buttonStyle="primary">
            {commonTranslate.ok}
          </Button>
        </Modal.Footer>
      </Fragment>
    );
  }
}

MessageAlertModal.propTypes = {
  onHide: PropTypes.func,
  messageAlert: PropTypes.string,
};

export default MessageAlertModal;
