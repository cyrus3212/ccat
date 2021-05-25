import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./_radioFormInput.scss";
import TextInputHorizontal from '../TextInputHorizontal';
import PercentageInput from '../PercentageInput';
import AmountInput from '../AmountInput';

class RadioFormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorFields: [],
      data: {},
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    let validationResult = nextProps.validationResult;
    let errorFields = state.errorFields;
    let value = nextProps.value || '';

    try {
      if (nextProps.validationResult.length > 0) {
        for (let i = 0; i < validationResult.length; i++) {
          let errorFieldObj = {};
          errorFieldObj['key'] = validationResult[i].key;
          errorFieldObj['message'] = validationResult[i].message;
          errorFields.push(errorFieldObj);
        }
        // validationResult = nextProps.validationResult;
      }
      return { value, data: nextProps.data, errorFields };
    }
    catch (e) {

    }

    return { value, data: nextProps.data };
  }

  getErrorMessage = (inputFieldName) => {
    const {errorFields} = this.state;
    try {
      const filteredErrorMessage = errorFields.filter(errorField => {
        return errorField.key === inputFieldName;
      });
      return filteredErrorMessage[0].message;
    }
    catch (e) {
      return '';
    }
  }

  handleOnChange = (event, isValid) => {
    let value = "";
    if (event.target.value !== '' || event.target.value !== null) {
      value = event.target.value.replace(/[^a-zA-Z0-9\s]/gi,'');
    }
    this.setState({ value });

    const targetValue = {
      id: this.props.id,
      value,
      name: event.target.name,
    };

    try {
      this.props.onChange(event.target);
    }
    catch (e) {

    }
  };

  renderRadioFormInput() {
    const { inputFields, title, onChange } = this.props

    let labels = inputFields.map((inputField, index) => {

      const label = inputField.label || 'Label';
      const refId = inputField.refId || 'id';
      const field = inputField.dataIndex || inputField.name || '';
      const description = inputField.description || '';
      const isDisabledField = inputField.isDisabled || false;
      const labelColSize = inputField.labelColSize || 5;
      const InputColSize = inputField.InputColSize || 7;
      const inputDescSize = inputField.inputDescSize || 0;
      const inputDescription = inputField.inputDescription || '';
      const className = inputField.className || '';
      const {data} = this.state;
      let value = data[inputField.dataIndex] || inputField.defaultValue || '';
      const validationResult = inputField.validationResult;
      const maxLength = inputField.maxLength || inputField.size || 150;
      const autoInsertCommas = inputField.autoInsertCommas;
      const allowNegative = inputField.allowNegative;
      const allowDecimal = inputField.allowDecimal;

      if (inputField.type === 'percentageInput') {

        const renderComponent = <div className={className}>
          <PercentageInput key={inputField.dataIndex} displayLabel={false} isDisabled={isDisabledField} field={field}
                              autoInsertCommas={autoInsertCommas} allowNegative={allowNegative} allowDecimal={allowDecimal}
                              required={inputField.required} maxLength={maxLength} label={label} refId={refId} value={value} onChange={inputField.onChange} description={description}
                              inputField={inputField} labelColSize={labelColSize} InputColSize={InputColSize} inputDescSize={inputDescSize}
                              inputDescription={inputDescription} className={className} validationResult={validationResult}
          />
        </div>

        return(
          <span key={index} className="radioFormInput">
            {renderComponent}
          </span>
        )

      }else if (inputField.type === 'amountInput') {

        const renderComponent = <div className={className}>
          <AmountInput key={inputField.dataIndex} displayLabel={false} isDisabled={isDisabledField} field={field}
            autoInsertCommas={autoInsertCommas} allowNegative={allowNegative} allowDecimal={allowDecimal}
            required={inputField.required} maxLength={maxLength} label={label} refId={refId} value={value} onChange={inputField.onChange} description={description}
            inputField={inputField} labelColSize={labelColSize} InputColSize={InputColSize} inputDescSize={inputDescSize}
            inputDescription={inputDescription} className={className} validationResult={validationResult}
          />
        </div>

        return(
          <span key={index} className="radioFormInput">
            {renderComponent}
          </span>
        )

      }else{

        const renderComponent = <div className={className}>
          <TextInputHorizontal key={inputField.dataIndex} displayLabel={false} isDisabled={isDisabledField} field={field}
            required={inputField.required} maxLength={maxLength} label={label} refId={refId} value={value} onChange={inputField.onChange} description={description}
            inputField={inputField} labelColSize={labelColSize} InputColSize={InputColSize} inputDescSize={inputDescSize}
            inputDescription={inputDescription} className={className}
            validationResult={validationResult}
          />
        </div>

        return(
          <span key={index} className="radioFormInput">
            {renderComponent}
          </span>
        )
      }

    })

    return(
      <div className="radioFormWrap">
        <div className="radioFormTitle">{title}</div>
        <div className="radioFormLabels">{labels}</div>
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.renderRadioFormInput()}
      </div>

    );
  }

}

RadioFormInput.propTypes = {
  inputFields: PropTypes.array,
  title:  PropTypes.string,
  onChange: PropTypes.func,
};

export default RadioFormInput;
