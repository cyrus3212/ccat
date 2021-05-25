import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import './_formEdify.scss';
import TextInputHorizontal from '../TextInputHorizontal';
import SelectInputHorizontal from '../SelectInputHorizontal';
import RadioInputHorizontal from '../RadioInputHorizontal';
import RadioInputVertical from '../RadioInputVertical';
import { FormGroup} from 'react-bootstrap/lib';
import TextMarkUp from '../TextMarkUp';
import { Tabs } from 'antd';
import CheckBoxHorizontal from '../CheckBoxHorizontal';
import TextAreaHorizontal from '../TextAreaHorizontal';
import NumericInputHorizontal from '../NumericInputHorizontal';
import AlphaNumericInputHorizontal from '../AlphaNumericInputHorizontal';
import AlphaNumericTextAreaHorizontal from '../AlphaNumericTextAreaHorizontal';
import SearchableInputHorizontal from '../SearchableInputHorizontal';
import PercentageInput from '../PercentageInput';
import AmountInput from '../AmountInput';
import Datepicker from '../Datepicker';
import moment from 'moment';
import CoaSearchInput from '../CoaSearchInput';
// import SearchableSelect from '@coxautokc/fusion-ui-components/lib/SearchableSelect';

class FormEdify extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isDisabled: false,
      formJSON: [],
      isDoneGeneratedProps: false
    };
  }

  isEmptyJSON = (obj) => {
		return Object.keys(obj).length === 0;
  }

  componentDidMount() {
    this._isMounted = true;
    try {
      this.generateProps(this.props.fields);
    }
    catch (e) {

    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    return {formJSON: nextProps.fields, data: nextProps.data};
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isDoneGeneratedProps === false) {
      this.generateProps(prevProps.fields);
      this.setState({isDoneGeneratedProps: true});
    }
  }

  generateProps = () => {
    let {data} = this.state;
    const {formJSON} = this.state;

    if (this._isMounted === true) {
      let arr = formJSON.map((item, index)=> {
        let colItems = item.columns.map((column, colIndex)=> {
          if (column.type !== 'header' && column.type !== 'hr' && column.type !== 'spaceCol' && column.type !== 'descriptionLabel') {
            return data[column.dataIndex] = data[column.dataIndex] || column.defaultValue || "";
          }
        });
        return colItems;
      });

      try {
        this.props.onGetProps(data);
      } catch (e) {

      }
    }
  }

  renderComponent = (item) => {
    if (item.type === undefined) {
      return null;
    }

    if (item.type ==='selectInputH') {
      return this.generateSelectInputHorizontal(item);
    }
    if (item.type ==='hr') {
      return this.generateHorizontalLine(item);
    }
    if (item.type ==='spaceCol') {
      return this.generateSpaceColumn(item);
    }
    else if (item.type === 'textInputH') {
      return this.generateTextInputHorizontal(item);
    }
    else if (item.type === 'percentageInput') {
      return this.generatePercentageInput(item);
    }
    else if (item.type === 'amountInput') {
      return this.generateAmountInput(item);
    }
    else if (item.type === 'alphaNumericInputH') {
      return this.generateAlphaNumericInputHorizontal(item);
    }
    else if (item.type === 'numericInputH') {
      return this.generateNumericInputHorizontal(item);
    }
    else if (item.type === 'textAreaH') {
      return this.generateTextAreaHorizontal(item);
    }
    else if (item.type === 'alphaNumericAreaH') {
      return this.generateAlphaNumericAreaHorizontal(item);
    }
    else if (item.type === 'descriptionLabel') {
      return this.generateDescriptionLabel(item);
    }
    else if (item.type === 'header') {
      return this.generateHeader(item);
    }
    else if (item.type === 'headerTextMarkup') {
      return this.generateHeaderTextMarkup(item);
    }
    else if (item.type === 'radioInputH') {
      return this.generateRadioButtonHorizontal(item);
    }
    else if (item.type === 'radioInputV') {
      return this.generateRadioButtonVertical(item);
    }
    else if (item.type === 'checkboxH') {
      return this.generateCheckBoxHorizontal(item);
    }
    else if (item.type === 'component') {
      return item.component;
    }
    else if (item.type ==='tabs') {
      return this.generateTab(item);
    }
    else if (item.type === 'datePicker') {
      return this.generateDatePicker(item);
    }
    else if (item.type === 'coaTextInputH') {
      return this.generateCoaTextInputHorizontal(item);
    }
    else if (item.type === 'searchableSelectH') {
      return this.generateSearchableHorizontal(item);
    }

  }

  generateHeader = (item) => {
    return <b>{item.label}</b>;
  }

  generateHeaderTextMarkup = (item) => {
    return <TextMarkUp label={item.label} />;
  }

  generateHorizontalLine = (item) => {
    return <hr/>;
  }

  generateSpaceColumn = (item) => {
    return <div>&nbsp;</div>;
  }

  generateDescriptionLabel = (item) => {
    return (<div className="form-group field-description">
        <TextMarkUp label={item.label} />
    </div>)
  };

  generateSearchableHorizontal = (item) => {
    const required = item.required || false;
    const field = item.dataIndex || item.name || "";
    const label = item.label || 'Label';
    const refId = item.refId || 'id';
    const className = item.className || "";
    const maxLength = item.maxLength || 50;
    const labelColSize = item.labelColSize || 5;
    const InputColSize = item.InputColSize || 4;
    const {data} = this.state;
    let value = data[item.dataIndex] || item.defaultValue || "";
    const isDisabledField = item.isDisabled || false;
    const validationResult = item.validationResult || [];

    return (
      <div className={className}>
        <SearchableInputHorizontal
          id={refId}
          displayLabel={true}
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
          isDisabled={isDisabledField}
          validationResult={validationResult}
        />
      </div>
    );
  }

  generateTextAreaHorizontal = (item) => {
    const label = item.label || 'Label';
    const refId = item.refId || 'id';
    const field = item.dataIndex || item.name || "";
    const isDisabledField = item.isDisabled || false;
    const maxLength = item.maxLength || 150;
    const labelColSize = item.labelColSize || 5;
    const InputColSize = item.InputColSize || 7;
    const className = item.className || "";
    const rows = item.rows || 5;
    const {data} = this.state;
    let value = data[item.dataIndex] || "";

    return (
      <div className={className}>
        <TextAreaHorizontal key={item.dataIndex} displayLabel={false} isDisabled={isDisabledField} field={field} rows={rows}
          required={item.required} maxLength={maxLength} label={label} refId={refId} value={value} onChange={item.onChange}
          item={item} labelColSize={labelColSize} InputColSize={InputColSize} className={className}
        />
      </div>
    );
  }

  generateAlphaNumericAreaHorizontal = (item) => {
    const label = item.label || 'Label';
    const refId = item.refId || 'id';
    const field = item.dataIndex || item.name || "";
    const isDisabledField = item.isDisabled || false;
    const maxLength = item.size || 150;
    const labelColSize = item.labelColSize || 5;
    const InputColSize = item.InputColSize || 7;
    const className = item.className || "";
    const rows = item.rows || 5;
    const {data} = this.state;
    let value = data[item.dataIndex] || "";

    return (
      <div className={className}>
        <AlphaNumericTextAreaHorizontal key={item.dataIndex} displayLabel={false} isDisabled={isDisabledField} field={field} rows={rows}
          required={item.required} maxLength={maxLength} label={label} refId={refId} value={value} onChange={item.onChange}
          item={item} labelColSize={labelColSize} InputColSize={InputColSize} className={className}
        />
      </div>
    );
  }

  generateTab = (item) => {
    const TabPane = Tabs.TabPane;
    const tabPanes = item.tabView.map((tab, index)=> {
      return <TabPane id={tab.id} tab={tab.title} key={tab.key}>{tab.content}</TabPane>
    });

    return (<Fragment><b>{item.item}</b>
      <Tabs defaultActiveKey={item.defaultActiveKey} onChange={item.onChange}>
        {tabPanes}
      </Tabs></Fragment>
    );

  }

  /**
   * Generate DatePicker Layout
   */
  generateDatePicker = (item) => {
    let refId = item.refId || 'id';
    let name = item.dataIndex || "";
    const {data} = this.state;
    const className = item.className || '';
    const label = item.label || 'Label';
    const field = item.dataIndex || item.name || '';
    const validationResult = item.validationResult;
    let value = moment(data[item.dataIndex], 'YYYY-MM-DD');
    const labelColSize = item.labelColSize || 5;
    const InputColSize = item.InputColSize || 4;
    const inputDescription = item.inputDescription || '';

    return (
      <div className={className}>
        <Datepicker key={item.dataIndex} displayLabel={false} field={field} required={item.required} label={label} refId={refId} value={value}
                      onChange={item.onChange} className={className} validationResult={validationResult} name={name} labelColSize={labelColSize} InputColSize={InputColSize}
                      inputDescription={inputDescription}
        />
      </div>
    );
  }

  /**
   * Generate Radio Button Horizontal Layout
   */
  generateRadioButtonHorizontal = (item) => {
    let label = item.label || 'Label';
    let refId = item.refId || 'id';
    const field = item.dataIndex || item.name || "";
    let required = item.required || false;
    const {data} = this.state;
    let value = data[item.dataIndex] || item.defaultValue || "";
    const className = item.className || "";
    const labelColSize = item.labelColSize || 5;
    const InputColSize = item.InputColSize || 4;
    const isDisabledField = item.isDisabled || false;

    return (
      <div className={className}>
      <RadioInputHorizontal
        inline
        required={required}
        htmlId={item.dataIndex}
        field={field}
        name={item.dataIndex}
        label={label}
        onChange={item.onChange}
        options={item.options}
        value={value}
        refId={refId}
        labelColSize={labelColSize}
        InputColSize={InputColSize}
        isDisabled={isDisabledField}
      />
      </div>
    );
  }

  generateRadioButtonVertical = (item) => {
    let label = item.label || "";
    let refId = item.refId || 'id';
    const field = item.dataIndex || item.name || "";
    let required = item.required || false;
    const {data} = this.state;
    let value = data[item.dataIndex] || item.defaultValue || "";
    const className = item.className || "";
    const labelColSize = item.labelColSize || 5;
    const InputColSize = item.InputColSize || 4;

    return (
      <div className={className}>
      <RadioInputVertical
        inline
        required={required}
        htmlId={item.dataIndex}
        field={field}
        name={item.dataIndex}
        label={label}
        onChange={item.onChange}
        options={item.options}
        value={value}
        refId={refId}
        labelColSize={labelColSize}
        InputColSize={InputColSize}
      />
      </div>
    );
  }

  /**
   * Generate Select Input Horizontal Layout
   */
  generateSelectInputHorizontal = (item) => {
    const required = item.required || false;
    const field = item.dataIndex || item.name || "";
    const label = item.label || 'Label';
    const refId = item.refId || 'id';
    const className = item.className || "";
    const maxLength = item.maxLength || 50;
    const labelColSize = item.labelColSize || 5;
    const InputColSize = item.InputColSize || 4;
    const {data} = this.state;
    let value = data[item.dataIndex] || item.defaultValue || "";
    const isDisabledField = item.isDisabled || false;
    const validationResult = item.validationResult || [];

    return (
      <div className={className}>
      <SelectInputHorizontal
        id={refId}
        displayLabel={true}
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
        isDisabled={isDisabledField}
        validationResult={validationResult}
      />
      </div>
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

  generateTextInputHorizontal = (item) => {
    const label = item.label || 'Label';
    const refId = item.refId || 'id';
    const field = item.dataIndex || item.name || "";
    const description = item.description || "";
    const isDisabledField = item.isDisabled || false;
    const labelColSize = item.labelColSize || 5;
    const InputColSize = item.InputColSize || 7;
    const inputDescSize = item.inputDescSize || 0;
    const inputDescription = item.inputDescription || "";
    const className = item.className || "";
    const {data} = this.state;
    let value = data[item.dataIndex] || "";
    const validationResult = item.validationResult;
    const maxLength = item.maxLength || item.size || 150;

    return (
      <div className={className}>
        <TextInputHorizontal key={item.dataIndex} displayLabel={false} isDisabled={isDisabledField} field={field}
          required={item.required} maxLength={maxLength} label={label} refId={refId} value={value} onChange={item.onChange} description={description}
          item={item} labelColSize={labelColSize} InputColSize={InputColSize} inputDescSize={inputDescSize}
          inputDescription={inputDescription} className={className}
          validationResult={validationResult}
        />
      </div>
    );
  }

  generatePercentageInput = (item) => {

    const label = item.label || 'Label';
    const refId = item.refId || 'id';
    const field = item.dataIndex || item.name || "";
    const description = item.description || "";
    const maxLength = item.maxLength || item.size || 6;
    const isDisabledField = item.isDisabled || false;
    const labelColSize = item.labelColSize || 5;
    const InputColSize = item.InputColSize || 7;
    const inputDescSize = item.inputDescSize || 0;
    const inputDescription = item.inputDescription || "";
    const className = item.className || "";
    const {data} = this.state;
    let value = data[item.dataIndex] || "";
    const validationResult = item.validationResult;
    const autoInsertCommas = item.autoInsertCommas;
    const allowNegative = item.allowNegative;
    const allowDecimal = item.allowDecimal;

    return (
      <div className={className}>
        <PercentageInput key={item.dataIndex} displayLabel={false} isDisabled={isDisabledField} field={field}
          autoInsertCommas={autoInsertCommas} allowNegative={allowNegative} allowDecimal={allowDecimal}
          required={item.required} maxLength={maxLength} label={label} refId={refId} value={value} onChange={item.onChange} description={description}
          item={item} labelColSize={labelColSize} InputColSize={InputColSize} inputDescSize={inputDescSize}
          inputDescription={inputDescription} className={className} validationResult={validationResult}
        />
      </div>
    );
  }

  generateAmountInput = (item) => {

    const label = item.label || 'Label';
    const refId = item.refId || 'id';
    const field = item.dataIndex || item.name || "";
    const description = item.description || "";
    const maxLength = item.maxLength || item.size || 6;
    const isDisabledField = item.isDisabled || false;
    const labelColSize = item.labelColSize || 5;
    const InputColSize = item.InputColSize || 7;
    const inputDescSize = item.inputDescSize || 0;
    const inputDescription = item.inputDescription || "";
    const className = item.className || "";
    const {data} = this.state;
    const validationResult = item.validationResult;
    const autoInsertCommas = item.autoInsertCommas;
    const allowNegative = item.allowNegative;
    const allowDecimal = item.allowDecimal;
    let value = data[item.dataIndex] || "";

    return (
      <div className={className}>
        <AmountInput key={item.dataIndex} displayLabel={false} isDisabled={isDisabledField} field={field}
          autoInsertCommas={autoInsertCommas} allowNegative={allowNegative} allowDecimal={allowDecimal}
          required={item.required} maxLength={maxLength} label={label} refId={refId} value={value} onChange={item.onChange} description={description}
          item={item} labelColSize={labelColSize} InputColSize={InputColSize} inputDescSize={inputDescSize}
          inputDescription={inputDescription} className={className} validationResult={validationResult}
        />
      </div>
    );
  }

  generateAlphaNumericInputHorizontal = (item) => {
    const label = item.label || 'Label';
    const refId = item.refId || 'id';
    const field = item.dataIndex || item.name || "";
    const description = item.description || "";
    const maxLength = item.maxLength || item.size || 150;
    const isDisabledField = item.isDisabled || false;
    const labelColSize = item.labelColSize || 5;
    const InputColSize = item.InputColSize || 7;
    const inputDescSize = item.inputDescSize || 0;
    const inputDescription = item.inputDescription || "";
    const className = item.className || "";
    const {data} = this.state;
    const validationResult = item.validationResult;
    let value = data[item.dataIndex] || "";

    return (
      <div className={className}>
        <AlphaNumericInputHorizontal key={item.dataIndex} displayLabel={false} isDisabled={isDisabledField} field={field}
          required={item.required} maxLength={maxLength} label={label} refId={refId} value={value} onChange={item.onChange} description={description}
          item={item} labelColSize={labelColSize} InputColSize={InputColSize} inputDescSize={inputDescSize}
          inputDescription={inputDescription} className={className} placeholder={item.placeholder || ""}
          validationResult={validationResult}
        />
      </div>
    );
  }

  generateCoaTextInputHorizontal = (item) => {
    const label = item.label || 'Label';
    const refId = item.refId || 'id';
    const field = item.dataIndex || item.name || "";
    const description = item.description || "";
    const maxLength = item.maxLength || item.size || 150;
    const isDisabledField = item.isDisabled || false;
    const labelColSize = item.labelColSize || 5;
    const InputColSize = item.InputColSize || 7;
    const inputDescSize = item.inputDescSize || 0;
    const inputDescription = item.inputDescription || "";
    const className = item.className || "";
    const {data} = this.state;
    const validationResult = item.validationResult;
    const coaTextCN = item.coaTextCN;
    const coaIconPaddingCN = item.coaIconPaddingCN;

    let value = data[item.dataIndex] || "";

    return (
      <div className={className}>
        <CoaSearchInput key={item.dataIndex} displayLabel={false} isDisabled={isDisabledField} field={field}
          required={item.required} maxLength={maxLength} label={label} refId={refId} value={value} onChange={item.onChange} description={description}
          item={item} labelColSize={labelColSize} InputColSize={InputColSize} inputDescSize={inputDescSize} coaIconPaddingCN={coaIconPaddingCN}
          inputDescription={inputDescription} className={className} placeholder={item.placeholder || ""} coaTextCN={coaTextCN}
          validationResult={validationResult}
        />
      </div>
    );
  }

  generateNumericInputHorizontal = (item) => {
    const label = item.label || 'Label';
    const refId = item.refId || 'id';
    const field = item.dataIndex || item.name || "";
    const description = item.description || "";
    const isDisabledField = item.isDisabled || false;
    const maxLength = item.size || item.maxLength || 150;
    const labelColSize = item.labelColSize || 5;
    const InputColSize = item.InputColSize || 7;
    const inputDescSize = item.inputDescSize || 0;
    const inputDescription = item.inputDescription || "";
    const className = item.className || "";
    const {data} = this.state;
    let value = data[item.dataIndex] || "";
    const validationResult = item.validationResult;
    const autoInsertCommas = item.autoInsertCommas;
    const allowNegative = item.allowNegative;
    const allowDecimal = item.allowDecimal;

    return (
      <div className={className}>
        <NumericInputHorizontal key={item.dataIndex} displayLabel={false} isDisabled={isDisabledField} field={field}
          autoInsertCommas={autoInsertCommas} allowNegative={allowNegative} allowDecimal={allowDecimal}
          required={item.required} maxLength={maxLength} label={label} refId={refId} value={value} onChange={item.onChange} description={description}
          item={item} labelColSize={labelColSize} InputColSize={InputColSize} inputDescSize={inputDescSize}
          inputDescription={inputDescription} className={className} validationResult={validationResult}
        />
      </div>
    );
  }

  render () {
    let arr = this.state.formJSON.map((item, index)=> {

      let colItems = item.columns.map((column, colIndex)=> {
        if (column.type !== 'section') {
          return (
            <Col key={colIndex} xs={column.xsColSize || 12} md={column.mdColSize || 6}>
              {this.renderComponent(column)}
            </Col>
          );
        }

        if (column.type === 'section') {
          return this.renderSectionRows(column.sections, column);
        }

      });

      return (<Row key={index} className={item.rowClassName || 'show-grid'}>
        {colItems}
      </Row>)
    });

    // if (this.props.checkError === true) {
    //   this.checkErrorField();
    // }

		return (
      <Fragment>
        <FormGroup>
          <Row>
            <Col md={12}>
              {this.props.title?<h4>{this.props.title}</h4>:null}
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className={this.props.formClass}>
                {arr}
              </div>
            </Col>
          </Row>
        </FormGroup>
      </Fragment>
		);
  }
}

FormEdify.propTypes = {
  /**
   * the data of the components that the form will contain.
   */
  fields: PropTypes.any.isRequired,
  /**
   * the title of the form
   */
  title: PropTypes.string
};

export default FormEdify;
