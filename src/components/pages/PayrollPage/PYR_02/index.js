import { connect } from 'react-redux';
import GeneralSetupPage from './GeneralSetupPage';

const mapStateToProps = state => {
  return {
    generalSetup: state.payrollSection,
    generalSetupList: state.payrollSectionList
  };
};

export default connect(mapStateToProps)(GeneralSetupPage);
