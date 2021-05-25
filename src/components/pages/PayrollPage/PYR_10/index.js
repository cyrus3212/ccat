import { connect } from 'react-redux';
import PayCodeOverridePage from './PayCodeOverridePage';

const mapStateToProps = state => {
  return {
    payCodeOverride: state.payrollSection,
    payCodeOverrideList: state.payrollSectionList,
    userStoreList: state.userStoreList
  };
};

export default connect(mapStateToProps)(PayCodeOverridePage);
