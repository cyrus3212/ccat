
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_completePage.scss';
import { getReviewWorkbook } from '../../../api/workbookApi';
import { iconType } from '../../../helpers/iconHelper';
import Footer from '../../common/Footer';

class CompletePage extends Component {
  static getDerivedStateFromProps(nextProps, state) {
    try {
      if (nextProps.match !== state.completeWorkbook) {
        return { completeWorkbook: nextProps.match}
      }
    }
    catch (e) {

    }
    return {...nextProps, ...state};
  }

  constructor(props) {
    super(props);
    this.state = {
      completeWorkbook: []
    };
  }

  componentDidMount() {
    const {match} = this.props !== undefined ? this.props : {};
    this.props.dispatch(getReviewWorkbook({workbook: match.name, code: match.code, dtid: match.dtid}))
  }

  getNextWorkbook = () => {
    const {match, workbooks} = this.props;
    let nextWorkbook = {};
    try {
      if (Object.keys(workbooks).length > 0) {
        for (let i = 0; i < workbooks.length; i++) {
          if (workbooks[i].value === match.name) {
            // Go back to the first workbook
            if (i >= workbooks.length-1) {
              nextWorkbook = {
                value: workbooks[0].value,
                label: workbooks[0].label
              }
            }
            else {
              // Get the next workbook
              nextWorkbook = {
                value: workbooks[i+1].value,
                label: workbooks[i+1].label
              }
            }

            return nextWorkbook;
          }
        }
      }
    }
    catch (e) {

    }
  }

  render() {
    const { completeWorkbook } = this.state
    const renderIcon = iconType(completeWorkbook.name + '_C');
    const nextWorkbook = this.getNextWorkbook();
    let {match} = this.props;
    match = {
      dtid: match.dtid,
      name: nextWorkbook.value,
      code: match.code
    }

    return (
      <Fragment>
        <div className="success-icon d-flex flex-column">
          <div className="inner m-auto text-center">
            <img src={renderIcon.icon} alt={renderIcon.label}/>
            <div className="success-text">Success</div>
            <div className="success-message">Let's continue on to the {nextWorkbook.label} workbook.</div>
          </div>
          <Footer page={`complete`} match={match} linkTo={`complete`}/>
        </div>
      </Fragment>
    );
  }
}

CompletePage.propTypes = {
};

CompletePage.displayName = 'Complete Page';

export default CompletePage;
