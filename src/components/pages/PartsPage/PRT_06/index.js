import { connect } from 'react-redux';
import RestockingCharge from './RestockingCharge';

const mapStateToProps = state => {
  return {
    restockingCharge: state.partsSection,
    restockingChargeList: state.partsSectionList
  };
};

export default connect(mapStateToProps)(RestockingCharge);
