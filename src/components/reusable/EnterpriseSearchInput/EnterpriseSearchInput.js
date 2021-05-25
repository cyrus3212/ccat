import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { getEnterpriseCodesSelect } from '../../../api/selects/enterpriseCodeSelectApi';
import './_enterpriseSearchInput.scss';
import PropTypes from 'prop-types';

class EnterpriseSearchInput extends Component {
  state = {
    isShowSearchResult: false,
    enterprises: [],
    enterpriseCode: '',
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.enterpriseCodesSelect && nextProps.enterpriseCode !== "") {
      return {
        enterprises: nextProps.enterpriseCodesSelect.data,
        enterpriseCode: nextProps.enterpriseCode
      }
    }

    return {...nextProps, ...state};
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.enterpriseCodesSelect && nextProps.enterpriseCode !== "") {
  //     debugger
  //     this.setState({
  //       enterprises: nextProps.enterpriseCodesSelect.data,
  //       enterpriseCode: nextProps.enterpriseCode
  //     });
  //   }
  // }

  onChangeInput = (event) => {
    const { value } = event.target;

    if (value) {
      this.props.dispatch(getEnterpriseCodesSelect(value))
      this.props.onChange(event);
      this.setState({ enterpriseCode: value, isShowSearchResult: true });
    } else {
      this.setState({ enterpriseCode: value, isShowSearchResult: false });
    }

  }

  onClickAddEnterpriseCode = (event, enterprise) => {
    let value = enterprise.enterpriseCode;

    this.props.onSelectEnterprise(enterprise);
    this.setState({ value, isShowSearchResult: false })
  }

  render() {
    const { enterpriseCode, enterprises, isShowSearchResult } = this.state;
    const { messageType, isDisabled } = this.props;

    const options = enterprises.map((enterprise, i) => {
      return <ListGroupItem key={i} onClick={(event) => this.onClickAddEnterpriseCode(event, enterprise)}>
        {enterprise.enterpriseCode} <br/>
        <span className="sub-info"><i>{enterprise.description}</i></span>
      </ListGroupItem>
    });

    return (
      <span className={"searchInput enterpriseSearchInput " + (messageType == 'error' ? 'error' : null)}>
        <input
          htmlid="storeSearchInput"
          className="storeSearchInput"
          label="Enterprise Code"
          placeholder="Enter Enterprise Code"
          value={enterpriseCode}
          name="enterpriseCode"
          maxLength="4"
          onChange={this.onChangeInput}
          disabled={isDisabled}
        />

        { !isShowSearchResult ? null :
          <ListGroup>
            { options }
          </ListGroup>
        }

      </span>
    );
  }
}

EnterpriseSearchInput.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool
};

export default EnterpriseSearchInput;
