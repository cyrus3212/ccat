import React, { Fragment } from 'react';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Table from '@coxautokc/fusion-ui-components/lib/Table';
import CellTextInput from '../CellTextInput';
import PropTypes from 'prop-types';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import { Link } from 'react-router-dom';
import './_table.scss';
import DropdownMenu from '@coxautokc/fusion-ui-components/lib/DropdownMenu';
import AccessTypeSelectInput from '../../reusable/AccessTypeSelectInput';
import StoreSearchableSelect from '../../reusable/StoreSearchableSelect';
import WorkbookSearchableSelect from '../../reusable/WorkbookSearchableSelect';
import SelectInput from '../../reusable/SelectInput';
import SearchableSelect from '@coxautokc/fusion-ui-components/lib/SearchableSelect';
import RadioButtonList from '@coxautokc/fusion-ui-components/lib/RadioButtonList';
import EmailIcon from './icons/EmailIcon';
import CheckIcon from './icons/CheckIcon';
import commonTranslate from '../../../translation/common.json';
import CellEmailInput from '../CellEmailInput';
import CellAlphaNumericInput from '../CellAlphaNumericInput';
import CellNumericInput from '../CellNumericInput';
import CellPercentageInput from '../CellPercentageInput';
import CellAmountInput from '../CellAmountInput';
import CustomTableHeader from '../CustomTableHeader';
import CellCoaTextInput from '../CellCoaTextInput';

class TableEdify extends React.Component {
  state = {
    data: [],
    isDisabled: false,
    counter: 0,
  };

  static getDerivedStateFromProps(nextProps) {
    const { data } = nextProps;
    return { data }
  }

  checkValidation = (event, field, isLabel) => {
    const result = event.validationResult || [];

    if (result.length)
    {
      for (let i = 0; i < result.length; i++) {
        if (result[i].key === field)
        {
          return isLabel ? "hasError" : result[i].message;
        }
      }
    }
  }

  handleOnDisabled = (func, data) => {
    this.setState({isDisabled: func(data)});
  }

