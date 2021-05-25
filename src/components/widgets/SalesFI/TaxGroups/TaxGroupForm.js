import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_salesFI.scss";
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import FormEdify from '../../../reusable/FormEdify';
import TableEdify from '../../../reusable/TableEdify';
import Modal from 'react-bootstrap/lib/Modal';
import ConfirmationModal from '../../../reusable/ConfirmationModal';
import { generateForm } from './FormFields';
import { generateTableColumns } from './TableColumns';
import { taxGroupDefaultValue } from './TaxGroupDefaultValues';

class TaxGroupForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      listLease: [],
      options: [
        { value: 'Y', label: 'Y' },
        { value: 'N', label: 'N' }
      ],
      isShowConfirmationModal: false,
      loaderStatus: '',
      confirmationMessage: '',
      saved: false
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { salesTaxGroup } = nextProps;
    return { data: salesTaxGroup, listLease: salesTaxGroup.taxRates || taxGroupDefaultValue() }
  }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);

    if (name === 'preferredLease' || name === 'preferredRetail') {
      data[name] = value.toUpperCase();
    } else {
      data[name] = value;
    }

    this.setState({ data });
  }

  /**
   * method that handle inline editing
   */
  handleTableInputOnChange = (event, id, target) => {
    const { listLease } = Object.assign({}, this.state);
    let selectedRow = listLease.findIndex(selectedRow => selectedRow.cId == id);

    listLease[selectedRow][target] = event.value;
    this.setState({ listLease });
  }

  handleShowConfirmationModal = () => {
    this.setState({ isShowConfirmationModal: true });
  }

  handleOnConfirm = (action) => {
    if (action === 'yes') {
      this.handleOnSave(action)
    }

    this.setState({ isShowConfirmationModal: false });
  }

  handleConfirmationModalHide = () => {
    this.setState({ isShowConfirmationModal: false });
  }

  /**
   * method to pass data to parent on save
   */
  handleOnSave = (action) => {
    const { data, listLease } = this.state;
    let model = data;
    let preferredLease = 'N';
    let preferredRetail = 'N';

    if (data.preferredLease === 'Y') {
      this.setState({ isShowConfirmationModal: true });
      preferredLease = 'Y';
    }

    if (data.preferredRetail === 'Y') {
      this.setState({ isShowConfirmationModal: true });
      preferredRetail = 'Y';
    }

    model.taxRates = listLease;
    model.preferredLease = preferredLease;
    model.preferredRetail = preferredRetail;

    if (preferredLease === 'N' &&  preferredRetail === 'N') {
      this.props.onSave(model);
    }
    else {
      if (action === 'yes') {
        this.props.onSave(model)
      }
    }
  }

  /**
   * method to clear form fields
   */
  clearForm = () => {
    this.setState(this.baseState);
    this.setState({
      listLease: taxGroupDefaultValue()
    })
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false });
  }

  handleChangeModal = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;

    this.setState({ data });
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };

  render () {
    const { data, listLease, options, isShowConfirmationModal } = this.state;
    let validationResult = [];

    try {
      validationResult = data.validationResult;
    }
    catch (e) {
    }
    const tableColumns = generateTableColumns(this.handleTableInputOnChange, options);
    const tableList = <Row>
          <Col md={12}>
            <TableEdify data={listLease} columns={tableColumns} scrollY={650} scrollX={630} displayAddItem={false} displayFilter={false}/>
          </Col>
        </Row>
    const formFields = generateForm(this.handleInputOnChange, tableList, validationResult);

    return (
      <Fragment>
        <form className="form-horizontal sales-taxgroup-form">
          <Row>
            <FormEdify fields={formFields} data={data} onGetProps={this.handleGetProps}/>
          </Row>
          <Row className="footer-action-btn">
            <Col xs={12} md={12} className="text-right">
              <Button htmlId="SaveButton" buttonStyle="primary" onClick={this.handleOnSave} disabled={data.taxGroupDescription ? false : true}>Save</Button>
              <Button htmlId="ClearButton" buttonStyle="default" onClick={this.clearForm}>Clear</Button>
            </Col>
          </Row>

        <Modal show={isShowConfirmationModal} onHide={this.handleConfirmationModalHide}>
          <ConfirmationModal confirmationMessage={'Do you want to set this Tax Group as the preferred Retail Deal Tax Group and/or preferred Lease Tax Group'} onConfirm={this.handleOnConfirm} />
        </Modal>
        </form>
      </Fragment>
    );
  }

}

TaxGroupForm.propTypes = {
};

export default TaxGroupForm;
