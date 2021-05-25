import React, { Fragment, Component } from "react";
import Button from "@coxautokc/fusion-ui-components/lib/Button";
import Modal from "react-bootstrap/lib/Modal";
import PropTypes from "prop-types";
import "./_customTableHeader.scss";
import updateIcon from "../../../assets/images/update.svg";
import CellTextInput from "../CellTextInput";
import CellNumericInput from "../CellNumericInput";
import CellAlphaNumericInput from "../CellAlphaNumericInput";
import CellAmountInput from "../CellAmountInput";
import CellPercentageInput from "../CellPercentageInput";
import SelectInput from "../SelectInput";
import ModalCoaInput from "../ModalCoaInput";
import RadioInputHorizontal from "../RadioInputHorizontal";
import { batchUpdateByField } from "../../../api/batchUpdateApi";

class CustomTableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      value: "",
      isUpdating: false,
      isDisabled: false,
      loaderStatus: "",
      loaderMessage: "",
      validationResult: []
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    try {
      if (nextProps.batchUpdate.isOk === true) {
        return {
          isDisabled: false,
          loaderStatus: "success",
          loaderMessage: "Data on the table has been updated.",
          validationResult: nextProps.batchUpdate.data.validationResult
        };
      } else {
        return {
          isDisabled: false,
          loaderStatus: "error",
          loaderMessage: nextProps.batchUpdate.errorMessage || "Failed to update.",
          validationResult: nextProps.batchUpdate.data.validationResult
        };
      }
    } catch (e) {}

    return { ...nextProps, ...state };
  }

  handleOnShowModal = () => {
    const { column } = this.props;
    let value = "";

    if (column.type === "amountInput" || column.type === "percentageInput") {
      value = "0";
    } else if (column.type === "radioInput") {
      value = "N";
    } else {
      value = "BLANK";
    }

    this.setState({ isShowModal: true, value });
  };

  handleOnCloseModal = () => {
    this.setState(this.baseState);
    const { loaderStatus } = this.state;

    if (loaderStatus === 'success') {
      this.props.onCloseApiBatchUpdate();
    }
  };

  handleOnChange = e => {
    const { value } = e;
    this.setState({ value });
  };

  handleOnClickCustomTitleAction = () => {
    const { value } = this.state;
    const { column, workbookSection } = this.props;
    const isApiBatchUpdate = !this.props.isApiBatchUpdate ? false : (this.props.isApiBatchUpdate || true);

    if (isApiBatchUpdate === true) {
      this.setState({
        isUpdating: true,
        loaderStatus: "",
        loaderMessage: "Updating... Please wait.",
        isDisabled: true
      });

      const data = {
        column: column.dataIndex,
        value: value,
        enterpriseCode: workbookSection.enterpriseCode,
        dtid: workbookSection.dtid,
        workbook: workbookSection.workbook,
        section: workbookSection.section
      };

      this.props.dispatch(batchUpdateByField(data));
    } else {
      // apply to table edify on form section
      this.setState({ isShowModal: false, value: "" });
      this.props.onClickCustomTitleAction(column.dataIndex, value);
    }
  };

  renderInputType = column => {
    const { value, validationResult } = this.state;

    if (column.type === "numericInput") {
      return (
        <CellNumericInput
          placeholder={column.placeholder || 'Enter Value'}
          displayLabel={true}
          onChange={this.handleOnChange}
          field={column.dataIndex}
          maxLength={column.maxLength}
          label={column.label || column.title}
          value={value}
          item={value}
          data={value}
          autoInsertCommas={column.autoInsertCommas}
          allowNegative={column.allowNegative}
          allowDecimal={column.allowDecimal}
        />
      );
    } else if (column.type === "alphaNumericInput") {
      return (
        <CellAlphaNumericInput
          onChange={this.handleOnChange}
          field={column.dataIndex}
          maxLength={column.maxLength}
          label={column.label || column.title}
          value={value}
          item={value}
          data={value}
          autoInsertCommas={column.autoInsertCommas}
          allowNegative={column.allowNegative}
          allowDecimal={column.allowDecimal}
        />
      );
    } else if (column.type === "amountInput") {
      return (
        <CellAmountInput
          onChange={this.handleOnChange}
          field={column.dataIndex}
          maxLength={column.maxLength}
          label={column.label || column.title}
          value={value}
          item={value}
          data={value}
          autoInsertCommas={column.autoInsertCommas}
          allowNegative={column.allowNegative}
          allowDecimal={column.allowDecimal}
        />
      );
    } else if (column.type === "percentageInput") {
      return (
        <CellPercentageInput
          onChange={this.handleOnChange}
          field={column.dataIndex}
          maxLength={column.maxLength}
          label={column.label || column.title}
          value={value}
          item={value}
          data={value}
          autoInsertCommas={column.autoInsertCommas}
          allowNegative={column.allowNegative}
          allowDecimal={column.allowDecimal}
        />
      );
    } else if (column.type === "radioInput") {
      let defaultOptions = [
        { value: "Y", label: "Y" },
        { value: "N", label: "N" }
      ];
      let options = column.options || defaultOptions;

      return (
        <RadioInputHorizontal
          inline
          field={column.dataIndex}
          htmlId={column.dataIndex}
          name={column.dataIndex}
          labelColSize={6}
          InputColSize={6}
          item={value}
          label={column.label || column.title}
          onChange={this.handleOnChange}
          value={value}
          options={options}
        />
      );
    } else if (column.type === "selectInput") {
      return (
        <SelectInput
          inline
          item={value}
          displayLabel={true}
          htmlId={column.dataIndex}
          name={column.dataIndex}
          label={column.label || column.title}
          onChange={this.handleOnChange}
          value={value}
          options={column.options || []}
        />
      );
    } else if (column.type === "coaTextInput") {
      return (
        <ModalCoaInput
          key={column.dataIndex}
          field={column.dataIndex}
          label={column.label || column.title}
          value={value}
          item={value}
          name={column.dataIndex}
          htmlId={column.dataIndex}
          onChange={this.handleOnChange}
          validationResult={validationResult}
        />
      );
    } else {
      return (
        <CellTextInput
          onChange={this.handleOnChange}
          field={column.dataIndex}
          maxLength={column.maxLength}
          label={column.label || column.title}
          item={value}
          value={value}
          data={value}
        />
      );
    }
  };

  render() {
    const { isShowModal, isUpdating, loaderStatus, loaderMessage, isDisabled } = this.state;
    const { title, column, enableBatchUpdate } = this.props;
    const renderInput = this.renderInputType(column);
    const isApiBatchUpdate = this.props.isApiBatchUpdate === undefined ? false : (this.props.isApiBatchUpdate || true);

    return (
      <Fragment>
        <div className={`custom-table-header ${column.dataIndex}`}>
          <span className="custom-table-header__column">{title}</span>

          {!enableBatchUpdate ? null : (
            <div
              onClick={this.handleOnShowModal}
              className="custom-table-header-action"
            >
              <img src={updateIcon} alt="" />
            </div>
          )}
        </div>
        <div className="">
          <Modal show={isShowModal}>
            <Modal.Header>
              <Modal.Title>
                Update{" "}
                {column.customHeaderTitle || column.label || column.title}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="searchInput">{renderInput}</div>
              {isUpdating === false && isApiBatchUpdate === true ? null : (
                <p className="batch-update-loader-message">{loaderMessage}</p>
              )}
            </Modal.Body>

            <Modal.Footer>
              <div className="dynamic-modal-footer">
                {isUpdating === false && isApiBatchUpdate === true ? (
                  <span />
                ) : (
                  <div className={`circle-loader ${loaderStatus}`}>
                    <div className="checkmark draw" />
                  </div>
                )}
                <div>
                  <Button
                    htmlId="modal-close"
                    bsStyle="link"
                    disabled={isDisabled}
                    onClick={this.handleOnCloseModal}
                  >
                    Close
                  </Button>
                  <Button
                    htmlId="modal-apply-all"
                    bsStyle="primary"
                    disabled={isDisabled}
                    onClick={this.handleOnClickCustomTitleAction}
                  >
                    Apply to All
                  </Button>
                </div>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
      </Fragment>
    );
  }
}

CustomTableHeader.propTypes = {
  onHide: PropTypes.func,
  loaderMessage: PropTypes.string,
  loaderStatus: PropTypes.string
};

export default CustomTableHeader;