  generateColumns = (datas) => {
    let resType;
    let counter = 0;

    // @todo create checkbox column if rowselection is true
    const generatedColumns = datas.map((data, index)=> {

      if (data.type === "textInput") {
        resType = {
          title: data.title,
          dataIndex: data.dataIndex,
          key: data.dataIndex,
          columnSortable: data.columnSortable,
          className: data.className,
          render: (text, item, i) => (
            data.isCheckValidation === true ?
              <div className={this.checkValidation(item, data.dataIndex, true)}>
                {this.generateTextInput(data, item, i)}
                <span className="help-block-custom">
                  <p>{this.checkValidation(item, data.dataIndex, false)}</p>
                </span>
              </div>
              :
              this.generateTextInput(data, item, i)
          )
        };
      }
      else if (data.type === "emailInput") {
        resType = {
          title: data.title,
          dataIndex: data.dataIndex,
          key: data.dataIndex,
          columnSortable: data.columnSortable,
          className: data.className,
          render: (text, item, i) => (
            data.isCheckValidation === true ?
              <div className={this.checkValidation(item, data.dataIndex, true)}>
                {this.generateEmailInput(data, item, i)}
                <span className="help-block-custom">
                  <p>{this.checkValidation(item, data.dataIndex, false)}</p>
                </span>
              </div>
              :
              this.generateEmailInput(data, item, i)
          )
        };
      }
      else if (data.type === "numericInput") {
        resType = {
          title: data.title,
          dataIndex: data.dataIndex,
          key: data.dataIndex,
          columnSortable: data.columnSortable,
          render: (text, item, i) => (
            data.isCheckValidation === true ?
              <div className={this.checkValidation(item, data.dataIndex, true)}>
                {this.generateNumericInput(data, item, i)}
                <span className="help-block-custom">
                  <p>{this.checkValidation(item, data.dataIndex, false)}</p>
                </span>
              </div>
              :
              this.generateNumericInput(data, item, i)
          )
        };
      }
      else if (data.type === "percentageInput") {
        resType = {
          title: data.title,
          dataIndex: data.dataIndex,
          key: data.dataIndex,
          columnSortable: data.columnSortable,
          render: (text, item, i) => (
            data.isCheckValidation === true ?
              <div className={this.checkValidation(item, data.dataIndex, true)}>
                {this.generatePercentageInput(data, item, i)}
                <span className="help-block-custom">
                  <p>{this.checkValidation(item, data.dataIndex, false)}</p>
                </span>
              </div>
              :
              this.generatePercentageInput(data, item, i)
          )
        };
      }
      else if (data.type === "coaTextInput") {
        resType = {
          title: data.title,
          dataIndex: data.dataIndex,
          key: data.dataIndex,
          columnSortable: data.columnSortable,
          render: (text, item, i) => (
            data.isCheckValidation === true ?
              <div className={this.checkValidation(item, data.dataIndex, true)}>
                {this.generateCoaSearchInput(data, item, i)}
                <span className="help-block-custom">
                  <p>{this.checkValidation(item, data.dataIndex, false)}</p>
                </span>
              </div>
              :
              this.generateCoaSearchInput(data, item, i)
          )
        };
      }
      else if (data.type === "amountInput") {
        resType = {
          title: data.title,
          dataIndex: data.dataIndex,
          key: data.dataIndex,
          columnSortable: data.columnSortable,
          render: (text, item, i) => (
            data.isCheckValidation === true ?
              <div className={this.checkValidation(item, data.dataIndex, true)}>
                {this.generateAmountInput(data, item, i)}
                <span className="help-block-custom">
                  <p>{this.checkValidation(item, data.dataIndex, false)}</p>
                </span>
              </div>
              :
              this.generateAmountInput(data, item, i)
          )
        };
      }
      else if (data.type === "alphaNumericInput") {
        resType = {
          title: data.title,
          dataIndex: data.dataIndex,
          key: data.dataIndex,
          columnSortable: data.columnSortable,
          render: (text, item, i) => (
            data.isCheckValidation === true ?
              <div className={this.checkValidation(item, data.dataIndex, true)}>
                {this.generateAlphaNumericInput(data, item, i)}
                <span className="help-block-custom">
                  <p>{this.checkValidation(item, data.dataIndex, false)}</p>
                </span>
              </div>
              :
              this.generateAlphaNumericInput(data, item, i)
          )
        };
      }
      else if (data.type === "actionButtons") {
        resType = {
          title: data.title,
          dataIndex: "extraData",
          columnSortable: false,
          key: "extraData",
          className: "table-action-col text-right",
          render: (text, item) => (
            <div className="text-right">
              {this.generateActionButton(data, item)}
            </div>
          )
        };
      }
      else if (data.type === "radioInput") {
        resType = {
          title: data.title,
          dataIndex: data.dataIndex,
          columnSortable: false,
          key: data.dataIndex,
          render: (text, item, i) => (
            <div className="table-edify-radio text-left">
              {this.generateRadio(data, item, i)}
            </div>
          )
        };
      }
      else if (data.type === "checkBoxInput") {
        resType = {
          title: <input type="checkbox"/>,
          dataIndex: 'data.dataIndex',
          columnSortable: false,
          key: 'data.dataIndex',
          render: (text, item) => (
            <div className="text-right">
              {this.generateCheckbox(data, item)}
            </div>
          )
        };
      }
      else if (data.type === "accessTypeSelect") {
        resType = {
          title: data.title,
          dataIndex: data.dataIndex,
          key: data.dataIndex,
          columnSortable: false,
          render: (text, item) => (
            data.isCheckValidation === true ?
              <div className={this.checkValidation(item, data.dataIndex, true)}>
                {<div className="text-right">
                  {this.generateAccessTypeSelect(data, item)}
                </div>
                }
                <span className="help-block-custom">
                  <p>{this.checkValidation(item, data.dataIndex, false)}</p>
                </span>
              </div>
              :
              <div className="text-right">
                {this.generateAccessTypeSelect(data, item)}
              </div>
          )
        };
      }
      else if (data.type === "selectText") {
        resType = {
          title: data.title,
          dataIndex: data.dataIndex,
          key: data.dataIndex,
          columnSortable: false,
          render: (text, item) => (
            data.isCheckValidation === true ?
              <div className={this.checkValidation(item, data.dataIndex, true)}>
                {<div className="text-left">
                  {this.generateSelectText(data, item)}
                </div>
                }
                <span className="help-block-custom">
                  <p>{this.checkValidation(item, data.dataIndex, false)}</p>
                </span>
              </div>
              :
              <div className="text-left">
                {this.generateSelectText(data, item)}
              </div>
          )
        };
      }
      else if (data.type === "selectInput") {
        resType = {
          title: data.title,
          dataIndex: data.dataIndex,
          key: data.dataIndex,
          columnSortable: false,
          render: (text, item, i) => (
            data.isCheckValidation === true ?
              <div className={this.checkValidation(item, data.dataIndex, true)}>
                {<div className="text-right">
                  {this.generateSelectInput(data, item, i)}
                </div>
                }
                <span className="help-block-custom">
                  <p>{this.checkValidation(item, data.dataIndex, false)}</p>
                </span>
              </div>
              :
              <div className="text-right">
                {this.generateSelectInput(data, item, i)}
              </div>
          )
        };
      }
      else if (data.type === "searchableSelect") {
        resType = {
          title: data.title,
          dataIndex: data.dataIndex,
          key: data.dataIndex,
          columnSortable: false,
          render: (text, item) => (
            <div className="text-right">
              {this.generateSearchableSelect(data, item)}
            </div>
          )
        };
      }
      else if (data.type === "notificationState") {
        resType = {
          title: data.title,
          dataIndex: data.dataIndex,
          key: data.dataIndex,
          columnSortable: false,
          render: (text, item) => (
            <div className="text-left notificationIcon">
              {this.generateNotificationState(data, item)}
            </div>
          )
        };
      }
      else if (data.type === "storeSearchableSelect") {
        resType = {
          title: data.title,
          dataIndex: data.dataIndex,
          key: data.dataIndex,
          columnSortable: false,
          render: (text, item) => (
            data.isCheckValidation === true ?
              <div className={this.checkValidation(item, data.dataIndex, true)}>
                {<div className="text-right">
                  {this.generateStoreSearchableSelect(data, item)}
                </div>
                }
                <span className="help-block-custom">
                  <p>{this.checkValidation(item, data.dataIndex, false)}</p>
                </span>
              </div>
              :
              <div className="text-right">
                {this.generateStoreSearchableSelect(data, item)}
              </div>
          )
        };
      }
      else if (data.type === "workbookSearchableSelect") {
        resType = {
          title: data.title,
          dataIndex: data.dataIndex,
          key: data.dataIndex,
          columnSortable: false,
          render: (text, item) => (
            data.isCheckValidation === true ?
              <div className={this.checkValidation(item, data.dataIndex, true)}>
                {<div className="text-right">
                  {this.generateWorkbookSearchableSelect(data, item)}
                </div>
                }
                <span className="help-block-custom">
                  <p>{this.checkValidation(item, data.dataIndex, false)}</p>
                </span>
              </div>
              :
              <div className="text-right">
                {this.generateWorkbookSearchableSelect(data, item)}
              </div>
          )
        };
      }
      else {
        resType = {
          columnSortable: false,
          title: data.title,
          dataIndex: data.dataIndex,
          key: data.dataIndex
        };
      }

      return (
        resType
      );

    });

    return generatedColumns;
  }

