import React, { Component, Fragment } from 'react';
import './_formSectionFooterAction.scss';
import CheckBoxHorizontal from '../CheckBoxHorizontal';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';

class FormSectionFooterAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: []
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const checkSaveAndRetain = nextProps.checkSaveAndRetain || false;

    try {
      if (checkSaveAndRetain && state.value.length > 0) {
        return {
          value: new Array("true"),
        };
      }
    }
    catch (e) {

    }

    return {
      value: []
    };
  }

   /**
   * Method used to set if to Retain the data as next entry
   */
  handleOnChangeSaveAndRetain = (event) => {
    const { value } = event;
    if (value.length > 0) {
      this.setState({ value: new Array("true") });
      this.props.onChangeSaveAndRetain(true);
    } else {
      this.setState({ value: new Array() });
      this.props.onChangeSaveAndRetain(false);
    }
  }

  handleOnClearForm = () => {
    this.setState({ value: new Array() });
    this.props.onClearForm();
  }

  render() {
    const { value } = this.state;

    return (
      <Fragment>
        <Row className="footer-action-btn">
          <Col xs={3} md={3}>
            <CheckBoxHorizontal
              id="chkSaveAndRetain"
              displayLabel={true}
              field="chkSaveAndRetain"
              name="chkSaveAndRetain"
              onChange={this.handleOnChangeSaveAndRetain}
              value={value}
              options={[
                {
                  value: "true",
                  label: "Save and Retain"
                },
              ]}
            />
          </Col>
          <Col xs={9} md={9} className="text-right">
            <Button htmlId="SaveButton" buttonStyle="primary" onClick={this.props.onSave} disabled={this.props.disabledSave || false}>Save</Button>
            <Button htmlId="ClearButton" buttonStyle="default" onClick={this.handleOnClearForm} disabled={this.props.disabledClear || false}>Clear</Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
}


FormSectionFooterAction.propTypes = {
};

export default FormSectionFooterAction;
