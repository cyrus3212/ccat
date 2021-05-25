import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import './_modalFormEdify.scss';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import SearchableSelect from '@coxautokc/fusion-ui-components/lib/SearchableSelect';
import RadioInputHorizontal from '../RadioInputHorizontal';
import SelectInput from '../SelectInput';
import ModalTextInput from '../ModalTextInput';
import ModalAlphaNumericInput from '../ModalAlphaNumericInput';
import ModalNumericInput from '../ModalNumericInput';
import ModalPercentageInput from '../ModalPercentageInput/ModalPercentageInput';
import ModalAmountInput from '../ModalAmountInput/ModalAmountInput';
import ModalCoaInput from '../ModalCoaInput';
import CheckBoxHorizontal from '../CheckBoxHorizontal';

class ModalFormEdify extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      isAddStatus: "",
      data: {},
      isDisabled: false,
      componentDetails: {},
			clickedSubmit: false,
      formJSON: [],
      errorFields: [],
      isDoneGeneratedProps: false,
      isOnAddActive: false,
    }
    this.baseState = this.state;
  }

	isEmptyJSON = (obj) => {
		return Object.keys(obj).length === 0;
  }

  componentDidMount() {
    this._isMounted = true;
    try {
      this.generateProps(this.props.fields);
    } catch (e) {

    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  static getDerivedStateFromProps(nextProps, state) {
    return {formJSON: nextProps.fields, data: nextProps.data, isAddStatus: nextProps.isAddStatus};
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isDoneGeneratedProps === false) {
      this.generateProps(prevProps.fields);
      this.setState({isDoneGeneratedProps: true});
    }
  }

  handleOnAdd = () => {
    // add item if no error on field(s)
    let isError = this.checkErrorField();
    if (!isError) {
      this.setState({isDoneGeneratedProps: false});
      this.props.onAdd();
      isError = true;
    }
    else {
      this.setState({isAddStatus: 'error'});
    }
  }

  checkErrorField = () => {
    let {data} = this.state;
    let isError = false;
    try {
      let arr = this.state.formJSON.map((item, index)=> {
        let checkErrorField = item.columns.map((column, colIndex)=> {
          if (column.type !== 'header') {
            if (data[column.dataIndex] === "" && column.required === true) {
              isError = true;
            }
            return isError;
          }
        });

        return checkErrorField[0];
      });
    }
    catch (e) {

    }

    return isError;
  }

  generateProps = (columns=null) => {
    let {data} = this.state;
    if (this._isMounted === true) {
      if (columns === null) {
        // from inline event
        columns.map(col => {
          if (col.type !== 'actionButtons' || col.type !== 'header') {
            data[col.dataIndex] = "";
          }
        });
      }
      else {
        try {
          let arr = this.state.formJSON.map((item, index)=> {
            let colItems = item.columns.map((column, colIndex)=> {
              if (column.type !== 'header') {
                return data[column.dataIndex] = data[column.dataIndex] || "";
              }
            });
            return colItems;
          });
        }
        catch (e) {
          return [];
        }
      }

      this.props.onGetProps(data);
    }
  }

  renderComponent = (item) => {
    if (item.type === undefined) {
      return null;
    }

    if (item.type === 'textInput') {
      return this.generateTextInput(item);
    }
    else if (item.type === 'alphaNumericInput') {
      return this.generateAlphaNumericInput(item);
    }
    else if (item.type === 'coaTextInput') {
      return this.generateCoaTextInput(item);
    }
    else if (item.type === 'numericInput') {
      return this.generateNumericInput(item);
    }
    else if (item.type === 'percentageInput') {
      return this.generatePercentageInput(item);
    }
    else if (item.type === 'amountInput') {
      return this.generateAmountInput(item);
    }
    else if (item.type === 'searchableSelect') {
      return this.generateSearchableSelect(item);
    }
    else if (item.type === 'radioInput') {
      return this.generateRadioButton(item);
    }
    else if (item.type === 'selectInput') {
      return this.generateSelectInput(item);
    }
    else if (item.type === 'table') {
      return this.generateTable(item);
    }
    else if (item.type === 'checkboxH') {
      return this.generateCheckBoxHorizontal(item);
    }
    else if (item.type === 'header') {
      return this.generateHeader(item);
    }
    else if (item.type ==='hr') {
      return this.generateHorizontalLine(item);
    }
    else if (item.type ==='spaceCol') {
      return this.generateSpaceColumn(item);
    }
  }

  generateRadioButton = (item) => {
    let {data} = this.state;
    let label = item.label || item.title || 'Label';
    let required = item.required || false;
    let value = data[item.dataIndex] || item.defaultValue || "";

    return (
      <RadioInputHorizontal
        inline
        field={item.dataIndex}
        required={required}
        htmlId={item.dataIndex}
        name={item.dataIndex}
        labelColSize={6}
        InputColSize={6}
        item={item}
        label={label}
        onChange={item.onChange}
        value={value}
        options={item.options}
      />
    );
  }

  generateSearchableSelect = (item) => {
    let {data} = this.state;
    let isDisabledField = false;
    let label = item.label || "";
    let refId = data.refId || 'id';
    let id = item.id || item.cId || "";
    let value = "";

    if (typeof data.isDisabled === 'function') {
      isDisabledField = data.isDisabled(item);
    }
    else {
      isDisabledField = data.isDisabled || false;
    }

    if (data[item.dataIndex] !== undefined || data[item.dataIndex] !== "") {
      value = data[item.dataIndex];
    }

    return (
      <SearchableSelect
        htmlId="searchableSelect"
        label={label}
        refId={refId}
        name={item.dataIndex}
        onChange={(event) => item.onChange(event.target)}
        displayLabel={true}
        options={item.options}
        isDisabled={isDisabledField}
        value={value}
      />
    )
  }

  generateSelectInput = (item) => {
    let label = item.label || item.title || 'Label';
    let required = item.required || false;
    let isDisabled = false;
    // let value = "";
    let {data} = this.state;

    if (typeof item.isDisabled === 'function') {
      isDisabled = item.isDisabled(item);
    }
    else {
      isDisabled = item.isDisabled || false;
    }
    let value = data[item.dataIndex] || item.defaultValue || "0";
    // if (data[item.dataIndex] !== undefined || data[item.dataIndex] !== "") {
    //   value = data[item.dataIndex];
    // }

    return (
      <SelectInput
        inline
        id={item.dataIndex}
        required={required}
        refId={item.dataIndex}
        item={item}
        displayLabel={true}
        htmlId={item.dataIndex}
        name={item.dataIndex}
        label={label}
        onChange={item.onChange}
        value={value}
        options={item.options}
        isDisabled={isDisabled}
      />
    );
  }

  generateTextInput = (item) => {
    let {data} = this.state;
    let label = item.label || item.title || 'Label';
    let isDisabled = item.isDisabled || false;
    let maxLength = item.maxLength || item.size || 150;
    let validationResult = item.validationResult || [];
    // let value = item.defaultValue || "";
    let value = data[item.dataIndex] || "";

    return (
      <ModalTextInput
        key={item.dataIndex}
        isDisabled={isDisabled}
        field={item.dataIndex}
        required={item.required}
        maxLength={maxLength}
        label={label}
        value={value}
        item={item}
        name={item.dataIndex}
        htmlId={item.dataIndex}
        onChange={item.onChange}
        onKeyDown={item.onKeyDown}
        showClear={item.showClear}
        validationResult={validationResult}
      />
    );
  }

  generateCoaTextInput = (item) => {
    let {data} = this.state;
    let label = item.label || item.title || 'Label';
    let isDisabled = item.isDisabled || false;
    let maxLength = item.maxLength || item.size || 150;
    let validationResult = item.validationResult || [];
    // let value = item.defaultValue || "";
    let value = data[item.dataIndex] || "";

    return (
      <ModalCoaInput
        key={item.dataIndex}
        isDisabled={isDisabled}
        field={item.dataIndex}
        required={item.required}
        maxLength={maxLength}
        label={label}
        value={value}
        item={item}
        name={item.dataIndex}
        htmlId={item.dataIndex}
        onChange={item.onChange}
        validationResult={validationResult}
      />
    );
  }

  generateNumericInput = (item) => {
    let {data} = this.state;
    let label = item.label || item.title || 'Label';
    let isDisabled = item.isDisabled || false;
    let maxLength = item.maxLength || item.size || 150;
    let validationResult = item.validationResult || [];
    // let value = item.defaultValue || "";
    let value = data[item.dataIndex] || item.defaultValue || "";
    const allowDecimal = item.allowDecimal || false;

    return (
      <ModalNumericInput
        key={item.dataIndex}
        isDisabled={isDisabled}
        field={item.dataIndex}
        required={item.required}
        maxLength={maxLength}
        label={label}
        value={value}
        item={item}
        name={item.dataIndex}
        htmlId={item.dataIndex}
        onChange={item.onChange}
        validationResult={validationResult}
        allowDecimal={allowDecimal}
      />
    );
  }

  generateAmountInput = (item) => {
    let {data} = this.state;
    let label = item.label || item.title || 'Label';
    let isDisabled = item.isDisabled || false;
    let maxLength = item.maxLength || item.size || 150;
    let validationResult = item.validationResult || [];
    let value = data[item.dataIndex] || item.defaultValue || "";
    const allowDecimal = item.allowDecimal || false;

    return (
      <ModalAmountInput
        key={item.dataIndex}
        isDisabled={isDisabled}
        field={item.dataIndex}
        required={item.required}
        maxLength={maxLength}
        label={label}
        value={value}
        item={item}
        name={item.dataIndex}
        htmlId={item.dataIndex}
        onChange={item.onChange}
        validationResult={validationResult}
        allowDecimal={allowDecimal}
      />
    );
  }

  generatePercentageInput = (item) => {
    let {data} = this.state;
    let label = item.label || item.title || "Label";
    let isDisabled = item.isDisabled || false;
    let maxLength = item.maxLength || item.size || 150;
    let validationResult = item.validationResult || [];
    let value = data[item.dataIndex] || item.defaultValue || "";
    const allowDecimal = item.allowDecimal || false;

    return (
      <ModalPercentageInput
        key={item.dataIndex}
        isDisabled={isDisabled}
        field={item.dataIndex}
        required={item.required}
        maxLength={maxLength}
        label={label}
        value={value}
        item={item}
        name={item.dataIndex}
        htmlId={item.dataIndex}
        onChange={item.onChange}
        validationResult={validationResult}
        allowDecimal={allowDecimal}
      />
    );
  }

  generateAlphaNumericInput = (item) => {
    let {data} = this.state;
    let label = item.label || item.title || 'Label';
    let isDisabled = item.isDisabled || false;
    let maxLength = item.maxLength || item.size || 150;
    let validationResult = item.validationResult || [];
    // let value = item.defaultValue || "";
    let value = data[item.dataIndex] || "";

    return (
      <ModalAlphaNumericInput
        key={item.dataIndex}
        isDisabled={isDisabled}
        field={item.dataIndex}
        required={item.required}
        maxLength={maxLength}
        label={label}
        value={value}
        item={item}
        name={item.dataIndex}
        htmlId={item.dataIndex}
        onChange={item.onChange}
        onKeyDown={item.onKeyDown}
        showClear={item.showClear}
        validationResult={validationResult}
      />
    );
  }

    /**
   * Generate Checkbox Horizontal Layout
   */
  generateCheckBoxHorizontal = (item) => {
    const required = item.required || false;
    const field = item.dataIndex || item.name || "";
    const label = item.label;
    const refId = item.refId || 'id';
    const className = item.className || "";
    const maxLength = item.maxLength || 50;
    const labelColSize = item.labelColSize || 5;
    const InputColSize = item.InputColSize || 4;
    const displayLabel = item.displayLabel || false;
    const {data} = this.state;
    let value = data[item.dataIndex] || "";

    return (
      <div className={className}>
      <CheckBoxHorizontal
        id={refId}
        displayLabel={displayLabel}
        field={field}
        required={required}
        maxLength={maxLength}
        onChange={item.onChange}
        label={label}
        name={name}
        value={value}
        options={item.options}
        labelColSize={labelColSize}
        InputColSize={InputColSize}
      />
      </div>
    );
  }

  generateHeader = (item) => {
    return <b className={item.className}>{item.label}</b>;
  }

  generateHorizontalLine = (item) => {
    return <hr/>;
  }

  generateSpaceColumn = (item) => {
    return <div>&nbsp;</div>;
  }

  renderSectionRows = (sections, item) => {
    let rowItems = sections.map((item, index)=> {

      let colItems = item.columns.map((column, colIndex)=> {
        if (column.type !== 'section') {
          return (
            <Col key={colIndex} xs={column.xsColSize || 12} md={column.mdColSize || 6}>
              {this.renderComponent(column)}
            </Col>
          );
        }
      });

      return (<Col key={index} md={12}>
        <Row className={`show-grid`}>
            {colItems}
        </Row>
      </Col>)
    });

    return <div key={1} className={item.className}>{rowItems}</div>;
  }

  render() {
    const { isAddStatus } = this.state;
    const { isModalShowTitle, isModalShowAction } = this.props;
    let formItems = this.state.formJSON.map((item, index)=> {
      let colItems = item.columns.map((column, colIndex)=> {
        if (column.type !== 'section') {
          return (
            <Col key={colIndex} xs={column.xsColSize || 12} md={column.mdColSize || 12}>
              {this.renderComponent(column)}
            </Col>
          );
        }

        if (column.type === 'section') {
          return this.renderSectionRows(column.sections, column);
        }
      });

      return <div key={index}>{colItems}</div>;
    });

    return (
      <Fragment>
        {isModalShowTitle !== false ?
        <Modal.Header>
          <Modal.Title>{this.props.title || 'Add Form'}</Modal.Title>
        </Modal.Header>
        : ''}
        <Modal.Body>
          <Row>
            {formItems}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          { isAddStatus === 'success' ?
            <span className="pull-left text-alert--green">
              <i className="fas fa-check" /> Successfully added new record
            </span>
            : null
          }
          { isAddStatus === 'error' ?
            <span className="pull-left text-alert--red">
              <i className="fas fa-times" /> Failed to add new record
            </span>
            : null
          }
          { isModalShowAction !== false ?
            <Fragment>
              <Button htmlId="ButtonLink" buttonStyle="link" onClick={this.props.onHide}>
                Close
              </Button>
              <Button
                htmlId="AddCompanyButton"
                buttonStyle="primary"
                onClick={this.handleOnAdd}
                disabled={this.props.isDisabled}
              >
                Add
              </Button>
            </Fragment>
            : null
          }
        </Modal.Footer>
      </Fragment>
    )
  }
}

ModalFormEdify.propTypes = {
  dispatch: PropTypes.func,
};

export default ModalFormEdify;