  generateActionButton = (data, item) => {
    const generatedButtons = data.actionButtons.map((button, index)=> {
      const className = button.className || '';
      let disabled = false;

      if (typeof button.isDisabled === 'function') {
        disabled = button.isDisabled(item);
      }
      else {
        disabled = button.isDisabled || false;
      }

      let field = button.dataIndex || 'id';
      let param = button.param || '';
      let toUrl = button.url || '#';

      if (param !== '' && button.exact === true) {
        toUrl = toUrl + item[param];
      }

      if (button.type === "button") {
        return (
          <Button htmlId={button.htmlId} key={index} onClick={() => button.onClick(item)} disabled={disabled}  >
            {button.text}
          </Button>
        );
      }
      else if (button.type === "link") {
        return (<Link  key={index} to={(button.exact === true) ? toUrl : toUrl+item[field]} disabled={disabled}>{button.text}</Link>);
      }
      else if (button.type === "upload") {
        return (
          <label class="custom-file-upload">
            <input type="file" onChange={button.onChange} />
            <span className="icon-button-container">
              <span>{button.text}</span>
            </span>
          </label>
        );
      }
    });

    // return generatedButtons;
    return (
      <DropdownMenu
        buttonText="..."
        htmlId="dropdown"
        className="dot-action"
      >
        { generatedButtons }
      </DropdownMenu>
    )
  }

