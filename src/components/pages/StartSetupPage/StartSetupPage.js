import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './_startSetupPage.scss';

import { getEnterprise } from '../../../api/enterpriseApi';
import commonTranslate from '../../../translation/common.json';

class StartSetupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRedirect: false
    };
  }

  componentDidMount() {
    this.props.dispatch(getEnterprise());
  }

  static getDerivedStateFromProps(nextProps, state) {
    try {
      if (nextProps.enterprises.data.length > 0) {
        return {isRedirect: true}
      }

      if (state.isReload) {
        this.componentDidMount();
      }
    }
    catch (e) {

    }
    return {...nextProps, ...state}
  }

  render() {
    if (this.state.isRedirect === true) {
      return <Redirect to="/setup/enterprises" />;
    }

    return (
      <div className="start-setup-page flex-box--center">
        <div className="block-text text-center">
          <img src={require('../../../assets/images/setup-img.jpg')} />
          <h2>{commonTranslate.welcome} Tim Wilkinson!</h2>
          <p>
            {commonTranslate.getStarted}<br/>{commonTranslate.currentData}
          </p>
          <Link to="/setup/enterprises" className="setup-btn btn btn-primary">{commonTranslate.next}</Link>
        </div>
      </div>
    );
  }
}

StartSetupPage.propTypes = {
  enterprises: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

StartSetupPage.displayName = 'Start Setup Page';

export default StartSetupPage;
