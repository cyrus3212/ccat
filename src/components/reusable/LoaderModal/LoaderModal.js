import React, { Fragment } from 'react';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import commonTranslate from '../../../translation/common.json';
import PropTypes from 'prop-types';
import "./_loaderModal.scss";

const LoaderModal = ({loaderStatus, loaderMessage, onHide}) => {
  return (
    <Fragment>
        <Modal.Body>
          <div className="alert-modal-body">
            <div className="text-center">
              <div className={`circle-loader ${loaderStatus}`}>
                <div className='checkmark draw'></div>
              </div>
              <p className={`text-alert--${loaderStatus}`}>
                { loaderMessage }
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            htmlId="okButton"
            onClick={onHide}
            buttonStyle="primary"
            disabled={loaderStatus ? false : true}
          >
            {commonTranslate.ok}
          </Button>
        </Modal.Footer>
      </Fragment>
  )
}

LoaderModal.propTypes = {
  onHide: PropTypes.func,
  loaderMessage: PropTypes.string,
  loaderStatus: PropTypes.string
};

export default LoaderModal;