  generateNotificationState = (data, item) => {
    return (
      <Fragment>
        { item.inviteCount > 0 ? <CheckIcon /> : <EmailIcon /> }
      </Fragment>
    );
  }

  taxGroup = (data, item) => {
    try {
      if (data.dataIndex === 'warranty' || data.dataIndex === 'internal' || data.dataIndex === 'svcCont') {
        // return (item.isDefault !== undefined) ? item.isDefault || false : false
          return item.isDefault || false;
      }
    }
    catch (e) {
      return false;
    }
  }

  generateRadio = (data, item, i) => {
    let isDisabledField = false;
    let targetId = item[data.refId];
    let value = item[data.dataIndex] || data.defaultValue || '';
    let defaultOptions = [
      {value: "Y",label: "Y", disabled: this.taxGroup(data, item)},
      {value: "N",label: "N", disabled: this.taxGroup(data, item)}
    ];
    let options = data.options || defaultOptions;

    if (typeof data.isDisabled === 'function') {
      isDisabledField = data.isDisabled(item);
    }
    else {
      isDisabledField = data.isDisabled || false;
    }

    return (
      <RadioButtonList
        inline
        className={isDisabledField ? 'disabled' : ''}
        displayLabel={false}
        htmlId={`${data.dataIndex}-${i}`}
        name={`${data.dataIndex}-${i}`}
        onChange={(event) => data.onChange(event.target, targetId, data.dataIndex)}
        value={value}
        options={options}
      />
    );
  }

  generateSelectInput = (data, item, i) => {
    let isDisabledField = false;
    let refId = data.refId || 'id';
    let options = data.options || [];
    let onClick = () => {};

    if (typeof data.isDisabled === 'function' && !item.isDefault) {
      isDisabledField = data.isDisabled(item);
    }
    else if (item.isDefault !== undefined) {
      isDisabledField = item.isDefault || false;

    } else {
      isDisabledField = data.isDisabled || false;
    }

    if (typeof data.onClick === 'function') {
      onClick = data.onClick;
    }

    return (
      <SelectInput
        htmlId={`${data.dataIndex}-${i}`}
        value={item[data.dataIndex]}
        refId={refId}
        options={options}
        name={data.dataIndex}
        onChange={data.onChange}
        item={item}
        onClick={onClick}
        required={data.required}
        disabled={isDisabledField}
      />
    );
  }

  generateSelectText = (data, item) => {
    let value = data.options.map(res => {
      if ( res.value == item[data.dataIndex]) {
        return res.label;
      }
    });

    return (
      <span>{value ? value : ''}</span>
    );
  }

  generateTextInput = (data, item, i) => {
    let isDisabledField = false;
    let label = data.label || data.title;
    let refId = data.refId || 'id';
    let id = item.key || item.id || item.cId || '';
    let forceEmpty = false;
    let value = item[data.dataIndex] || '';

    if (typeof data.forceEmpty === 'function') {
      forceEmpty = data.forceEmpty(item);
    }
    else {
      forceEmpty = data.forceEmpty || false;
    }

    // if (item.isDefault !== undefined) {
    //   isDisabledField = item.isDefault || false;
    // }
    // else {
    //   if (typeof data.isDisabled === 'function') {
    //     isDisabledField = data.isDisabled(item);
    //   }
    //   else {
    //     isDisabledField = data.isDisabled || false;
    //   }
    // }

    if (typeof data.isDisabled === 'function' && !item.isDefault) {
      isDisabledField = data.isDisabled(item);
    }
    else if (item.isDefault !== undefined) {
      isDisabledField = item.isDefault || false;

    } else {
      isDisabledField = data.isDisabled || false;
    }

    return (
      <CellTextInput
        id={`${data.dataIndex}-${i}`}
        key={i}
        onChange={data.onChange}
        isDisabled={isDisabledField}
        field={data.dataIndex}
        onFocus={data.onFocus}
        onBlur={data.onBlur}
        required={data.required}
        maxLength={data.maxLength}
        label={label}
        refId={refId}
        data={value}
        placeholder={data.placeholder}
        item={item}
        forceEmpty={forceEmpty}
      />
    );
  }

