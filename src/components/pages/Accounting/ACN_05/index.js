import { connect } from 'react-redux';
import PaymentMethod from './PaymentMethod';

const mapStateToProps = state => {
  return {
    paymentMethodList: state.accountingSectionList,
    paymentMethod: state.accountingSection
  };
};

export default connect(mapStateToProps)(PaymentMethod);
