import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import workbookTranslate from '../../../../src/translation/workbook.json';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import './_workbookAccordion.scss';
import { Redirect } from 'react-router-dom';
import { iconType } from '../../../helpers/iconHelper';
import CircleProgress from '../../reusable/CircleProgress'
import { getMenuWorkbooks } from '../../../api/menuApi';

class WorkbookAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: "",
      isRedirect: false,
      workbookAccess: []
    }
  }

  componentDidMount() {
    const { match } = this.props;
    this.props.dispatch(getMenuWorkbooks(`${match.code}/${match.dtid}`));
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.menus.isOk === true) {
      return {workbookAccess: nextProps.menus.data || []}
    }
    return {...nextProps, ...state};
  }

  toggleAccordion = () => {
    if (!this.state.isOpen) {
      this.setState({isOpen: "active"});
    } else {
      this.setState({isOpen: ""});
    }
  }

  redirectWorkbook = () => {
    this.setState({isRedirect: true});
  }

  /**
   * method that checks on the workbook access
   */
  checkWorkbookAccess = (workbookCode) => {
    const { workbookAccess } = this.state;

    const filteredWorkbook = workbookAccess.filter(workbook => {
      return workbook.value === workbookCode && workbook.hasAccess === true;
    });

    if (filteredWorkbook.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  render() {
    const {isOpen, isRedirect} = this.state;
    const { workbook, match } = this.props
    const renderIcon = iconType(workbook.value, workbook.label);

    if (isRedirect === true) {
      return <Redirect to={`/workbooks/${workbook.value}/${match.code}/${match.dtid}`} />;
    }

    const listSections = workbook.sections.map((section, index) => {
      let classComplete = "fas fa-check";
      if (section.isComplete === false) {
        classComplete = "no-icon";
      }
      // const link = '/workbooks/' + name + '/' + code + '/' + dtid + '/' + section.value ;
      // return <li key={index}><i className={classComplete} /><Link key={index} to={link}>{section.label}</Link></li>
      return <li key={index}><i className={classComplete} /><span>{section.label}</span></li>
    });

    return (
      <Row>
        <div className={`workbook-accordion ${isOpen}`}>
          <Col xs={12} md={6}>
            <div className="workbook-accordion__header">
              <div className="workbook-accordion__title"><img src={renderIcon.icon} />{renderIcon.label}</div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="workbook-accordion__options">
            { isOpen === "active" &&
              <CircleProgress
                percentage={workbook.completionPercentage}
              />
            }
            { isOpen === "" &&
              <div className="workbook-accordion__percentage">{workbook.completionPercentage}%</div>
            }
              <div className="workbook-accordion__buttons">
                <Button
                  htmlId="toggleAccordion"
                  buttonStyle="link"
                  onClick={this.toggleAccordion}
                >
                  { isOpen ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i> } {workbook.sections.length} {workbookTranslate.sections}
                </Button>
                <Button htmlId="viewAll" buttonStyle="link" disabled={this.checkWorkbookAccess(workbook.value) === true ? false : true} onClick={this.checkWorkbookAccess(workbook.value) === true ? this.redirectWorkbook : null}>{workbookTranslate.viewAll}</Button>
              </div>
            </div>
          </Col>
          <Col xs={12} md={12}>
            <div className="workbook-accordion__content">
              <div className="review-workbook-content">
                <ul>
                  {listSections}
                </ul>
              </div>
              <div className="workbook-accordion-footer__buttons pull-right">
                <Button
                  htmlId="toggleAccordion"
                  buttonStyle="link"
                  onClick={this.toggleAccordion}
                >
                  { isOpen ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i> } {workbook.sections.length} {workbookTranslate.sections}
                </Button>
                <Button htmlId="viewAll" buttonStyle="link" disabled={this.checkWorkbookAccess(workbook.value) === true ? false : true} onClick={this.checkWorkbookAccess(workbook.value) === true ? this.redirectWorkbook : null}>{workbookTranslate.viewAll}</Button>
              </div>
            </div>
          </Col>
        </div>
      </Row>
    );
  }
}

WorkbookAccordion.propTypes = {
  workbook: PropTypes.any.isRequired,
};

export default WorkbookAccordion;