  generateEmailInput = (data, item, i) => {
    let isDisabledField = false;
    let label = data.label || data.title;
    let id = item.key || item.id || item.cId || '';
    let refId = data.refId || 'id';
    let forceEmpty = false;
    let value = item[data.dataIndex] || '';

    if (typeof data.forceEmpty === 'function') {
      forceEmpty = data.forceEmpty(item);
    }
    else {
      forceEmpty = data.forceEmpty || false;
    }

    if (typeof data.isDisabled === 'function' && !item.isDefault) {
      isDisabledField = data.isDisabled(item);
    }
    else if (item.isDefault !== undefined) {
      isDisabledField = item.isDefault || false;

    } else {
      isDisabledField = data.isDisabled || false;
    }

    return (
      <CellEmailInput
        placeholder={data.placeholder}
        id={`${data.dataIndex}-${i}`}
        onChange={data.onChange}
        isDisabled={isDisabledField}
        field={data.dataIndex}
        onFocus={data.onFocus}
        onBlur={data.onBlur}
        required={data.required}
        maxLength={data.maxLength}
        label={label}
        refId={refId}
        data={value}
        item={item}
        forceEmpty={forceEmpty}
      />
    );
  }

  onRowClick = (row, index, event) => {
    const { enableOnRowClick } = this.props;
    let id = row.id || row.cId || row.rid;

    if (enableOnRowClick) {
      const { data } = this.state;
      let selectedRow = data.findIndex(selectedRow => {
        if (selectedRow.id) {
          return selectedRow.id == id;
        }

        if (selectedRow.cId) {
          return selectedRow.cId == id;
        }

        if (selectedRow.rid) {
          return selectedRow.rid == id;
        }
      });

      data.map(i => i.isClicked = false);

      data[selectedRow].isClicked = true;
      this.setState({ data });

      this.props.onRowClick(row);
    };
  };

  generateNumericInput = (data, item, i) => {
    let isDisabledField = false;
    let label = data.label || data.title || '';
    let refId = data.refId || 'id';
    let id = item.key || item.id || item.cId || '';
    let value = item[data.dataIndex] || data.defaultValue || "";
    let allowDecimal = data.allowDecimal || false;
    let autoInsertCommas = data.autoInsertCommas || false;

    if (typeof data.isDisabled === 'function' && !item.isDefault) {
      isDisabledField = data.isDisabled(item);
    }
    else if (item.isDefault !== undefined) {
      isDisabledField = item.isDefault || false;

    } else {
      isDisabledField = data.isDisabled || false;
    }


    return (
      <CellNumericInput
        id={`${data.dataIndex}-${i}`}
        onChange={data.onChange}
        placeholder={data.placeholder}
        isDisabled={isDisabledField}
        field={data.dataIndex}
        onFocus={data.onFocus}
        onBlur={data.onBlur}
        required={data.required}
        maxLength={data.maxLength}
        label={label}
        refId={refId}
        value={value}
        item={item}
        autoInsertCommas={autoInsertCommas}
        allowNegative={data.allowNegative}
        allowDecimal={allowDecimal}
      />
    );
  }

  generatePercentageInput = (data, item, i) => {
    let isDisabledField = false;
    let label = data.label || data.title || "";
    let refId = data.refId || 'id';
    let id = item.key || item.id || item.cId || "";
    let value = item[data.dataIndex] || data.defaultValue || "0";
    let allowDecimal = data.allowDecimal || false;

    // if (item.isDefault !== undefined) {
    //   isDisabledField = item.isDefault || false;
    // }
    // else {
    //   if (typeof data.isDisabled === 'function') {
    //     isDisabledField = data.isDisabled(item);
    //   }
    //   else {
    //     isDisabledField = data.isDisabled || false;
    //   }
    // }

    if (typeof data.isDisabled === 'function' && !item.isDefault) {
      isDisabledField = data.isDisabled(item);
    }
    else if (item.isDefault !== undefined) {
      isDisabledField = item.isDefault || false;

    } else {
      isDisabledField = data.isDisabled || false;
    }

    return (
      <CellPercentageInput
        id={`${data.dataIndex}-${i}`}
        onChange={data.onChange}
        isDisabled={isDisabledField}
        field={data.dataIndex}
        onFocus={data.onFocus}
        onBlur={data.onBlur}
        required={data.required}
        maxLength={data.maxLength}
        label={label}
        refId={refId}
        value={value}
        item={item}
        placeholder={data.placeholder}
        autoInsertCommas={data.autoInsertCommas}
        allowNegative={data.allowNegative}
        allowDecimal={allowDecimal}
      />
    );
  }

