import { connect } from 'react-redux';
import ServiceFees from './ServiceFees';

const mapStateToProps = state => {
  return {
    serviceFees: state.serviceSection,
    serviceFeesList: state.serviceSectionList
  };
};

export default connect(mapStateToProps)(ServiceFees);
