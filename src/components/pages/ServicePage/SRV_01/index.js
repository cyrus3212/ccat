import { connect } from 'react-redux';
import ServiceTypes from './ServiceTypes';

const mapStateToProps = state => {
  return {
    serviceType: state.serviceSection,
    serviceTypesList: state.serviceSectionList
  };
};

export default connect(mapStateToProps)(ServiceTypes);
