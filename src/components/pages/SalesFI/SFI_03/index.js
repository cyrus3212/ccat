import { connect } from 'react-redux';
import InsuranceSources from './InsuranceSources';

const mapStateToProps = state => {
  return {
    insurance: state.salesfiSection,
    insuranceList: state.salesfiSectionList,
  };
};

export default connect(mapStateToProps)(InsuranceSources);
