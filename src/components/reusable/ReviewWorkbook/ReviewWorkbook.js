import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_reviewWorkbook.scss';
import reviewWorkbookTranslate from '../../../translation/reviewWorkbook'
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import { Link } from 'react-router-dom';
import commonTranslate from '../../../translation/common.json';
import { iconType } from '../../../helpers/iconHelper';
import CircleProgress from '../../reusable/CircleProgress'
import { getReviewWorkbook } from '../../../api/workbookApi';
class ReviewWorkbook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // percentage: 0
    };

    this.baseState = this.state
  }

  componentDidMount() {
    this.setState(this.baseState);
    const { name, code, dtid } = this.props;
    this.props.dispatch(getReviewWorkbook({workbook: name, code: code, dtid: dtid}))
  }

  static getDerivedStateFromProps(nextProps, state) {
    let percentage = nextProps.percentage;

    return {
      percentage: percentage,

    }
  }

  renderWorkBook = () => {
    const { sections, name, code, dtid } = this.props
    const listSections = sections.map((section, index) => {
      let classComplete = 'fas fa-check';
      if (section.isComplete === false) {
        classComplete = 'fas fa-times';
      }
      const link = '/workbooks/' + name + '/' + code + '/' + dtid + '/' + section.value ;
      return <li key={index}><i className={classComplete} /><Link key={index} to={link}>{commonTranslate.edit}</Link><span>{section.label}</span></li>
    });
    return listSections;
  }

  render() {
    const { title, name } = this.props;
    const { percentage } = this.state;
    const renderIcon = iconType(name, title);

    return (
      <Row className="review-workbook-page">
        <Col xs={12} md={12}>
          <Fragment>
            <div className="review-workbook-heading">
              <div className="review-icon pull-left"><img src={renderIcon.icon} /></div>
              <div className="review-title pull-left">{renderIcon.label}</div>

              <div className="pull-right">
                <CircleProgress percentage={percentage} />
              </div>

              <div className="clearfix"></div>
            </div>
            <div className="review-workbook-content">
              <div className="review-desc">{reviewWorkbookTranslate.itemDescription}</div>
              <ul>
                {this.renderWorkBook()}
              </ul>
            </div>
          </Fragment>
        </Col>
      </Row>
    );
  }
}


ReviewWorkbook.propTypes = {
  sections : PropTypes.any.isRequired,
  title: PropTypes.string,
  value: PropTypes.string,
  name : PropTypes.string,
  dispatch: PropTypes.func
};

export default ReviewWorkbook;