  generateCoaSearchInput = (data, item, i) => {
    let isDisabledField = false;
    let label = data.label || data.title || "";
    let refId = data.refId || "id";
    let id = item.key || item.id || item.cId || "";
    let value = item[data.dataIndex] || data.defaultValue || "";

    if (typeof data.isDisabled === 'function' && !item.isDefault) {
      isDisabledField = data.isDisabled(item);
    }
    else if (item.isDefault !== undefined) {
      isDisabledField = item.isDefault || false;

    } else {
      isDisabledField = data.isDisabled || false;
    }

    return (
      <CellCoaTextInput
        id={`${data.dataIndex}-${i}`}
        onChange={data.onChange}
        isDisabled={isDisabledField}
        field={data.dataIndex}
        onFocus={data.onFocus}
        onBlur={data.onBlur}
        required={data.required}
        maxLength={data.maxLength}
        label={label}
        refId={refId}
        value={value}
        item={item}
        placeholder={data.placeholder}
      />
    );
  }

  generateAmountInput = (data, item, i) => {
    let isDisabledField = false;
    let label = data.label || data.title || '';
    let refId = data.refId || 'id';
    let id = item.key || item.id || item.cId || '';
    let value = item[data.dataIndex] || data.defaultValue || "0";
    let allowDecimal = data.allowDecimal || true;
    let placeholder = data.placeholder || '$';

    if (item.isDefault !== undefined) {
      isDisabledField = item.isDefault || false;
    }
    else {
      if (typeof data.isDisabled === 'function') {
        isDisabledField = data.isDisabled(item);
      }
      else {
        isDisabledField = data.isDisabled || false;
      }
    }

    return (
      <CellAmountInput
        id={`${data.dataIndex}-${i}`}
        onChange={data.onChange}
        isDisabled={isDisabledField}
        field={data.dataIndex}
        onFocus={data.onFocus}
        onBlur={data.onBlur}
        required={data.required}
        maxLength={data.maxLength}
        label={label}
        refId={refId}
        value={value}
        item={item}
        placeholder={data.placeholder}
        autoInsertCommas={data.autoInsertCommas}
        allowNegative={data.allowNegative}
        allowDecimal={allowDecimal}
        placeholder={placeholder}
      />
    );
  }

  generateAlphaNumericInput = (data, item, i) => {
    let isDisabledField = false;
    let label = data.label || data.title || '';
    let refId = data.refId || 'id';
    let id = item.key || item.id || item.cId || '';
    let value = item[data.dataIndex] !== null ? item[data.dataIndex] : '';

    if (typeof data.isDisabled === 'function' && !item.isDefault) {
      isDisabledField = data.isDisabled(item);
    }
    else if (item.isDefault !== undefined) {
      isDisabledField = item.isDefault || false;

    } else {
      isDisabledField = data.isDisabled || false;
    }

    return (
      <CellAlphaNumericInput
        onChange={data.onChange}
        isDisabled={isDisabledField}
        field={data.dataIndex}
        onFocus={data.onFocus}
        id={`${data.dataIndex}-${i}`}
        onBlur={data.onBlur}
        required={data.required}
        maxLength={data.maxLength || 0}
        label={label}
        refId={refId}
        value={value || ''}
        item={item}
        placeholder={data.placeholder}
        autoInsertCommas={data.autoInsertCommas}
        allowNegative={data.allowNegative}
        allowDecimal={data.allowDecimal}
      />
    );
  }

