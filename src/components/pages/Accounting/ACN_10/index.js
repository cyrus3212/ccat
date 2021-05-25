import { connect } from 'react-redux';
import ManagedAccounts from './ManagedAccounts';

const mapStateToProps = state => {
  return {
    managedAccounts: state.accountingSection,
    managedAccountsList: state.accountingSectionList
  };
};

export default connect(mapStateToProps)(ManagedAccounts);
