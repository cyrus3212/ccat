import { connect } from 'react-redux';
import OtherPayCodesPage from './OtherPayCodesPage';

const mapStateToProps = state => {
  return {
    otherPayCode: state.payrollSection,
    otherPayCodeList: state.payrollSectionList
  };
};

export default connect(mapStateToProps)(OtherPayCodesPage);
