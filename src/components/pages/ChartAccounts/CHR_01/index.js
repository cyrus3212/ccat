import { connect } from 'react-redux';
import ReviewAccounts from './ReviewAccounts';

const mapStateToProps = state => {
  return {
    chartAccountsList: state.chartAccountsList,
    chartAccounts: state.chartAccounts,
    userStoreList: state.userStoreList
  };
};

export default connect(mapStateToProps)(ReviewAccounts);
