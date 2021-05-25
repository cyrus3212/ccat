import React, { Component } from 'react';
import WorkbookAccordion from '../../widgets/WorkbookAccordion';
import workbookTranslate from '../../../../src/translation/workbook.json';
import './_workbookPage.scss';
import BlockText from '../../reusable/BlockText';
import { getDashboardWorkbook } from '../../../api/workbookApi';
import Loader from '../../reusable/Loader';

class WorkbooksPage extends Component {
  constructor() {
    super();

    this.state = {
      workbooks: []
    }
  }

  componentDidMount() {
    const {match} = this.props;
    this.props.dispatch(getDashboardWorkbook({code: match.code, dtid: match.dtid}));
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.workbooks.data !== state.workbooks) {
      return {workbooks: nextProps.workbooks.data}
    }

    return {...nextProps, ...state};
  }

  render() {
    const {workbooks} = this.state;
    const {match} = this.props;
    let workbookAccordion = null;

    try {
      if (workbooks.length === 0) {
        return <Loader />
      }
    }
    catch (e) {
      return <Loader />
    }

    try {
      workbookAccordion = workbooks.map((workbook, index) => {
        return <WorkbookAccordion workbook={workbook} key={index} match={match}/>
      });
    }
    catch (e) {

    }

    return (
      <div className="container-dashboard">
        <BlockText
          title={workbookTranslate.workbookPageTitle}
          paragraph={workbookTranslate.aboutWorkbook}
        />
        { workbookAccordion }
      </div>
    );
  }
}

export default WorkbooksPage;
