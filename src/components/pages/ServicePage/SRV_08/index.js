import { connect } from 'react-redux';
import PolicyAdjustment from './PolicyAdjustment';

const mapStateToProps = state => {
  return {
    policyAdjustment: state.serviceSection,
    policyAdjustmentList: state.serviceSectionList
  };
};

export default connect(mapStateToProps)(PolicyAdjustment);
