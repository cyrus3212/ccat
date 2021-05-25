import { connect } from 'react-redux';
import CashReceipt from './CashReceipt';

const mapStateToProps = state => {
  return {
    cashReceiptList: state.accountingSectionList,
    cashReceipt: state.accountingSection
  };
};

export default connect(mapStateToProps)(CashReceipt);