  generateAccessTypeSelect = (data, item) => {
    let isDisabledField = false;
    let refId = data.refId || 'id';

    if (typeof data.isDisabled === 'function') {
      isDisabledField = data.isDisabled(item);
    }
    else {
      isDisabledField = data.isDisabled || false;
    }

    return (
      <AccessTypeSelectInput value={item[data.dataIndex]} refId={refId} options={data.options} name={data.dataIndex} item={item} onChange={data.onChange} isDisabled={isDisabledField} />
    )
  }

  generateStoreSearchableSelect = (data, item) => {
    let isDisabledField = false;
    let refId = data.refId || 'id';
    if (typeof data.isDisabled === 'function') {
      isDisabledField = data.isDisabled(item);
    }
    else {
      isDisabledField = data.isDisabled || false;
    }

    return (
      <StoreSearchableSelect value={item[data.dataIndex]} refId={refId} options={data.options} name={data.dataIndex} onChange={data.onChange} item={item} isDisabled={isDisabledField} />
    )
  }

  generateWorkbookSearchableSelect = (data, item) => {
    let isDisabledField = false;
    let refId = data.refId || 'id';
    if (typeof data.isDisabled === 'function') {
      isDisabledField = data.isDisabled(item);
    }
    else {
      isDisabledField = data.isDisabled || false;
    }

    return (
      <WorkbookSearchableSelect value={item[data.dataIndex]} refId={refId} options={data.options} name={data.dataIndex} item={item} onChange={data.onChange} isDisabled={isDisabledField} />
    )
  }

  generateSearchableSelect = (data, item) => {
    let isDisabledField = false;
    let refId = data.refId || 'id';
    let id = item.id || item.cId || '';
    let label = data.label || data.title || '';
    const options = data.options || [];

    if (typeof data.isDisabled === 'function') {
      isDisabledField = data.isDisabled(item);
    }
    else {
      isDisabledField = data.isDisabled || false;
    }

    return (
      <SearchableSelect
        htmlId="searchableSelect"
        label={label}
        refId={refId}
        name={data.dataIndex}
        onChange={(event) => data.onChange(event.target, id, data.dataIndex)}
        displayLabel={false}
        options={options}
        disabled={isDisabledField}
        value={item[data.dataIndex]}
      />
    )
  }

  generateRowSelection = (value) => {
    if (value) {
      const rowSelection = {
        onChange: (rows) => {
          this.props.onRowSelection(rows);
        }
      }
      return rowSelection;
    } else {
      return null;
    }
  }

  onClickCustomTitleAction = (field, value) => {
    const { data } = this.state;

    // we will check if it is on API batch update
    if (typeof this.props.onApiBatchUpdate === 'function') {
      this.props.onApiBatchUpdate(field, value);
    }
    else {
      data.map(res => {
        res[field] = value
      });
      this.setState({ data });
    }
  }

  generateCustomHeader = (columns) => {
    let customColumns = [];
    let isApiBatchUpdate = false;
    columns.map(res => {
      customColumns.push(res)
    });

    if (typeof this.props.onApiBatchUpdate === 'function') {
      isApiBatchUpdate = true;
    }

    return customColumns.map((col, i) => {
      let title = col.title || '';
      let column = col;
      let enableBatchUpdate = col.enableBatchUpdate || false;

      let header =  !this.props.enableCustomHeader ? null :
        <CustomTableHeader
          title={title}
          column={column}
          enableBatchUpdate={enableBatchUpdate}
          onClickCustomTitleAction={this.onClickCustomTitleAction}
          onCloseApiBatchUpdate={this.props.onApiBatchUpdate}
          isApiBatchUpdate={isApiBatchUpdate}
          dispatch={this.props.dispatch}
          summary={this.props.summary || {}}
        />

      return (
        <span className={col.dataIndex === 'extraData' ? 'text-right' : ''} key={i}>{ header }</span>
      )
    });
  };

  generateCustomUpperHeader = (columns) => {
    let customColumns = [];
    columns.map(res => {
      if (res.displayCustomTitle) {
        customColumns.push(res.customHeaderTitle);
      } else {
        customColumns.push('')
      }
    });

    return customColumns.map(res => {
      return <span>{res}</span>
    });
  }

