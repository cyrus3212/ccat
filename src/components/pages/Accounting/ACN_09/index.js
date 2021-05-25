import { connect } from 'react-redux';
import AccountPayable from './AccountPayable';

const mapStateToProps = state => {
  return {
    apVendorList: state.accountingSectionList,
    apVendor: state.accountingSection
  };
};

export default connect(mapStateToProps)(AccountPayable);
