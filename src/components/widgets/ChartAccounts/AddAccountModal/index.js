import { connect } from 'react-redux';
import AddAccountModal from './AddAccountModal';

const mapStateToProps = state => {
  return {
    chartAccounts: state.chartAccounts,
  };
};

export default connect(mapStateToProps)(AddAccountModal);
