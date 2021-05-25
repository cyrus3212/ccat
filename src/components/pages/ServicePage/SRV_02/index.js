import { connect } from 'react-redux';
import ServiceContracts from './ServiceContracts';

const mapStateToProps = state => {
  return {
    serviceContract: state.serviceSection,
    serviceContractsList: state.serviceSectionList
  };
};

export default connect(mapStateToProps)(ServiceContracts);

