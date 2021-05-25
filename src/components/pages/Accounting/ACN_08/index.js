import { connect } from 'react-redux';
import ARCustomer from './ARCustomer';

const mapStateToProps = state => {
  return {
    arCustomer: state.accountingSection,
    arCustomerList: state.accountingSectionList
  };
};

export default connect(mapStateToProps)(ARCustomer);
