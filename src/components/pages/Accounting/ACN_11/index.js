import { connect } from 'react-redux';
import SplitAccountsPage from './SplitAccounts';

const mapStateToProps = state => {
  return {
    splitAccounts: state.accountingSection,
    splitAccountsList: state.accountingSectionList
  };
};

export default connect(mapStateToProps)(SplitAccountsPage);
