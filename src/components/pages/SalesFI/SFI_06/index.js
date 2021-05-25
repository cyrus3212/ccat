import { connect } from 'react-redux';
import ServiceContracts from './ServiceContracts';

const mapStateToProps = state => {
  return {
    serviceContract: state.salesfiSection,
    serviceContractList: state.salesfiSectionList,
  };
};

export default connect(mapStateToProps)(ServiceContracts);
