import { connect } from 'react-redux';
import PurchaseOrder from './PurchaseOrder';

const mapStateToProps = state => {
  return {
    purchaseOrderList: state.accountingSectionList,
    purchaseOrder: state.accountingSection
  };
};

export default connect(mapStateToProps)(PurchaseOrder);
