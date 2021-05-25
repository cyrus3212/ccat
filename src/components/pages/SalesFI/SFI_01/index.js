import { connect } from 'react-redux';
import AccountAssignments from './AccountAssignments';

const mapStateToProps = state => {
  return {
    account: state.salesfiSection
  };
};

export default connect(mapStateToProps)(AccountAssignments);
