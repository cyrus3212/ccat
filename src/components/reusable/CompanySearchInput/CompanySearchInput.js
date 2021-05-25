import React, { Component } from 'react';
import TextInput from '@coxautokc/fusion-ui-components/lib/TextInput';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { getStoresSelect } from '../../../api/selects/storeSelectApi';
import PropTypes from 'prop-types';
import './_companySearchInput.scss';

class CompanySearchInput extends Component {
  state = {
    isShowSearchResult: false,
    stores: [],
    value: this.props.dtid,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.storesSelect) {
      this.setState({
        stores: nextProps.storesSelect.data
      });
    }
  }

  onChangeInput = (event) => {
    const { value } = event.target;
    const { enterpriseCode } = this.props;
    this.props.onChange(event);

    if (value) {
      this.props.dispatch(getStoresSelect(enterpriseCode, value))
      this.setState({ value, isShowSearchResult: true });
    } else {
      this.setState({ value, isShowSearchResult: false });
    }

  }

  onClickAddStore = (event, store) => {
    let value = store.dtid;

    this.setState({ value, isShowSearchResult: false })
    this.props.onSelectStore(store);
  }

  render() {
    const { stores, isShowSearchResult } = this.state;

    const options = stores.map((store, i) => {
      return <ListGroupItem key={i} onClick={(event) => this.onClickAddStore(event, store)}>
        {store.dtid} <br/>
        <span className="sub-info"><i>{store.email}</i></span>
      </ListGroupItem>
    });

    return (
      <div className="searchInput search-label-top">
        <label>DTID</label>
        <input
          htmlid="storeSearchInput"
          className="storeSearchInput"
          label="DTID"
          placeholder="Enter DTID"
          value={this.props.dtid}
          maxLength={6}
          name="dtid"
          onChange={this.onChangeInput}
        />

        { !isShowSearchResult ? null :
          <ListGroup>
            { options }
          </ListGroup>
        }

      </div>
    );
  }
}

CompanySearchInput.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};

export default CompanySearchInput;
