import { connect } from 'react-redux';
import RetirementSetupPage from './RetirementSetupPage';

const mapStateToProps = state => {
  return {
    retirementSetup: state.payrollSection,
    retirementSetupList: state.payrollSectionList
  };
};

export default connect(mapStateToProps)(RetirementSetupPage);