  getRowClass = (e, index) => {
    if (e.isClicked) {
      if (index % 2 === 0) {
        return 'table-even-row ant-table-row-selected';
      } else {
        return 'table-odd-row ant-table-row-selected';
      }
    } else {
      if (index % 2 === 0) {
        return 'table-even-row';
      } else {
        return 'table-odd-row';
      }
    }
  };

  render () {
    const htmlId = this.props.htmlId || "tableEdify";
    const isLoading = this.props.isLoading || false;
    const pageSize = this.props.pageSize || 20000000;
    const displayPageSizeSelector = this.props.displayPageSizeSelector || false;
    const enablePagination = this.props.enablePagination || false;
    const displayFilter = this.props.displayFilter === undefined ? true : this.props.displayFilter;
    const displayHeader = this.props.displayHeader === undefined ? true : this.props.displayHeader;
    const sortableColumns = this.props.sortableColumns === undefined ? true : this.props.sortableColumns;
    const isAddNewDisable = this.props.isAddNewDisable || false;
    const {columns, data, tableTitle, rowSelection} = this.props;
    const enableCustomHeader = this.props.enableCustomHeader ? true : false;
    const enableCustomUpperHeader = this.props.enableCustomUpperHeader ? true : false;
    let dataLen = this.props.data.length || 0;

    let scrollY = dataLen > 9 ? this.props.scrollY : 0;
    let scrollX = dataLen > 9 ? this.props.scrollX : 0;

    let forceScrollX = this.props.forceScrollX || false;
    let forceScrollY = this.props.forceScrollY || false;

    if (forceScrollX && dataLen > 0) {
      scrollX = this.props.scrollX;
    }

    if (forceScrollY) {
      scrollY = this.props.scrollY;
    };

    return (
      <Fragment>
        <div className={`tableTitle ${displayFilter === true ? "with-filter" : "hide-filter"}`}>{tableTitle}</div>

        <Row className={`
            ${enableCustomHeader ? 'enable-custom-header' : ''}
            ${this.state.data.length > 10 ? 'has-large-data' : ''}
          `}
        >
          { !enableCustomUpperHeader ? null :
            <div className="custom-header upper">
              { this.generateCustomUpperHeader(columns) }
            </div>
          }

          { !enableCustomHeader ? null :
            <div className="custom-header">
              { this.generateCustomHeader(columns) }
            </div>
          }
            <Table
              className={forceScrollX ? 'ant-table-fixed' : this.props.className}
              htmlId={htmlId}
              dataDensity="comfortable"
              data={this.state.data}
              columns={this.generateColumns(columns)}
              rowKey={(itemRow) => {
                if (itemRow.rid !== undefined) {
                  return itemRow.rid;
                } else if (itemRow.cId !== undefined) {
                  return itemRow.cId;
                } else {
                  return itemRow.id;
                }
              }}
              rowClassName={(e, i) => this.getRowClass(e, i)}
              onRow={(record, index) => ({
                onClick: event => this.onRowClick(record, index, event)
              })}
              isLoading={isLoading}
              rowSelection={rowSelection === false ? null : this.generateRowSelection(rowSelection)}
              sortableColumns={sortableColumns}
              displayFilter={displayFilter}
              scrollY={scrollY}
              displayHeader={displayHeader}
              scrollX={scrollX}
              pageSize={pageSize}
              displayPageSizeSelector={displayPageSizeSelector}
              enablePagination={enablePagination}
            />
        </Row>
        {this.props.displayAddItem === true ?
        <Row>
          <Col md={12} className="add-row-button">
            <Button
              htmlId="addItem"
              disabled={isAddNewDisable}
              onClick={(event) => this.props.onAddItemClick(event, columns)}
              buttonStyle="link"
              className="icon-link-button"
            >
              <i className="fas fa-plus" /> {commonTranslate.addItem}
            </Button>
          </Col>
        </Row> : '' }
      </Fragment>

    );
  }
}

TableEdify.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  displayPageSizeSelector: PropTypes.bool,
  enablePagination: PropTypes.bool,
  displayFilter: PropTypes.bool,
  displayHeader: PropTypes.bool,
  sortableColumns: PropTypes.bool,
  htmlId: PropTypes.string,
  pageSize: PropTypes.number,
  scrollX: PropTypes.number,
  scrollY: PropTypes.number,
  hideSearchInput: PropTypes.bool
};

export default TableEdify;
