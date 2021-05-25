import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/lib/Alert';

const propTypes = {
  response: PropTypes.object.isRequired,
  redirectUrl: PropTypes.string.isRequired,
}

const MessageAlert = ({ response, redirectUrl, isSaved }) => {

  function renderAlert(response, redirectUrl, isSaved) {
    if (response.isOk === true) {
      return <Redirect to={redirectUrl} />;
    }
    else {
      if (isSaved === false) {
        return null;
      } else {
        return (<React.Fragment>
          <Alert type="danger" displayCloseButton>
            {response.message}
          </Alert>
        </React.Fragment>)
      }
    }
  }

  return (
    <div id="MessageAlert">
      {renderAlert(response, redirectUrl, isSaved)}
    </div>
  );

};

MessageAlert.propTypes = propTypes;

export default MessageAlert;
