import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_footerFormAction.scss';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import { Link } from 'react-router-dom';

class FooterFormAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  renderButton() {
    const { footerFormActions, isClearDataShow } = this.props;
    return footerFormActions.map((footerFormAction, index) => {
        const disabled = footerFormAction.disabled || false;
        const redirectTo = footerFormAction.url || '#';
        let renderComponent = null;

        if (footerFormAction.buttonStyle === 'link') {
          renderComponent = <Link id={footerFormAction.id} className="btn btn-link back-button" to={redirectTo}>{footerFormAction.name}</Link>;
        }
        else if (footerFormAction.buttonStyle === 'danger') {
          if (isClearDataShow) {
            renderComponent = <Button
              htmlId={footerFormAction.id}
              key={index}
              buttonStyle={footerFormAction.buttonStyle}
              onClick={footerFormAction.onClick}
              disabled={disabled}
              className={`pull-${footerFormAction.position}`}>{footerFormAction.name}
            </Button>
          }
        }
        else if (footerFormAction.buttonStyle === 'spacer') {
          renderComponent = <div className={`spacer pull-${footerFormAction.position}`}></div>;
        }
        else {
          renderComponent = <Button
            htmlId={footerFormAction.id || "btnFooterAction"}
            key={index}
            buttonStyle={footerFormAction.buttonStyle}
            onClick={footerFormAction.onClick}
            disabled={disabled}
            className={`pull-${footerFormAction.position}`}>{footerFormAction.name}
          </Button>
        }

        return (
          <div key={index}>
            {renderComponent}
          </div>
        )
    })
  }

  render() {

    return (
      <Fragment>
        <Row className="footer-form-action">
          <Col xs={12} md={12}>
            <div>{this.renderButton()}</div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}


FooterFormAction.propTypes = {
  footerFormActions: PropTypes.any,
};

export default FooterFormAction;
