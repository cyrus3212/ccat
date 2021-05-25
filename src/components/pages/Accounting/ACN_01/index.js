import { connect } from 'react-redux';
import BankAccount from './BankAccount';

const mapStateToProps = state => {
  return {
    bankAccounts: state.accountingSection,
    bankAccountsList: state.accountingSectionList
  };
};

export default connect(mapStateToProps)(BankAccount);
